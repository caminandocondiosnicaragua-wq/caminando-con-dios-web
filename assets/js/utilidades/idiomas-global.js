/************************************************
 * CAMINANDO CON DIOS
 * TRADUCCIÓN GLOBAL DE PÁGINAS
 *
 * Complementa idiomas.js para que la traducción
 * funcione también en páginas que no contienen
 * un devocional.
 ************************************************/
(function(){
    "use strict";

    const idioma = window.ccdIdiomaActual || "es";
    if(idioma === "es") return;

    function crearGoogle(){
        if(document.getElementById("google_translate_element")) return;

        const div = document.createElement("div");
        div.id = "google_translate_element";
        div.className = "notranslate";
        div.setAttribute("translate", "no");
        document.body.appendChild(div);
    }

    function aplicar(){
        const combo = document.querySelector(".goog-te-combo");
        if(!combo) return false;

        const existe = Array.from(combo.options || [])
            .some(opcion => opcion.value === idioma);

        if(!existe) return false;

        combo.value = idioma;
        combo.dispatchEvent(new Event("change", {bubbles:true}));
        return true;
    }

    function esperar(maximo){
        if(aplicar()){
            setTimeout(aplicar, 800);
            setTimeout(aplicar, 1600);
            return;
        }

        if(maximo <= 0) return;
        setTimeout(function(){ esperar(maximo - 1); }, 250);
    }

    function iniciar(){
        crearGoogle();

        if(window.google && window.google.translate){
            iniciarElemento();
            return;
        }

        window.googleTranslateElementInitGlobal = function(){
            iniciarElemento();
        };

        if(document.querySelector("script[data-ccd-google-global='true']")){
            esperar(60);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInitGlobal";
        script.async = true;
        script.dataset.ccdGoogleGlobal = "true";
        document.head.appendChild(script);
    }

    function iniciarElemento(){
        try{
            if(!document.querySelector(".goog-te-combo")){
                new google.translate.TranslateElement({
                    pageLanguage: "es",
                    includedLanguages: "en,pt,zh-CN,ko,ja,ru,ar",
                    autoDisplay: false,
                    multilanguagePage: true
                }, "google_translate_element");
            }
        }catch(error){
            console.warn("No fue posible iniciar la traducción global.", error);
        }
        esperar(60);
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", iniciar);
    }else{
        iniciar();
    }
})();
