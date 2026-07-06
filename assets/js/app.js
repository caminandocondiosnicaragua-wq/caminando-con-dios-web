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

hero:"assets/img/hero.png",

versiculo:"Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.",

cita:"Proverbios 3:5-6",
