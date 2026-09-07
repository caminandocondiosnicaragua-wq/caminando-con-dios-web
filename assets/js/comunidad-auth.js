/************************************************
 * CAMINANDO CON DIOS
 * AUTENTICACIÓN DE COMUNIDAD
 *
 * Responsabilidad:
 * - Mostrar el acceso con Google dentro de Comunidad.
 * - Enviar el ID token al backend.
 * - Guardar la sesión visual del usuario.
 * - Permitir cerrar sesión.
 *
 * No maneja Notion directamente.
 ************************************************/

const COMUNIDAD_SESION_KEY = "caminando_con_dios_comunidad_usuario";

function obtenerUsuarioComunidad(){
    try{
        const guardado = localStorage.getItem(COMUNIDAD_SESION_KEY);
        if(!guardado) return null;
        return JSON.parse(guardado);
    }catch(error){
        console.error("No se pudo leer la sesión de Comunidad:", error);
        localStorage.removeItem(COMUNIDAD_SESION_KEY);
        return null;
    }
}

function estaAutenticadoComunidad(){
    return !!obtenerUsuarioComunidad();
}

function guardarUsuarioComunidad(usuario){
    localStorage.setItem(
        COMUNIDAD_SESION_KEY,
        JSON.stringify(usuario)
    );
}

function cerrarSesionComunidad(){
    localStorage.removeItem(COMUNIDAD_SESION_KEY);

    if(
        window.google &&
        google.accounts &&
        google.accounts.id
    ){
        google.accounts.id.disableAutoSelect();
    }

    if(typeof actualizarEstadoComunidad === "function"){
        actualizarEstadoComunidad();
    }
}

function iniciarAutenticacionComunidad(){
    actualizarEstadoComunidad();

    const usuario = obtenerUsuarioComunidad();
    if(usuario) return;

    esperarGoogleIdentityServices_(0);
}

function esperarGoogleIdentityServices_(intento){
    if(
        window.google &&
        google.accounts &&
        google.accounts.id
    ){
        prepararGoogleComunidad_();
        return;
    }

    if(intento >= 40){
        mostrarErrorAccesoComunidad_(
            "No se pudo cargar el acceso con Google. Recarga la página e inténtalo nuevamente."
        );
        return;
    }

    setTimeout(function(){
        esperarGoogleIdentityServices_(intento + 1);
    }, 250);
}

function prepararGoogleComunidad_(){
    const contenedor = document.getElementById("google-login-comunidad");
    if(!contenedor) return;

    contenedor.innerHTML = "";

    google.accounts.id.initialize({
        client_id: "425534912089-4vikjruchjv3vhc30ar6kjne3d21b9ii.apps.googleusercontent.com",
        callback: recibirCredencialGoogleComunidad_,
        auto_select: false,
        context: "signin"
    });

    google.accounts.id.renderButton(
        contenedor,
        {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            width: 280,
            locale: "es"
        }
    );
}

async function recibirCredencialGoogleComunidad_(respuesta){
    if(!respuesta || !respuesta.credential){
        mostrarErrorAccesoComunidad_(
            "Google no devolvió una credencial válida."
        );
        return;
    }

    mostrarEstadoAccesoComunidad_("Verificando tu cuenta...");

    try{
        const respuestaServidor = await fetch(
            CONFIG.API.url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({
                    accion: "loginGoogle",
                    idToken: respuesta.credential
                })
            }
        );

        const texto = await respuestaServidor.text();
        let datos;

        try{
            datos = JSON.parse(texto);
        }catch(error){
            throw new Error("El servidor devolvió una respuesta que no se pudo interpretar.");
        }

        if(!datos.ok || !datos.autenticado || !datos.usuario){
            throw new Error(
                datos.mensaje ||
                "No fue posible completar el inicio de sesión."
            );
        }

        guardarUsuarioComunidad(datos.usuario);
        actualizarEstadoComunidad();

    }catch(error){
        console.error("Error al iniciar sesión con Google:", error);
        mostrarErrorAccesoComunidad_(
            error.message ||
            "No fue posible iniciar sesión."
        );
        prepararGoogleComunidad_();
    }
}

function mostrarEstadoAccesoComunidad_(mensaje){
    const estado = document.getElementById("estado-acceso-comunidad");
    if(estado){
        estado.textContent = mensaje;
        estado.className = "estado-acceso-comunidad visible";
    }
}

function mostrarErrorAccesoComunidad_(mensaje){
    const estado = document.getElementById("estado-acceso-comunidad");
    if(estado){
        estado.textContent = mensaje;
        estado.className = "estado-acceso-comunidad visible error";
    }
}
