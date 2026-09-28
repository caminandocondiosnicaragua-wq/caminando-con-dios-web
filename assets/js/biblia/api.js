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

/************************************************
 * CACHÉ LOCAL DE CAPÍTULOS
 *
 * El lector del devocional utiliza una sola Biblia
 * (NVI 2025 mediante el identificador DEVOCIONAL).
 *
 * La caché se mantiene separada por versión, libro
 * y capítulo para no mezclar traducciones.
 ************************************************/

const CLAVE_CACHE_CAPITULOS_BIBLIA = "caminandoBibliaCapitulos_v1";

function crearClaveCacheCapitulo_(libro, capitulo, version){
    return `${version}|${libro}|${capitulo}`;
}

function leerCapituloCache_(libro, capitulo, version){
    try{
        const almacen = localStorage.getItem(
            CLAVE_CACHE_CAPITULOS_BIBLIA
        );

        if(!almacen) return null;

        const cache = JSON.parse(almacen);
        const clave = crearClaveCacheCapitulo_(
            libro,
            capitulo,
            version
        );

        return cache[clave] || null;

    }catch(error){
        console.warn("No fue posible leer la caché bíblica:", error);
        return null;
    }
}

function guardarCapituloCache_(libro, capitulo, version, datos){
    try{
        const almacen = localStorage.getItem(
            CLAVE_CACHE_CAPITULOS_BIBLIA
        );

        const cache = almacen ? JSON.parse(almacen) : {};

        const clave = crearClaveCacheCapitulo_(
            libro,
            capitulo,
            version
        );

        cache[clave] = datos;

        localStorage.setItem(
            CLAVE_CACHE_CAPITULOS_BIBLIA,
            JSON.stringify(cache)
        );

    }catch(error){
        /*
         * Si el almacenamiento está lleno o bloqueado,
         * no impedimos que el capítulo siga funcionando.
         */
        console.warn("No fue posible guardar la caché bíblica:", error);
    }
}


/************************************************
 * OBTENER CAPÍTULO BÍBLICO
 ************************************************/

async function obtenerCapituloBiblia(
    libro,
    capitulo,
    version = CONFIG.BIBLIA.traduccion
){
    /*
     * Primero buscamos en caché local.
     */
    const almacenado = leerCapituloCache_(
        libro,
        capitulo,
        version
    );

    if(almacenado){
        console.log(
            "📦 Capítulo cargado desde caché:",
            version,
            libro,
            capitulo
        );

        return almacenado;
    }

    /*
     * Solo si no existe en caché consultamos
     * el Web App, conservando su propia caché.
     */
    const datos = await consultarApiBiblia_("capitulo", {
        biblia: libro,
        capitulo,
        version
    });

    /*
     * Guardamos la respuesta para futuras lecturas.
     */
    guardarCapituloCache_(
        libro,
        capitulo,
        version,
        datos
    );

    return datos;
}