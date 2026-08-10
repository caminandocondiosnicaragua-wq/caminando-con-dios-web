/************************************************
 * CAMINANDO CON DIOS
 * COMUNIDAD
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarComunidad);

/************************************************
 * SECCIONES DE COMUNIDAD
 *
 * Cada objeto representa una tarjeta.
 * Las funciones se integrarán más adelante.
 ************************************************/

const SECCIONES_COMUNIDAD = [

    {
        icono: "✝️",
        titulo: "Las Buenas Nuevas de Salvación",
        descripcion: "Conoce el mensaje del evangelio y descubre la esperanza de salvación que encontramos en Jesucristo.",
        accion: "Abrir enseñanza",
        tipo: "salvacion"
    },

    {
        icono: "🌱",
        titulo: "Los primeros pasos del creyente",
        descripcion: "Un espacio de discipulado para quienes desean comenzar a caminar en la fe y crecer en su relación con Dios.",
        accion: "Próximamente",
        tipo: "discipulado"
    },

    {
        icono: "🤝",
        titulo: "Sé parte de la comunidad",
        descripcion: "Muy pronto podrás registrarte, participar y formar parte de una comunidad en línea dedicada a crecer en la fe.",
        accion: "Próximamente",
        tipo: "registro"
    },

    {
        icono: "💬",
        titulo: "Foro de la comunidad",
        descripcion: "Un espacio para compartir, hacer preguntas, conversar sobre la fe y aprender unos de otros.",
        accion: "Próximamente",
        tipo: "foro"
    }

];

/************************************************
 * INICIAR COMUNIDAD
 ************************************************/

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

}

/************************************************
 * CREAR PÁGINA DE COMUNIDAD
 ************************************************/

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

    <div class="grid-comunidad">
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

/************************************************
 * CREAR TARJETAS
 ************************************************/

function crearTarjetasComunidad(){

    return SECCIONES_COMUNIDAD.map(seccion => `

        <article class="tarjeta-comunidad">

            <div class="tarjeta-comunidad-icono">
                ${seccion.icono}
            </div>

            <h2>${seccion.titulo}</h2>

            <p>${seccion.descripcion}</p>

            <button
                type="button"
                class="btn-comunidad ${seccion.tipo === "salvacion" ? "btn-activo" : "btn-pendiente"}"
                ${seccion.tipo === "salvacion" ? "onclick=\"abrirBuenasNuevas()\"" : "disabled"}>
                ${seccion.accion}
            </button>

        </article>

    `).join("");

}

/************************************************
 * BUENAS NUEVAS
 *
 * La ventana emergente quedará preparada para
 * cargar posteriormente el contenido desde Notion.
 ************************************************/

function abrirBuenasNuevas(){

    const modal = document.getElementById("modalBuenasNuevas");
    if(modal) modal.classList.add("activo");

}

function cerrarBuenasNuevas(){

    const modal = document.getElementById("modalBuenasNuevas");
    if(modal) modal.classList.remove("activo");

}
