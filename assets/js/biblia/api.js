/************************************************
 * CAMINANDO CON DIOS
 * API BÍBLICA
 ************************************************/

function obtenerFechaHoyTexto() {
    const formateador = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Managua",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return formateador.format(new Date());
}

async function obtenerDevocionalHoy() {
    const respuesta = await fetch(CONFIG.API.url);
    if (!respuesta.ok) throw new Error("No fue posible conectar con la API.");

    const todosLosDias = await respuesta.json();
    const fechaHoy = obtenerFechaHoyTexto();
    const devocionalDeHoy = todosLosDias.find(dia => dia.FECHA === fechaHoy);

    if (!devocionalDeHoy) {
        throw new Error("No se encontró el devocional para la fecha de hoy (" + fechaHoy + ").");
    }
    return devocionalDeHoy;
}

function construirUrlBiblia_(accion, parametros = {}) {
    const url = new URL(CONFIG.API.url);
    url.searchParams.set("accion", accion);
    Object.entries(parametros).forEach(([clave, valor]) => {
        if (valor !== undefined && valor !== null && valor !== "") {
            url.searchParams.set(clave, valor);
        }
    });
    return url.toString();
}

async function consultarApiBiblia_(accion, parametros = {}) {
    const respuesta = await fetch(construirUrlBiblia_(accion, parametros));

    if (!respuesta.ok) {
        let detalle = "";
        try {
            const error = await respuesta.json();
            detalle = error.mensaje || error.message || JSON.stringify(error);
        } catch (_) {}
        throw new Error(`API.Bible respondió con HTTP ${respuesta.status}${detalle ? ": " + detalle : ""}`);
    }

    const datos = await respuesta.json();
    if (datos && datos.error) {
        throw new Error(datos.mensaje || datos.message || "La API devolvió un error.");
    }
    return datos;
}

async function obtenerLibrosBiblia(version) {
    return consultarApiBiblia_("libros", { version });
}

async function obtenerCapitulosBiblia(version, libro) {
    return consultarApiBiblia_("capitulos", { version, libro });
}

async function obtenerCapituloBiblia(libro, capitulo, version = CONFIG.BIBLIA.traduccion) {
    return consultarApiBiblia_("capitulo", {
        biblia: libro,
        capitulo,
        version
    });
}
