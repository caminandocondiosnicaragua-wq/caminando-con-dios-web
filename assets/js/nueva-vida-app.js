document.addEventListener("DOMContentLoaded", iniciarNuevaVida);

const PARTES_NUEVA_VIDA = [
    { numero: 1, titulo: "Parte 1", descripcion: "Los primeros pasos para comenzar a caminar con Cristo.", activo: true },
    { numero: 2, titulo: "Parte 2", descripcion: "Continúa tu crecimiento en la vida cristiana.", activo: false },
    { numero: 3, titulo: "Parte 3", descripcion: "Sigue avanzando en tu caminar con Dios.", activo: false },
    { numero: 4, titulo: "Parte 4", descripcion: "Profundiza en tu relación con Dios.", activo: false },
    { numero: 5, titulo: "Parte 5", descripcion: "Continúa creciendo y fortaleciendo tu fe.", activo: false },
    { numero: 6, titulo: "Parte 6", descripcion: "Avanza hacia una vida cristiana más madura.", activo: false }
];

function iniciarNuevaVida(){
    const app = document.getElementById("app");
    if(!app) return;

    const usuario = typeof obtenerUsuarioComunidad === "function"
        ? obtenerUsuarioComunidad()
        : null;

    // Las subpáginas de Comunidad requieren una sesión válida.
    if(!usuario){
        window.location.href = "comunidad.html";
        return;
    }

    const nombre = escaparHTMLNuevaVida_(usuario.nombre || "hermano/a");
    const correo = escaparHTMLNuevaVida_(usuario.correo || "");

    app.innerHTML = `
        ${crearHeader()}
        ${crearHero()}
        <div class="contenedor">
            <section class="comunidad-pagina">
                <div class="comunidad-subpagina-usuario">
                    <div class="comunidad-subpagina-usuario-icono">👋</div>
                    <div class="comunidad-subpagina-usuario-texto">
                        <strong>Hola, ${nombre}</strong>
                        <span>Estás en tu recorrido de discipulado.</span>
                    </div>
                    <div class="comunidad-subpagina-usuario-acciones">
                        <span class="comunidad-subpagina-correo">${correo}</span>
                        <button type="button" class="btn-cerrar-sesion-comunidad" onclick="cerrarSesionNuevaVida_()">Cerrar sesión</button>
                    </div>
                </div>

                <div class="comunidad-cabecera">
                    <h1>🌱 Nueva Vida en Cristo</h1>
                    <p>
                        Un recorrido de discipulado para ayudarte a comenzar y continuar
                        tu caminar con Dios.
                    </p>
                </div>

                <div class="grid-comunidad">
                    ${PARTES_NUEVA_VIDA.map(parte => `
                        <article class="tarjeta-comunidad">
                            <div class="tarjeta-comunidad-icono">📖</div>
                            <h2>${parte.titulo}</h2>
                            <p>${parte.descripcion}</p>
                            ${parte.activo
                                ? `<a href="nueva-vida-parte-1.html" class="btn-comunidad btn-activo">Comenzar</a>`
                                : `<button type="button" class="btn-comunidad btn-pendiente" disabled>Próximamente</button>`}
                        </article>
                    `).join("")}
                </div>
            </section>
        </div>
        ${crearFooter()}
    `;

    app.style.display = "block";
    iniciarHeader();
    iniciarFooter();
}

function cerrarSesionNuevaVida_(){
    if(typeof cerrarSesionComunidad === "function"){
        cerrarSesionComunidad();
    }else{
        localStorage.removeItem("caminando_con_dios_comunidad_usuario");
    }

    window.location.href = "comunidad.html";
}

function escaparHTMLNuevaVida_(valor){
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
