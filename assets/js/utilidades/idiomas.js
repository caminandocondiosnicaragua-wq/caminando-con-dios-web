/************************************************
 * CAMINANDO CON DIOS
 * SELECTOR DE IDIOMAS
 *
 * Traduce el contenido renderizado de la página.
 * Mantiene separado el código, el lector de voz y
 * la fuente de datos del devocional.
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

        // Google Translate usa esta cookie para conservar el idioma
        // después de recargar la página.
        if(codigo === ORIGEN){
            borrarCookieGoogle();
            return;
        }

        const valor = `/es/${codigo}`;
        const maxAge = 31536000;
        document.cookie = `${GOOGLE_COOKIE}=${valor}; path=/; max-age=${maxAge}; SameSite=Lax`;
        try{
            document.cookie = `${GOOGLE_COOKIE}=${valor}; domain=${location.hostname}; path=/; max-age=${maxAge}; SameSite=Lax`;
        }catch(error){}
    }

    function borrarCookieGoogle(){
        document.cookie = `${GOOGLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
        document.cookie = `${GOOGLE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        try{
            document.cookie = `${GOOGLE_COOKIE}=; domain=${location.hostname}; path=/; max-age=0; SameSite=Lax`;
        }catch(error){}
    }

    function estilos(){
        if(document.getElementById("ccd-idiomas-css")) return;

        const style = document.createElement("style");
        style.id = "ccd-idiomas-css";
        style.textContent = `
            .selector-idioma{
                position:relative;
                display:inline-flex;
                align-items:center;
                z-index:10001;
            }

            .selector-idioma #btnIdioma{
                width:42px;
                height:42px;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                padding:0;
                margin:0;
                border:1px solid rgba(255,255,255,.18);
                border-radius:9px;
                background:rgba(255,255,255,.06);
                color:#fff;
                cursor:pointer;
                transition:transform .15s ease, background .15s ease, border-color .15s ease;
                -webkit-tap-highlight-color:transparent;
            }

            .selector-idioma #btnIdioma:hover,
            .selector-idioma #btnIdioma[aria-expanded="true"]{
                background:rgba(212,175,55,.14);
                border-color:rgba(212,175,55,.7);
                transform:scale(1.04);
            }

            .selector-idioma #btnIdioma:focus-visible{
                outline:2px solid #d4af37;
                outline-offset:2px;
            }

            .icono-mundo{
                width:23px;
                height:23px;
                display:block;
                fill:none;
                stroke:currentColor;
                stroke-width:1.8;
                stroke-linecap:round;
                stroke-linejoin:round;
                pointer-events:none;
            }

            .menu-idiomas{
                position:absolute;
                right:0;
                top:calc(100% + 9px);
                z-index:100000;
                width:225px;
                padding:8px;
                background:#0c1b2e;
                border:1px solid rgba(212,175,55,.45);
                border-radius:14px;
                box-shadow:0 18px 40px rgba(0,0,0,.45);
                display:none;
            }

            .menu-idiomas.abierto{display:block;}

            .opcion-idioma{
                width:100%;
                display:flex;
                align-items:center;
                gap:10px;
                padding:10px 12px;
                border:0;
                border-radius:9px;
                background:transparent;
                color:#fff;
                text-align:left;
                cursor:pointer;
                font:inherit;
                line-height:1.25;
                -webkit-tap-highlight-color:transparent;
            }

            .opcion-idioma:hover,
            .opcion-idioma.seleccionado{
                background:rgba(212,175,55,.16);
                color:#f5d87c;
            }

            .opcion-idioma:active{background:rgba(212,175,55,.25);}
            .opcion-idioma .bandera{width:24px;text-align:center;flex:0 0 24px;}

            #google_translate_element{
                position:fixed!important;
                left:-10000px!important;
                top:-10000px!important;
                width:1px!important;
                height:1px!important;
                overflow:hidden!important;
                opacity:0!important;
                pointer-events:none!important;
            }

            .goog-te-banner-frame,.goog-te-balloon-frame,.skiptranslate{display:none!important;}
            body{top:0!important;}
        `;
        document.head.appendChild(style);
    }

    function ponerIconoMundo(boton){
        if(!boton) return;
        boton.innerHTML = `
            <svg class="icono-mundo" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5"></circle>
                <path d="M2.8 12h18.4"></path>
                <path d="M12 2.5c2.6 2.6 3.8 5.8 3.8 9.5S14.6 18.9 12 21.5"></path>
                <path d="M12 2.5C9.4 5.1 8.2 8.3 8.2 12s1.2 6.9 3.8 9.5"></path>
                <path d="M4.2 7.2h15.6M4.2 16.8h15.6"></path>
            </svg>`;
    }

    function crearSelector(){
        const boton = document.getElementById("btnIdioma");
        if(!boton) return false;

        ponerIconoMundo(boton);

        if(document.querySelector(".selector-idioma")){
            actualizarSeleccion();
            return true;
        }

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
            opcion.addEventListener("click", function(event){
                event.preventDefault();
                event.stopPropagation();
                cambiarIdioma(idioma.codigo);
            });
            menu.appendChild(opcion);
        });

        contenedor.appendChild(menu);

        boton.setAttribute("aria-expanded", "false");
        boton.addEventListener("click", function(event){
            event.preventDefault();
            event.stopPropagation();
            menu.classList.toggle("abierto");
            boton.setAttribute("aria-expanded", String(menu.classList.contains("abierto")));
        });

        menu.addEventListener("click", function(event){
            event.stopPropagation();
        });

        document.addEventListener("click", function(event){
            if(!contenedor.contains(event.target)) cerrarMenu();
        });

        document.addEventListener("keydown", function(event){
            if(event.key === "Escape") cerrarMenu();
        });

        function cerrarMenu(){
            menu.classList.remove("abierto");
            boton.setAttribute("aria-expanded", "false");
        }

        actualizarSeleccion();
        return true;
    }

    function esperarBotonIdioma(intentos){
        if(crearSelector()) return;
        if(intentos >= 80){
            console.warn("No se encontró #btnIdioma para inicializar el selector.");
            return;
        }
        setTimeout(function(){ esperarBotonIdioma(intentos + 1); }, 250);
    }

    function observarHeader(){
        if(document.getElementById("btnIdioma")){
            crearSelector();
            return;
        }

        const observer = new MutationObserver(function(){
            if(document.getElementById("btnIdioma")){
                crearSelector();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {childList:true, subtree:true});
        esperarBotonIdioma(0);
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

        // Una sola acción de usuario: guardar idioma y recargar desde
        // el HTML original. Así el lector de voz vuelve a inicializarse
        // sobre el texto ya traducido, sin alterar el contenido fuente.
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
        if(window.__ccdGoogleTranslateIniciado) return;
        window.__ccdGoogleTranslateIniciado = true;

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
        if(!app){ setTimeout(esperarDevocional, 250); return; }

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

    function seleccionarGoogleIdioma(codigo, combo){
        if(!combo) return false;

        const existe = Array.from(combo.options || []).some(opcion => opcion.value === codigo);
        if(!existe) return false;

        combo.value = codigo;
        combo.dispatchEvent(new Event("change", {bubbles:true}));
        return true;
    }

    function esperarSelectorGoogle(intentos){
        const combo = document.querySelector(".goog-te-combo");

        if(combo && seleccionarGoogleIdioma(window.ccdIdiomaActual, combo)){
            setTimeout(function(){
                // Segunda aplicación por seguridad: algunas cargas de
                // Google reemplazan el combo durante los primeros instantes.
                const combo2 = document.querySelector(".goog-te-combo");
                seleccionarGoogleIdioma(window.ccdIdiomaActual, combo2);
            }, 900);

            setTimeout(function(){
                window.ccdIdiomaListo = true;
                document.dispatchEvent(new CustomEvent("ccd:idioma-listo"));
            }, 1400);
            return;
        }

        if(intentos >= 60){
            // Google Translate nunca debe impedir que el devocional
            // ni el lector de voz funcionen.
            window.ccdIdiomaListo = true;
            document.dispatchEvent(new CustomEvent("ccd:idioma-listo"));
            return;
        }

        setTimeout(function(){ esperarSelectorGoogle(intentos + 1); }, 250);
    }

    function iniciar(){
        estilos();
        observarHeader();
        esperarDevocional();
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", iniciar);
    }else{
        iniciar();
    }

})();
