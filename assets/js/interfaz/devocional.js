/************************************************
 * CAMINANDO CON DIOS
 * DEVOCIONAL
 ************************************************/

/**
 * Construye todo el devocional
 */

function crearDevocional(devocional){

    return `

<section class="devocional">

    ${crearCabecera(devocional)}

    ${crearAcciones(devocional)}

    ${crearContenido(devocional)}

</section>

`;

}


/************************************************
 * CABECERA
 ************************************************/

function crearCabecera(devocional){

    return `

<header class="cabecera-devocional">

    <div class="fecha">

        📅 ${formatearFecha(devocional.FECHA)}

    </div>

    <h2 class="titulo-devocional">

        ${devocional.TITULO || "Devocional Diario"}

    </h2>

</header>

`;

}


/************************************************
 * CONTENIDO COMPLETO
 ************************************************/

function crearContenido(devocional){

    return `

${crearSeccion(

"📖",

"Enseñanza",

devocional["ENSEÑANZA"]

)}

${crearSeccion(

"💡",

"Idea Central",

devocional["IDEA CENTRAL"]

)}

${crearSeccion(

"📚",

"Explicación",

devocional["EXPLICACION"]

)}

${crearSeccion(

"❤️",

"Reflexión",

devocional["REFLEXION"]

)}

${crearSeccion(

"❓",

"Preguntas",

devocional["PREGUNTAS"]

)}

${crearSeccion(

"🙏",

"Oración",

devocional["ORACION"]

)}

${crearPalabraVida(

devocional["PALABRA DE VIDA"]

)}

`;

}


/************************************************
 * SECCIÓN
 ************************************************/

function crearSeccion(icono,titulo,texto){
    return `
<section class="seccion">
    <div class="titulo-seccion">
        <span class="icono">
            ${icono}
        </span>
        <h3>
            ${titulo}
        </h3>
    </div>
    <div class="contenido-seccion">
        ${texto || ""}
    </div>
</section>
`;

}


/************************************************
 * PALABRA DE VIDA
 ************************************************/

function crearPalabraVida(texto){
    return `
<section class="palabra-vida">
    <h3>
        ✨ Palabra de Vida
    </h3>
    <blockquote>
        ${texto || ""}
    </blockquote>
</section>

`;

}
