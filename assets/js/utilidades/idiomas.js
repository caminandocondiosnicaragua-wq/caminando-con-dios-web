/************************************************
 * CAMINANDO CON DIOS
 * SELECTOR DE IDIOMAS
 *
 * Traduce el contenido renderizado de la página.
 * No modifica el código JavaScript ni la fuente de datos.
 ************************************************/

(function(){
    "use strict";

    const IDIOMAS = [
        { codigo: "es", nombre: "Español", bandera: "🇪🇸" },
        { codigo: "en", nombre: "English", bandera: "🇺🇸" },
        { codigo: "pt", nombre: "Português", bandera: "🇧🇷" },
        { codigo: "zh-CN", nombre: "中文简体", bandera: "🇨🇳" },
        { codigo: "ko", nombre: "한국어", bandera: "🇰🇷" },
        { codigo: "ja", nombre: "日本語", bandera: "🇯🇵" },
        { codigo: "ru", nombre: "Русский", bandera: "🇷🇺" },
        { codigo: "ar", nombre: "العربية", bandera: "🇸🇦" }
    ];

    const STORAGE = "ccd_idioma";
    const ORIGEN = "es";
    const GOOGLE_COOKIE = "googtrans";

    window.ccdIdiomaActual = obtenerIdioma();
    window.ccdIdiomaListo = false;

    function idiomaValido(codigo){
        return IDIOMAS.some(idioma => idioma.codigo === codigo);
    }

    function obtenerIdioma(){
        try{
            const guardado = localStorage.getItem(STORAGE);
            if(guardado && idiomaValido(guardado)) return guardado;
        }catch(error){}
        return ORIGEN;
    }

    function guardarIdioma(codigo){
        try{ localStorage.setItem(STORAGE, codigo); }catch(error){}

        if(codigo === ORIGEN){
            borrarCookieGoogle();
            return;
        }

        document.cookie = `${GOOGLE_COOKIE}=/es/${codigo}; path=/; max-age=31536000; SameSite=Lax`;
    }

    function borrarCookieGoogle(){
        document.cookie = `${GOOGLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
        document.cookie = `${GOOGLE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    function estilos(){
        if(document.getElementById("ccd-idiomas-css")) return;

        const style = document.createElement("style");
        style.id = "ccd-idiomas-css";
        style.textContent = `
            .selector-idioma{position:relative;display:inline-flex;align-items:center;}
            .menu-idiomas{position:absolute;right:0;top:calc(100% + 10px);z-index:10000;width:215px;padding:8px;background:#0c1b2e;border:1px solid rgba(212,175,55,.35);border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.4);display:none;}
            .menu-idiomas.abierto{display:block;}
            .opcion-idioma{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;border:0;border-radius:9px;background:transparent;color:#fff;text-align:left;cursor:pointer;font:inherit;}
            .opcion-idioma:hover,.opcion-idioma.seleccionado{background:rgba(212,175,55,.16);color:#f5d87c;}
            .opcion-idioma .bandera{width:24px;text-align:center;}
            #google_translate_element{position:fixed!important;left:-10000px!important;top:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;}
            .goog-te-banner-frame,.goog-te-balloon-frame,.skiptranslate{display:none!important;}
            body{top:0!important;}
        `;
        document.head.appendChild(style);
    }

    function crearSelector(){
        const boton = document.getElementById("btnIdioma");
        if(!boton || document.querySelector(".selector-idioma")) return;

        const contenedor = document.createElement("div");
        contenedor.className = "selector-idioma notranslate";
        contenedor.setAttribute("translate", "no");
        boton.parentNode.insertBefore(contenedor, boton);
        contenedor.appendChild(boton);

        const menu = document.createElement("div");
        menu.className = "menu-idiomas notranslate";
        menu.setAttribute("translate", "no");
        menu.setAttribute("role", "menu");

        IDIOMAS.forEach(idioma => {
            const opcion = document.createElement("button");
            opcion.type = "button";
            opcion.className = "opcion-idioma";
            opcion.dataset.idioma = idioma.codigo;
            opcion.setAttribute("role", "menuitem");
            opcion.innerHTML = `<span class="bandera">${idioma.bandera}</span><span>${idioma.nombre}</span>`;
            opcion.addEventListener("click", function(){
                cambiarIdioma(idioma.codigo);
            });
            menu.appendChild(opcion);
        });

        contenedor.appendChild(menu);

        boton.setAttribute("aria-expanded", "false");
        boton.addEventListener("click", function(event){
            event.preventDefault();
            event.stopPropagation();
            const abierto = menu.classList.toggle("abierto");
            boton.setAttribute("aria-expanded", String(abierto));
        });

        document.addEventListener("click", function(event){
            if(!contenedor.contains(event.target)){
                menu.classList.remove("abierto");
                boton.setAttribute("aria-expanded", "false");
            }
        });

        actualizarSeleccion();
    }

    function actualizarSeleccion(){
        document.querySelectorAll(".opcion-idioma").forEach(opcion => {
            opcion.classList.toggle("seleccionado", opcion.dataset.idioma === window.ccdIdiomaActual);
        });

        const boton = document.getElementById("btnIdioma");
        if(boton){
            const actual = IDIOMAS.find(idioma => idioma.codigo === window.ccdIdiomaActual);
            boton.title = actual ? actual.nombre : "Español";
            boton.setAttribute("aria-label", `Seleccionar idioma. Actual: ${actual ? actual.nombre : "Español"}`);
        }
    }

    function cambiarIdioma(codigo){
        if(!idiomaValido(codigo)) return;
        window.ccdIdiomaActual = codigo;
        guardarIdioma(codigo);
        window.location.reload();
    }

    function crearContenedorGoogle(){
        if(document.getElementById("google_translate_element")) return;
        const elemento = document.createElement("div");
        elemento.id = "google_translate_element";
        elemento.className = "notranslate";
        elemento.setAttribute("translate", "no");
        document.body.appendChild(elemento);
    }

    function iniciarGoogle(){
        window.googleTranslateElementInit = function(){
            try{
                new google.translate.TranslateElement({
                    pageLanguage: "es",
                    includedLanguages: "en,pt,zh-CN,ko,ja,ru,ar",
                    autoDisplay: false,
                    multilanguagePage: true
                }, "google_translate_element");
            }catch(error){
                console.warn("No fue posible iniciar Google Translate.", error);
            }
        };

        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
    }

    function esperarDevocional(){
        const app = document.getElementById("app");
        if(!app){
            setTimeout(esperarDevocional, 250);
            return;
        }

        if(window.ccdIdiomaActual === ORIGEN){
            window.ccdIdiomaListo = true;
            document.dispatchEvent(new CustomEvent("ccd:idioma-listo"));
            return;
        }

        if(!document.querySelector(".devocional")){
            setTimeout(esperarDevocional, 250);
            return;
        }

        crearContenedorGoogle();
        iniciarGoogle();
        esperarSelectorGoogle(0);
    }

    function esperarSelectorGoogle(intentos){
        const combo = document.querySelector(".goog-te-combo");

        if(combo){
            combo.value = window.ccdIdiomaActual;
            combo.dispatchEvent(new Event("change"));

            // Damos tiempo a Google Translate para terminar de modificar
            // los nodos de texto antes de permitir que el lector de voz
            // prepare sus frases.
            setTimeout(function(){
                window.ccdIdiomaListo = true;
                document.dispatchEvent(new CustomEvent("ccd:idioma-listo"));
            }, 1200);
            return;
        }

        if(intentos >= 40){
            // Si Google no responde, nunca bloqueamos la página.
            window.ccdIdiomaListo = true;
            document.dispatchEvent(new CustomEvent("ccd:idioma-listo"));
            return;
        }

        setTimeout(function(){ esperarSelectorGoogle(intentos + 1); }, 250);
    }

    function iniciar(){
        estilos();
        crearSelector();
        esperarDevocional();
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", iniciar);
    }else{
        iniciar();
    }

})();
