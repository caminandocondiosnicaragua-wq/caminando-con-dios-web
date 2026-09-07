/************************************************
 * CAMINANDO CON DIOS
 * AUTENTICACIÓN DE COMUNIDAD
 *
 * Responsabilidad:
 * - Mostrar el acceso con Google dentro de Comunidad.
 * - Enviar el ID token al backend.
 * - Guardar la sesión visual del usuario.
 * - Personalizar Comunidad y sus subpáginas.
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
    localStorage.setItem(COMUNIDAD_SESION_KEY, JSON.stringify(usuario));
}

function cerrarSesionComunidad(){
    localStorage.removeItem(COMUNIDAD_SESION_KEY);

    if(window.google && google.accounts && google.accounts.id){
        google.accounts.id.disableAutoSelect();
    }

    actualizarEstadoComunidad();
}

function iniciarAutenticacionComunidad(){
    actualizarEstadoComunidad();

    if(obtenerUsuarioComunidad()) return;

    esperarGoogleIdentityServices_(0);
}

function esperarGoogleIdentityServices_(intento){
    if(window.google && google.accounts && google.accounts.id){
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
    if(!window.google || !google.accounts || !google.accounts.id) return;

    contenedor.innerHTML = "";

    google.accounts.id.initialize({
        client_id: "425534912089-4vikjruchjv3vhc30ar6kjne3d21b9ii.apps.googleusercontent.com",
        callback: recibirCredencialGoogleComunidad_,
        auto_select: false,
        context: "signin"
    });

    google.accounts.id.renderButton(contenedor, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 280,
        locale: "es"
    });
}

async function recibirCredencialGoogleComunidad_(respuesta){
    if(!respuesta || !respuesta.credential){
        mostrarErrorAccesoComunidad_("Google no devolvió una credencial válida.");
        return;
    }

    mostrarEstadoAccesoComunidad_("Verificando tu cuenta...");

    try{
        const respuestaServidor = await fetch(CONFIG.API.url, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                accion: "loginGoogle",
                idToken: respuesta.credential
            })
        });

        const texto = await respuestaServidor.text();
        let datos;

        try{
            datos = JSON.parse(texto);
        }catch(error){
            throw new Error("El servidor devolvió una respuesta que no se pudo interpretar.");
        }

        if(!datos.ok || !datos.autenticado || !datos.usuario){
            throw new Error(datos.mensaje || "No fue posible completar el inicio de sesión.");
        }

        guardarUsuarioComunidad(datos.usuario);
        actualizarEstadoComunidad();

    }catch(error){
        console.error("Error al iniciar sesión con Google:", error);
        mostrarErrorAccesoComunidad_(error.message || "No fue posible iniciar sesión.");
        prepararGoogleComunidad_();
    }
}

function actualizarEstadoComunidad(){
    const usuario = obtenerUsuarioComunidad();
    const acceso = document.getElementById("acceso-comunidad");
    const tarjetas = document.getElementById("contenido-comunidad-protegido");

    if(!acceso || !tarjetas) return;

    if(usuario){
        acceso.className = "comunidad-acceso acceso-comunidad-autenticado";
        acceso.innerHTML = `
            <div class="acceso-comunidad-contenido">
                <div class="acceso-comunidad-icono">✓</div>
                <div class="acceso-comunidad-texto">
                    <h2>Bienvenido, ${escaparHtmlComunidad_(usuario.nombre || "hermano/a")}.</h2>
                    <p>Esta es tu Comunidad. Tu recorrido quedará asociado a tu cuenta para que podamos continuar desde donde lo dejaste.</p>
                </div>
            </div>
            <div class="usuario-acceso-comunidad">
                <div class="usuario-comunidad-info">
                    <strong>${escaparHtmlComunidad_(usuario.nombre || "Usuario")}</strong>
                    <span>${escaparHtmlComunidad_(usuario.correo || "")}</span>
                </div>
                <button type="button" class="btn-cerrar-sesion-comunidad" onclick="cerrarSesionComunidad()">Cerrar sesión</button>
            </div>
        `;

        tarjetas.classList.remove("comunidad-bloqueada");
        tarjetas.classList.add("comunidad-desbloqueada");
        activarEnlacesComunidad_();
        personalizarComunidad_();
        return;
    }

    acceso.className = "comunidad-acceso";
    acceso.innerHTML = `
        <div class="acceso-comunidad-contenido">
            <div class="acceso-comunidad-icono">🔐</div>
            <div class="acceso-comunidad-texto">
                <h2>Tu espacio de Comunidad</h2>
                <p>Inicia sesión con Google para acceder al contenido de la Comunidad, guardar tu avance y continuar desde donde lo dejaste.</p>
            </div>
        </div>
        <div id="estado-acceso-comunidad" class="estado-acceso-comunidad" aria-live="polite"></div>
        <div id="google-login-comunidad" class="google-login-comunidad"></div>
        <div id="usuario-acceso-comunidad" class="usuario-acceso-comunidad"></div>
    `;

    tarjetas.classList.add("comunidad-bloqueada");
    tarjetas.classList.remove("comunidad-desbloqueada");
    bloquearEnlacesComunidad_();
    prepararGoogleComunidad_();
}

function personalizarComunidad_(){
    const usuario = obtenerUsuarioComunidad();
    if(!usuario) return;

    const nombre = escaparHtmlComunidad_(usuario.nombre || "hermano/a");
    const saludo = `Hola, ${nombre}`;

    document.querySelectorAll("[data-comunidad-usuario]").forEach(elemento => {
        elemento.textContent = nombre;
    });

    document.querySelectorAll("[data-comunidad-saludo]").forEach(elemento => {
        elemento.textContent = saludo;
    });

    document.body.classList.add("comunidad-usuario-autenticado");
}

function activarEnlacesComunidad_(){
    document.querySelectorAll("#contenido-comunidad-protegido a.enlace-comunidad-protegido")
        .forEach(enlace => {
            enlace.classList.remove("enlace-bloqueado");
            enlace.removeAttribute("aria-disabled");
            enlace.style.pointerEvents = "auto";
        });
}

function bloquearEnlacesComunidad_(){
    document.querySelectorAll("#contenido-comunidad-protegido a.enlace-comunidad-protegido")
        .forEach(enlace => {
            enlace.classList.add("enlace-bloqueado");
            enlace.setAttribute("aria-disabled", "true");
            enlace.style.pointerEvents = "none";
        });
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

function escaparHtmlComunidad_(texto){
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Alias para compatibilidad con código anterior de Comunidad.
function escaparHTMLComunidad_(texto){
    return escaparHtmlComunidad_(texto);
}
