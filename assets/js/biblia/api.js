
/************************************************
 * Devuelve la fecha de HOY en formato "AAAA-MM-DD",
 * calculada SIEMPRE según la zona horaria de Nicaragua
 * (América/Managua), sin importar dónde esté el visitante.
 *
 * Así, alguien viendo tu web desde España, México o Japón
 * verá el mismo devocional que alguien en Nicaragua,
 * porque la fecha "oficial" la decide el país, no el visitante.
 ***********************************************/
function obtenerFechaHoyTexto() {
    const formateador = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Managua",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    // El locale "en-CA" da el formato AAAA-MM-DD directamente,
    // que es el mismo formato que usas en tu columna FECHA.
    return formateador.format(new Date());
}

/************************************************
 * Obtiene el devocional de HOY (no todos los días)
 ***********************************************/
async function obtenerDevocionalHoy() {
    const respuesta = await fetch(CONFIG.API.url);
    if (!respuesta.ok) {
        throw new Error("No fue posible conectar con la API.");
    }

    // Esto ahora es un ARRAY con los 31 días del mes
    const todosLosDias = await respuesta.json();

    // Buscamos, dentro de ese array, el día que coincide con hoy
    const fechaHoy = obtenerFechaHoyTexto();
    const devocionalDeHoy = todosLosDias.find(
        (dia) => dia.FECHA === fechaHoy
    );

    // Si por alguna razón no existe el día de hoy en la hoja,
    // avisamos con un error claro en vez de quedarnos "colgados"
    if (!devocionalDeHoy) {
        throw new Error(
            "No se encontró el devocional para la fecha de hoy (" + fechaHoy + ")."
        );
    }

    return devocionalDeHoy;
}

/************************************************
 * CAMINANDO CON DIOS
 * API BÍBLICA
 ************************************************/

/************************************************
 * OBTENER CAPÍTULO DE LA BIBLIA
 ************************************************/

async function obtenerCapituloBiblia(
    libro,
    capitulo,
    version = CONFIG.BIBLIA.traduccion
){

    const url =

        CONFIG.API.url +

        "?accion=capitulo" +

        "&biblia=" + encodeURIComponent(libro) +

        "&capitulo=" + encodeURIComponent(capitulo) +

        "&version=" + encodeURIComponent(version);

    const respuesta = await fetch(url);

    if(!respuesta.ok){

        throw new Error(

            "No fue posible consultar la API Bíblica."

        );

    }

    const datos = await respuesta.json();

    if(datos.error){

        throw new Error(

            datos.mensaje || "La API devolvió un error."

        );

    }

    return datos;

}
