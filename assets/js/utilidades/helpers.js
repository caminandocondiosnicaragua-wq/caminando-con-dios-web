/************************************************
 * CAMINANDO CON DIOS
 * HELPERS
 ************************************************/


/************************************************
 * SELECCIONAR ELEMENTO
 ************************************************/

function $(selector){

    return document.querySelector(selector);

}


/************************************************
 * SELECCIONAR VARIOS ELEMENTOS
 ************************************************/

function $$(selector){

    return document.querySelectorAll(selector);

}


/************************************************
 * MOSTRAR ELEMENTO
 ************************************************/

function mostrar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.style.display="block";

    }

}


/************************************************
 * OCULTAR ELEMENTO
 ************************************************/

function ocultar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.style.display="none";

    }

}


/************************************************
 * ACTIVAR
 ************************************************/

function activar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.classList.add("activo");

    }

}


/************************************************
 * DESACTIVAR
 ************************************************/

function desactivar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.classList.remove("activo");

    }

}


/************************************************
 * ALTERNAR
 ************************************************/

function alternar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.classList.toggle("activo");

    }

}


/************************************************
 * SCROLL SUAVE
 ************************************************/

function irA(selector){

    const elemento=$(selector);

    if(!elemento) return;

    elemento.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


/************************************************
 * ESPERAR
 ************************************************/

function esperar(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}


/************************************************
 * LIMPIAR HTML
 ************************************************/

function limpiar(selector){

    const elemento=$(selector);

    if(elemento){

        elemento.innerHTML="";

    }

}


/************************************************
 * INSERTAR HTML
 ************************************************/

function insertar(selector,html){

    const elemento=$(selector);

    if(elemento){

        elemento.innerHTML=html;

    }

}


/************************************************
 * AGREGAR HTML
 ************************************************/

function agregar(selector,html){

    const elemento=$(selector);

    if(elemento){

        elemento.insertAdjacentHTML(

            "beforeend",

            html

        );

    }

}


/************************************************
 * MENSAJE
 ************************************************/

function mensaje(texto){

    alert(texto);

}
