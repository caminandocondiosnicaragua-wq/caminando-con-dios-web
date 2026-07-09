/************************************************
 * CAMINANDO CON DIOS
 * APP PRINCIPAL
 * Versión 3.0
 ************************************************/
let devocionalActual = null;
/************************************************
 * INICIAR APLICACIÓN
 ************************************************/
window.addEventListener("DOMContentLoaded", iniciarAplicacion);
async function iniciarAplicacion(){
    mostrarLoader();
    try{
        // Obtener el devocional desde la API
        devocionalActual = await obtenerDevocionalHoy();
        construirAplicacion(devocionalActual);
        iniciarModulos();
    }
   catch(error){
    alert(
        error.name +
        "\n\n" +
        error.message
    );
    console.error(error);
    mostrarError();
}
    finally{
        ocultarLoader();
    }
}
/************************************************
 * CONSTRUIR TODA LA INTERFAZ
 * El hero queda a ancho completo (fuera del contenedor),
 * y el resto del contenido va dentro de ".contenedor",
 * que le da márgenes a los lados.
 ************************************************/
function construirAplicacion(devocional){
    const app = document.getElementById("app");
    app.innerHTML = `
        ${crearHeader()}
        ${crearHero()}
        <div class="contenedor">
            ${crearDevocional(devocional)}
            ${CONFIG.DEVOCIONAL.mostrarVideo ? crearVideo() : ""}
            ${CONFIG.DEVOCIONAL.mostrarComentarios ? crearComentarios() : ""}
        </div>
        ${crearFooter()}
    `;
}
/************************************************
 * INICIALIZAR TODOS LOS MÓDULOS
 ************************************************/
function iniciarModulos(){
    iniciarHeader();
    iniciarNavegacion();
    iniciarVideo();
    iniciarComentarios();
    iniciarFooter();
}
/************************************************
 * LOADER
 ************************************************/
function mostrarLoader(){
    const loader = document.getElementById("loader");
    if(loader){
        loader.style.display = "flex";
    }
}
function ocultarLoader(){
    const loader = document.getElementById("loader");
    const app = document.getElementById("app");
    if(loader){
        loader.style.display = "none";
    }
    if(app){
        app.style.display = "block";
    }
}
/************************************************
 * MENSAJE DE ERROR
 ************************************************/
function mostrarError(){
    const app = document.getElementById("app");
    app.innerHTML = `
        <section class="mensaje-error">
            <h2>
                No fue posible cargar el devocional.
            </h2>
            <p>
                Inténtalo nuevamente en unos minutos.
            </p>
        </section>
    `;
}
