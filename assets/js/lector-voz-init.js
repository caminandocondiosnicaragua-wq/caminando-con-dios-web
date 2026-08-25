/*
 * Inicialización independiente del lector de voz.
 * Espera a que el sistema de idiomas termine antes de preparar
 * las frases, para que el texto hablado corresponda al idioma visible.
 */
window.addEventListener("DOMContentLoaded", function(){
    let intentos = 0;
    const maxIntentos = 150;

    const esperarDevocional = setInterval(function(){
        intentos++;

        const existeDevocional =
            typeof devocionalActual !== "undefined" &&
            devocionalActual &&
            document.querySelector(".devocional");

        const idiomaListo =
            typeof window.ccdIdiomaListo === "undefined" ||
            window.ccdIdiomaListo === true;

        if(existeDevocional && idiomaListo){
            clearInterval(esperarDevocional);
            iniciarLectorVoz();
            return;
        }

        if(intentos >= maxIntentos){
            clearInterval(esperarDevocional);
        }
    }, 200);
});
