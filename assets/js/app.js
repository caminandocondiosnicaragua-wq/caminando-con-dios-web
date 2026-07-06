/************************************************
 * CAMINANDO CON DIOS
 * APP PRINCIPAL
 ************************************************/

async function iniciarAplicacion(){

    mostrarLoader();
    await cargarDevocional();
    ocultarLoader();
}

window.onload = iniciarAplicacion;
