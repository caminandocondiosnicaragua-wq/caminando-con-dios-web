/*
 * Inicialización independiente del lector de voz.
 * No modifica la lógica existente de app.js.
 */
window.addEventListener("DOMContentLoaded", function(){
    let intentos = 0;
    const maxIntentos = 100;

    const esperarDevocional = setInterval(function(){
        intentos++;

        if(window.devocionalActual && document.querySelector(".devocional")){
            clearInterval(esperarDevocional);
            iniciarLectorVoz();
            return;
        }

        if(intentos >= maxIntentos){
            clearInterval(esperarDevocional);
        }
    }, 200);
});
