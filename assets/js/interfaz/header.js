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
            <a href="#">Inicio</a>
            <a href="#">Devocionales</a>
            <a href="#">Biblioteca</a>
            <a href="#">Estudios</a>
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
}
