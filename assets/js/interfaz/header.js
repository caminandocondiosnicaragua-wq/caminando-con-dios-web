/************************************************
 * CAMINANDO CON DIOS
 * HEADER
 ************************************************/

function crearHeader() {

    return `

<header class="header">
    <div class="header-contenedor">
        <div class="logo-area">
            <img
                src="assets/img/logo.png"
                alt="Logo"
                class="logo">
            <div class="titulo-area">
                <h1>${CONFIG.APP.nombre}</h1>
                <p>${CONFIG.APP.subtitulo}</p>
            </div>

        </div>
        <button
            id="btnMenu"
            class="btn-menu"
            aria-label="Abrir menú">
            ☰
        </button>
        <nav id="menuPrincipal" class="menu">
            <a href="index.html">Inicio</a>
            <a href="devocionales.html">Devocionales</a>
            <a href="biblioteca.html">Biblioteca</a>
            <a href="estudios.html">Estudios</a>
            <a href="comunidad.html">Comunidad</a>
            <a href="acerca.html">Acerca de</a>
            <button
                id="btnIdioma"
                class="btn-idioma">
                🌎

            </button>
        </nav>
    </div>
</header>
`;

}
/************************************************
 * MENÚ RESPONSIVE
 ************************************************/

function iniciarHeader() {
    const boton = document.getElementById("btnMenu");
    const menu = document.getElementById("menuPrincipal");
    if (!boton || !menu) return;

    boton.addEventListener("click", () => {
        menu.classList.toggle("activo");
    });

    /************************************************
     * IDIOMAS EN TODAS LAS PÁGINAS
     *
     * El selector se carga desde aquí porque este
     * header es compartido por las páginas del sitio.
     * Así no tenemos que repetir el <script> en cada
     * HTML y cualquier página nueva que use el header
     * recibe automáticamente el selector.
     ************************************************/
    cargarSelectorIdiomas();
}

function cargarSelectorIdiomas() {

    // Si index.html ya cargó idiomas.js, no volver a cargarlo.
    if (window.__ccdIdiomasScriptCargado ||
        document.querySelector('script[data-ccd-idiomas="true"]')) {
        return;
    }

    window.__ccdIdiomasScriptCargado = true;

    const script = document.createElement("script");

    script.src = "assets/js/utilidades/idiomas.js";
    script.dataset.ccdIdiomas = "true";
    script.async = false;

    script.onload = () => {
        console.log("Selector de idiomas cargado en la página.");
    };

    script.onerror = () => {
        window.__ccdIdiomasScriptCargado = false;
        console.error("No fue posible cargar assets/js/utilidades/idiomas.js");
    };

    document.body.appendChild(script);
}
