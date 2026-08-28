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
     ************************************************/
    cargarSelectorIdiomas();
}

function cargarSelectorIdiomas() {

    cargarScriptUnaVez(
        "assets/js/utilidades/idiomas.js",
        "ccd-idiomas"
    );

    // El traductor global se carga aparte porque las páginas
    // internas pueden no contener un bloque .devocional.
    cargarScriptUnaVez(
        "assets/js/utilidades/idiomas-global.js",
        "ccd-idiomas-global"
    );
}

function cargarScriptUnaVez(src, marca) {

    if(document.querySelector(`script[data-${marca}="true"]`)){
        return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.setAttribute(`data-${marca}`, "true");
    script.async = false;

    script.onload = () => {
        console.log("Cargado:", src);
    };

    script.onerror = () => {
        console.error("No fue posible cargar:", src);
    };

    document.body.appendChild(script);
}
