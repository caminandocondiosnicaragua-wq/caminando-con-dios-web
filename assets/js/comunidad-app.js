/************************************************
 * CAMINANDO CON DIOS
 * COMUNIDAD
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarComunidad);

const SECCIONES_COMUNIDAD = [
    {
        icono: "✝️",
        titulo: "Las Buenas Nuevas de Salvación",
        descripcion: "Conoce el mensaje del evangelio y descubre la esperanza de salvación que encontramos en Jesucristo.",
        accion: "Próximamente",
        tipo: "salvacion",
        activo: false
    },
    {
        icono: "🌱",
        titulo: "Los primeros pasos del creyente",
        descripcion: "Un espacio de discipulado para quienes desean comenzar a caminar en la fe y crecer en su relación con Dios.",
        accion: "Comenzar estudio",
        tipo: "discipulado",
        activo: true,
        enlace: "nueva-vida.html"
    },
    {
        icono: "🤝",
        titulo: "Sé parte de la comunidad",
        descripcion: "Muy pronto podrás registrarte, participar y formar parte de una comunidad en línea dedicada a crecer en la fe.",
        accion: "Próximamente",
        tipo: "registro",
        activo: false
    },
    {
        icono: "💬",
        titulo: "Foro de la comunidad",
        descripcion: "Un espacio para compartir, hacer preguntas, conversar sobre la fe y aprender unos de otros.",
        accion: "Próximamente",
        tipo: "foro",
        activo: false
    }
];

function iniciarComunidad(){
    const app = document.getElementById("app");
    app.innerHTML = `
        ${crearHeader()}
        ${crearHero()}
        <div class="contenedor">
            ${crearComunidad()}
        </div>
        ${crearFooter()}
    `;
    app.style.display = "block";
    iniciarHeader();
    iniciarFooter();

    if(typeof iniciarAutenticacionComunidad === "function"){
        iniciarAutenticacionComunidad();
    }
}

function crearComunidad(){
    return `
<section class="comunidad-pagina">
    <div class="comunidad-cabecera">
        <h1>👥 Comunidad</h1>
        <p>
            Un espacio pensado para compartir las Buenas Nuevas de Salvación,
            crecer en la fe mediante el discipulado y, en el futuro,
            caminar juntos como comunidad en línea.
        </p>
    </div>

    <section id="acceso-comunidad" class="comunidad-acceso" aria-labelledby="titulo-acceso-comunidad">
        <div class="acceso-comunidad-contenido">
            <div class="acceso-comunidad-icono">🔐</div>
            <div class="acceso-comunidad-texto">
                <h2 id="titulo-acceso-comunidad">Tu espacio de Comunidad</h2>
                <p id="mensaje-acceso-comunidad">
                    Inicia sesión con Google para acceder al contenido de la Comunidad,
                    guardar tu avance y continuar desde donde lo dejaste.
                </p>
            </div>
        </div>

        <div id="estado-acceso-comunidad" class="estado-acceso-comunidad" aria-live="polite"></div>
        <div id="google-login-comunidad" class="google-login-comunidad"></div>
        <div id="usuario-acceso-comunidad" class="usuario-acceso-comunidad"></div>
    </section>

    <div id="contenido-comunidad-protegido" class="grid-comunidad comunidad-bloqueada">
        ${crearTarjetasComunidad()}
    </div>

    <div class="comunidad-pendiente">
        <div class="pendiente-icono">🔨</div>
        <h2>Estamos trabajando en esta sección</h2>
        <p>
            Estamos preparando nuevos recursos de evangelismo, discipulado
            y comunidad. Algunas funciones estarán disponibles más adelante,
            a medida que sigamos desarrollando este espacio.
        </p>
        <strong>Permanece pendiente.</strong>
    </div>
</section>
`;
}

function crearTarjetasComunidad(){
    return SECCIONES_COMUNIDAD.map(seccion => {
        if (seccion.activo && seccion.enlace) {
            return `
                <article class="tarjeta-comunidad">
                    <div class="tarjeta-comunidad-icono">${seccion.icono}</div>
                    <h2>${seccion.titulo}</h2>
                    <p>${seccion.descripcion}</p>
                    <a href="${seccion.enlace}" class="btn-comunidad btn-activo enlace-comunidad-protegido">
                        ${seccion.accion}
                    </a>
                </article>
            `;
        }
        return `
            <article class="tarjeta-comunidad">
                <div class="tarjeta-comunidad-icono">${seccion.icono}</div>
                <h2>${seccion.titulo}</h2>
                <p>${seccion.descripcion}</p>
                <button type="button" class="btn-comunidad btn-pendiente" disabled>
                    ${seccion.accion}
                </button>
            </article>
        `;
    }).join("");
}

function actualizarEstadoComunidad(){
    const usuario = typeof obtenerUsuarioComunidad === "function"
        ? obtenerUsuarioComunidad()
        : null;

    const bloque = document.getElementById("contenido-comunidad-protegido");
    const login = document.getElementById("google-login-comunidad");
    const usuarioBox = document.getElementById("usuario-acceso-comunidad");
    const estado = document.getElementById("estado-acceso-comunidad");
    const mensaje = document.getElementById("mensaje-acceso-comunidad");

    if(!bloque) return;

    if(usuario){
        bloque.classList.remove("comunidad-bloqueada");
        bloque.classList.add("comunidad-desbloqueada");

        if(login) login.innerHTML = "";
        if(estado){
            estado.textContent = "Sesión iniciada correctamente.";
            estado.className = "estado-acceso-comunidad visible exito";
        }
        if(mensaje){
            mensaje.textContent = "Ya tienes acceso a la Comunidad. Tu avance podrá asociarse a tu cuenta.";
        }
        if(usuarioBox){
            usuarioBox.innerHTML = `
                <div class="usuario-comunidad-info">
                    <strong>Hola, ${escaparHTMLComunidad_(usuario.nombre || usuario.correo)}</strong>
                    <span>${escaparHTMLComunidad_(usuario.correo || "")}</span>
                </div>
                <button type="button" class="btn-cerrar-sesion-comunidad" onclick="cerrarSesionComunidad()">
                    Cerrar sesión
                </button>
            `;
        }
        return;
    }

    bloque.classList.remove("comunidad-desbloqueada");
    bloque.classList.add("comunidad-bloqueada");
    if(usuarioBox) usuarioBox.innerHTML = "";
    if(mensaje){
        mensaje.textContent = "Inicia sesión con Google para acceder al contenido de la Comunidad, guardar tu avance y continuar desde donde lo dejaste.";
    }
}

function escaparHTMLComunidad_(valor){
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
