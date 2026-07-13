/************************************************
 * CAMINANDO CON DIOS
 * DEVOCIONAL
 ************************************************/
/**
 * Construye todo el devocional
 * Nuevo orden: Cabecera (Título+Fecha) -> Acciones (botones+lectura) -> Lecturas (tarjetas AT/NT) -> Contenido
 */
function crearDevocional(devocional){
    return `
<section class="devocional">
    ${crearCabecera(devocional)}
    ${crearAcciones(devocional)}
    ${crearLecturas(devocional)}
    ${crearContenido(devocional)}
</section>
`;
}
/************************************************
 * CABECERA
 * Orden dentro de la cabecera: primero el Título, luego la Fecha
 ************************************************/
function crearCabecera(devocional){
    return `
<header class="cabecera-devocional">
    <h2 class="titulo-devocional">
        ${devocional["TíTULO"] || ""}
    </h2>
    <div class="fecha">
        📅 ${formatearFecha(devocional.FECHA)}
    </div>
</header>
`;
}
/************************************************
 * LECTURAS BÍBLICAS
 ************************************************/
function crearLecturas(devocional){
    return `
<div class="lecturas">
    <div class="lectura-card">
        <div class="lectura-icono">📖</div>
        <h3>Antiguo Testamento</h3>
        <p class="cita">
            ${devocional["TEXTO A.T."] || ""}
        </p>
    </div>
    <div class="lectura-card">
        <div class="lectura-icono">📖</div>
        <h3>Nuevo Testamento</h3>
        <p class="cita">
            ${devocional["TEXTO. N.T."] || ""}
        </p>
    </div>
</div>
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
