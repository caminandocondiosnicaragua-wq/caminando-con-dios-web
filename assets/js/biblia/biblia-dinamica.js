/************************************************
 * CAMINANDO CON DIOS
 * BIBLIA DINÁMICA POR BIBLIA ID
 *
 * La edición seleccionada es la fuente de verdad para
 * libros, nombres, capítulos y texto.
 ************************************************/

const BIBLIA_DINAMICA_OT = new Set([
    "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI",
    "1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER",
    "LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG",
    "ZEC","MAL"
]);

const BIBLIA_DINAMICA_ORDEN = [
    "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI",
    "1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER",
    "LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG",
    "ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP",
    "COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN",
    "3JN","JUD","REV"
];

const BIBLIA_DINAMICA_GRUPOS_OT = [
    { titulo: "Pentateuco", ids: ["GEN","EXO","LEV","NUM","DEU"] },
    { titulo: "Históricos", ids: ["JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST"] },
    { titulo: "Poéticos y Sapienciales", ids: ["JOB","PSA","PRO","ECC","SNG"] },
    { titulo: "Profetas Mayores", ids: ["ISA","JER","LAM","EZK","DAN"] },
    { titulo: "Profetas Menores", ids: ["HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL"] }
];

const BIBLIA_DINAMICA_GRUPOS_NT = [
    { titulo: "Evangelios", ids: ["MAT","MRK","LUK","JHN"] },
    { titulo: "Historia", ids: ["ACT"] },
    { titulo: "Cartas de Pablo", ids: ["ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM"] },
    { titulo: "Cartas Generales", ids: ["HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD"] },
    { titulo: "Profecía", ids: ["REV"] }
];

let BIBLIA_DINAMICA_ESTADO = {
    bibleId: null,
    libros: [],
    libroActual: null,
    capitulosActuales: []
};

function etiquetaTestamentoBiblia_(tipo) {
    const idioma = (obtenerBibliaSeleccionada() || {}).idioma || "es";
    const etiquetas = {
        es: { antiguo: "Antiguo Testamento", nuevo: "Nuevo Testamento" },
        en: { antiguo: "Old Testament", nuevo: "New Testament" },
        pt: { antiguo: "Antigo Testamento", nuevo: "Novo Testamento" },
        fr: { antiguo: "Ancien Testament", nuevo: "Nouveau Testament" },
        de: { antiguo: "Altes Testament", nuevo: "Neues Testament" },
        nl: { antiguo: "Oude Testament", nuevo: "Nieuwe Testament" },
        ro: { antiguo: "Vechiul Testament", nuevo: "Noul Testament" },
        ru: { antiguo: "Ветхий Завет", nuevo: "Новый Завет" },
        sv: { antiguo: "Gamla testamentet", nuevo: "Nya testamentet" },
        da: { antiguo: "Det Gamle Testamente", nuevo: "Det Nye Testamente" },
        ja: { antiguo: "旧約聖書", nuevo: "新約聖書" },
        ko: { antiguo: "구약성경", nuevo: "신약성경" }
    };
    return (etiquetas[idioma] || etiquetas.es)[tipo];
}

function obtenerIdiomaInterfazBiblia_() {
    return window.ccdIdiomaActual || "es";
}

function textoInterfazBiblia_(clave) {
    const idioma = obtenerIdiomaInterfazBiblia_();
    const textos = {
        es: { buscar: "Buscar", cargar: "Cargando", capitulos: "Selecciona un capítulo", libros: "Libros", anterior: "Anterior", siguiente: "Siguiente →", error: "No se pudo cargar la Biblia" },
        en: { buscar: "Search", cargar: "Loading", capitulos: "Select a chapter", libros: "Books", anterior: "Previous", siguiente: "Next →", error: "The Bible could not be loaded" },
        pt: { buscar: "Buscar", cargar: "Carregando", capitulos: "Selecione um capítulo", libros: "Livros", anterior: "Anterior", siguiente: "Próximo →", error: "Não foi possível carregar a Bíblia" },
        fr: { buscar: "Rechercher", cargar: "Chargement", capitulos: "Sélectionnez un chapitre", libros: "Livres", anterior: "Précédent", siguiente: "Suivant →", error: "La Bible n'a pas pu être chargée" }
    };
    return (textos[idioma] || textos.es)[clave];
}

function normalizarLibroDinamico_(libro) {
    if (!libro) return null;
    const id = String(libro.id || libro.abreviatura || libro.abbreviation || libro.code || "").trim();
    const abreviatura = String(libro.abreviatura || libro.abbreviation || id).trim();
    const nombre = String(libro.nombre || libro.name || libro.nameLong || id).trim();
    return {
        id,
        nombre,
        abreviatura,
        capitulos: Array.isArray(libro.capitulos) ? libro.capitulos : (Array.isArray(libro.chapters) ? libro.chapters : []),
        testamento: libro.testamento || libro.testament || null
    };
}

function codigoCanonicoLibroDinamico_(libro) {
    if (!libro) return null;
    const candidatos = [libro.id, libro.abreviatura].filter(Boolean).map(valor => String(valor).toUpperCase().trim());
    for (const candidato of candidatos) {
        if (BIBLIA_DINAMICA_ORDEN.includes(candidato)) return candidato;
    }
    return null;
}

function testamentoDeLibroDinamico_(libro, indice) {
    if (libro && String(libro.testamento || "").toLowerCase().includes("nuevo")) return "nuevo";
    if (libro && String(libro.testamento || "").toLowerCase().includes("new")) return "nuevo";
    if (libro && String(libro.testamento || "").toLowerCase().includes("antiguo")) return "antiguo";
    if (libro && String(libro.testamento || "").toLowerCase().includes("old")) return "antiguo";

    const canonico = codigoCanonicoLibroDinamico_(libro);
    if (canonico) return BIBLIA_DINAMICA_OT.has(canonico) ? "antiguo" : "nuevo";

    // Fallback únicamente para ediciones con IDs no estándar: conservamos el libro
    // y usamos su posición devuelta por API.Bible para no ocultarlo.
    return Number(indice) < 39 ? "antiguo" : "nuevo";
}

function obtenerLibroDinamicoPorId_(id) {
    return BIBLIA_DINAMICA_ESTADO.libros.find(libro => libro.id === id) || null;
}

function normalizarCapituloDinamico_(capitulo) {
    if (!capitulo) return null;
    const id = capitulo.id || capitulo.chapterId || capitulo.nombre || capitulo.reference;
    const numeroTexto = capitulo.numero ?? capitulo.number ?? String(id || "").split(".").pop();
    return {
        id,
        numero: Number(numeroTexto),
        nombre: capitulo.nombre || capitulo.reference || capitulo.name || id
    };
}

async function cargarLibrosBibliaDinamica_() {
    const biblia = obtenerBibliaSeleccionada();
    const contenido = document.getElementById("bibliaContenido");
    if (!biblia || !contenido) return;

    BIBLIA_DINAMICA_ESTADO.bibleId = biblia.id;
    BIBLIA_DINAMICA_ESTADO.libroActual = null;
    BIBLIA_DINAMICA_ESTADO.capitulosActuales = [];
    contenido.innerHTML = `<div class="cargando-biblia">${textoInterfazBiblia_("cargar")} libros…</div>`;

    try {
        const respuesta = await obtenerLibrosBiblia(biblia.id);
        const lista = Array.isArray(respuesta) ? respuesta : (respuesta.data || respuesta.libros || []);
        BIBLIA_DINAMICA_ESTADO.libros = lista.map(normalizarLibroDinamico_).filter(libro => libro && libro.id && libro.nombre);
        renderizarInicioBibliaDinamica_();
    } catch (error) {
        contenido.innerHTML = `<div class="error-biblia"><h3>${textoInterfazBiblia_("error")}</h3><p>${error.message}</p></div>`;
    }
}

function gruposDisponiblesBiblia_(testamento) {
    const grupos = testamento === "antiguo" ? BIBLIA_DINAMICA_GRUPOS_OT : BIBLIA_DINAMICA_GRUPOS_NT;
    const resultado = grupos.map(grupo => ({
        titulo: grupo.titulo,
        libros: grupo.ids.map(id => BIBLIA_DINAMICA_ESTADO.libros.find(libro => codigoCanonicoLibroDinamico_(libro) === id)).filter(Boolean)
    })).filter(grupo => grupo.libros.length);

    const usados = new Set(resultado.flatMap(grupo => grupo.libros.map(libro => libro.id)));
    const otros = BIBLIA_DINAMICA_ESTADO.libros.filter((libro, indice) => testamentoDeLibroDinamico_(libro, indice) === testamento && !usados.has(libro.id));
    if (otros.length) resultado.push({ titulo: "Otros libros", libros: otros });
    return resultado;
}

function renderizarInicioBibliaDinamica_(testamento = null) {
    const contenido = document.getElementById("bibliaContenido");
    if (!contenido) return;

    const librosOT = BIBLIA_DINAMICA_ESTADO.libros.filter((libro, indice) => testamentoDeLibroDinamico_(libro, indice) === "antiguo");
    const librosNT = BIBLIA_DINAMICA_ESTADO.libros.filter((libro, indice) => testamentoDeLibroDinamico_(libro, indice) === "nuevo");
    const tieneOT = librosOT.length > 0;
    const tieneNT = librosNT.length > 0;
    const activo = testamento || (tieneOT ? "antiguo" : "nuevo");

    const botones = [];
    if (tieneOT) botones.push(`<button class="testamento ${activo === "antiguo" ? "activo" : ""}" data-testamento="antiguo"><span>📜</span><strong>${etiquetaTestamentoBiblia_("antiguo")}</strong><small>${librosOT.length} libros</small></button>`);
    if (tieneNT) botones.push(`<button class="testamento ${activo === "nuevo" ? "activo" : ""}" data-testamento="nuevo"><span>✝️</span><strong>${etiquetaTestamentoBiblia_("nuevo")}</strong><small>${librosNT.length} libros</small></button>`);

    contenido.innerHTML = `<div class="testamentos">${botones.join("")}</div><div id="clasificacionesBiblia">${crearClasificacionesDinamicas_(activo)}</div>`;
}

function crearClasificacionesDinamicas_(testamento) {
    const grupos = gruposDisponiblesBiblia_(testamento);
    if (!grupos.length) return `<div class="sin-resultados-biblia">No hay libros disponibles en esta edición.</div>`;

    return grupos.map(grupo => `<section class="grupo-biblia"><h3>${grupo.titulo}</h3><div class="libros-grid">${grupo.libros.map(libro => `<button class="libro-card" data-libro-id="${libro.id}"><span class="libro-lomo">${libro.abreviatura}</span><span class="libro-nombre">${libro.nombre}</span></button>`).join("")}</div></section>`).join("");
}

function seleccionarTestamentoDinamico_(testamento) {
    const clasificaciones = document.getElementById("clasificacionesBiblia");
    if (!clasificaciones) return;
    document.querySelectorAll(".testamento").forEach(boton => boton.classList.toggle("activo", boton.dataset.testamento === testamento));
    clasificaciones.innerHTML = crearClasificacionesDinamicas_(testamento);
}

async function mostrarCapitulosBibliaDinamica_(libroId, capituloInicial = null, versiculoInicio = null, versiculoFin = null) {
    const libro = obtenerLibroDinamicoPorId_(libroId);
    const contenido = document.getElementById("bibliaContenido");
    if (!libro || !contenido) return;

    BIBLIA_DINAMICA_ESTADO.libroActual = libro;
    contenido.innerHTML = `<div class="cargando-biblia">${textoInterfazBiblia_("cargar")} capítulos de ${libro.nombre}…</div>`;

    try {
        let capitulos = libro.capitulos.map(normalizarCapituloDinamico_).filter(c => c && Number.isFinite(c.numero));
        if (!capitulos.length) {
            const respuesta = await obtenerCapitulosBiblia(obtenerBibliaSeleccionada().id, libro.id);
            const lista = Array.isArray(respuesta) ? respuesta : (respuesta.data || respuesta.capitulos || []);
            capitulos = lista.map(normalizarCapituloDinamico_).filter(c => c && Number.isFinite(c.numero));
        }

        BIBLIA_DINAMICA_ESTADO.capitulosActuales = capitulos.sort((a,b) => a.numero - b.numero);
        const botones = capitulos.map(capitulo => `<button class="capitulo-biblia" data-libro-id="${libro.id}" data-capitulo-id="${capitulo.id}" data-capitulo="${capitulo.numero}">${capitulo.numero}</button>`).join("");
        contenido.innerHTML = `<div class="ruta-biblia"><button id="volverBiblia">← ${textoInterfazBiblia_("libros")}</button><h2>${libro.nombre}</h2><p>${textoInterfazBiblia_("capitulos")}</p></div><div class="capitulos-grid">${botones}</div>`;
        document.getElementById("volverBiblia").addEventListener("click", () => renderizarInicioBibliaDinamica_());

        if (capituloInicial) {
            const capitulo = BIBLIA_DINAMICA_ESTADO.capitulosActuales.find(c => c.numero === Number(capituloInicial) || c.id === capituloInicial);
            if (capitulo) leerCapituloBibliaDinamica_(libro.id, capitulo.id, capitulo.numero, versiculoInicio, versiculoFin);
        }
    } catch (error) {
        contenido.innerHTML = `<div class="error-biblia"><h3>${textoInterfazBiblia_("error")}</h3><p>${error.message}</p><button id="volverBiblia">← ${textoInterfazBiblia_("libros")}</button></div>`;
        document.getElementById("volverBiblia").addEventListener("click", () => renderizarInicioBibliaDinamica_());
    }
}

async function leerCapituloBibliaDinamica_(libroId, capituloId, capituloNumero, versiculoInicio = null, versiculoFin = null) {
    const contenido = document.getElementById("bibliaContenido");
    const libro = obtenerLibroDinamicoPorId_(libroId);
    if (!contenido || !libro) return;

    const biblia = obtenerBibliaSeleccionada();
    contenido.innerHTML = `<div class="cargando-biblia">${textoInterfazBiblia_("cargar")} ${libro.nombre} ${capituloNumero}…</div>`;

    try {
        const datos = await obtenerCapituloBiblia(libro.id, capituloId, biblia.id);
        if (datos.bibleId && datos.bibleId !== biblia.id) {
            throw new Error(`La respuesta pertenece a otra Biblia (${datos.bibleId}). Se canceló la lectura para evitar mostrar una traducción incorrecta.`);
        }

        contenido.innerHTML = crearLectorBibliaDinamico_(datos, libro, capituloNumero, versiculoInicio, versiculoFin);
        activarControlesLectorDinamico_(libro.id, capituloNumero);
        if (versiculoInicio && typeof solicitarEnfoqueVersiculo === "function") solicitarEnfoqueVersiculo(versiculoInicio);
    } catch (error) {
        contenido.innerHTML = `<div class="error-biblia"><h3>${textoInterfazBiblia_("error")}</h3><p>${error.message}</p><button id="volverCapitulos">← ${libro.nombre}</button></div>`;
        document.getElementById("volverCapitulos").addEventListener("click", () => mostrarCapitulosBibliaDinamica_(libro.id));
    }
}

function crearLectorBibliaDinamico_(datos, libro, capituloNumero, versiculoInicio = null, versiculoFin = null) {
    const todos = datos.versiculos || [];
    const versiculos = versiculoInicio ? todos.filter(v => {
        const numero = Number(v.numero);
        return numero >= Number(versiculoInicio) && numero <= Number(versiculoFin || versiculoInicio);
    }) : todos;
    const biblia = obtenerBibliaSeleccionada();
    const referencia = datos.referencia || `${libro.nombre} ${capituloNumero}`;
    const subtitulo = versiculoInicio ? `Versículo${versiculoFin && versiculoFin !== versiculoInicio ? "s" : ""} ${versiculoInicio}${versiculoFin && versiculoFin !== versiculoInicio ? "–" + versiculoFin : ""}` : (datos.titulo || "");
    const indice = BIBLIA_DINAMICA_ESTADO.capitulosActuales.findIndex(c => c.numero === Number(capituloNumero));
    const anterior = indice > 0 ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice - 1] : null;
    const siguiente = indice >= 0 && indice < BIBLIA_DINAMICA_ESTADO.capitulosActuales.length - 1 ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice + 1] : null;

    return `<div class="lector-biblia"><div class="lector-barra"><button id="volverCapitulos">← ${libro.nombre}</button><div class="tamano-letra" aria-label="Tamaño de letra"><button data-size="small">A−</button><button data-size="normal" class="activo">A</button><button data-size="large">A+</button></div></div><div class="referencia-lectura"><h2>${referencia}</h2><p>${subtitulo || obtenerEtiquetaBiblia(biblia)}</p><small class="identificacion-traduccion">${biblia.idiomaNombre} · ${obtenerEtiquetaBiblia(biblia)} · ${biblia.titular}</small></div><article class="texto-biblia">${versiculos.map(v => `<p class="versiculo-biblia" id="versiculo-${v.numero}"><sup>${v.numero}</sup><span>${v.texto}</span></p>`).join("")}</article><div class="navegacion-capitulo"><button id="capAnterior" ${anterior ? "" : "disabled"}>← ${textoInterfazBiblia_("anterior")}</button><button id="capSiguiente" ${siguiente ? "" : "disabled"}>${textoInterfazBiblia_("siguiente")}</button></div></div>`;
}

function activarControlesLectorDinamico_(libroId, capituloNumero) {
    const volver = document.getElementById("volverCapitulos");
    if (volver) volver.addEventListener("click", () => mostrarCapitulosBibliaDinamica_(libroId));

    document.querySelectorAll(".tamano-letra button").forEach(boton => boton.addEventListener("click", () => {
        document.querySelectorAll(".tamano-letra button").forEach(x => x.classList.remove("activo"));
        boton.classList.add("activo");
        const texto = document.querySelector(".texto-biblia");
        if (texto) texto.dataset.size = boton.dataset.size;
    }));

    const indice = BIBLIA_DINAMICA_ESTADO.capitulosActuales.findIndex(c => c.numero === Number(capituloNumero));
    const anterior = indice > 0 ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice - 1] : null;
    const siguiente = indice >= 0 && indice < BIBLIA_DINAMICA_ESTADO.capitulosActuales.length - 1 ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice + 1] : null;
    const botonAnterior = document.getElementById("capAnterior");
    const botonSiguiente = document.getElementById("capSiguiente");
    if (botonAnterior && anterior) botonAnterior.addEventListener("click", () => leerCapituloBibliaDinamica_(libroId, anterior.id, anterior.numero));
    if (botonSiguiente && siguiente) botonSiguiente.addEventListener("click", () => leerCapituloBibliaDinamica_(libroId, siguiente.id, siguiente.numero));
}

function buscarLibroBibliaDinamico_(nombre) {
    const buscado = typeof normalizarTextoBiblia === "function" ? normalizarTextoBiblia(nombre) : String(nombre).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return BIBLIA_DINAMICA_ESTADO.libros.find(libro => {
        const texto = typeof normalizarTextoBiblia === "function" ? normalizarTextoBiblia(libro.nombre) : String(libro.nombre).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return texto === buscado;
    }) || null;
}

function interpretarBusquedaBibliaDinamica_(referencia) {
    if (!referencia) return null;
    const texto = referencia.trim().replace(/\s+/g, " ");
    const coincidencia = texto.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
    if (!coincidencia) {
        const libro = buscarLibroBibliaDinamico_(texto);
        return libro ? { libro, capitulo: null, versiculoInicio: null, versiculoFin: null } : null;
    }
    const libro = buscarLibroBibliaDinamico_(coincidencia[1]);
    if (!libro) return null;
    return {
        libro,
        capitulo: Number(coincidencia[2]),
        versiculoInicio: coincidencia[3] ? Number(coincidencia[3]) : null,
        versiculoFin: coincidencia[4] ? Number(coincidencia[4]) : (coincidencia[3] ? Number(coincidencia[3]) : null)
    };
}

function ejecutarBusquedaBibliaDinamica_() {
    const campo = document.getElementById("busquedaBiblia");
    const valor = campo ? campo.value.trim() : "";
    if (!valor) return;
    const referencia = interpretarBusquedaBibliaDinamica_(valor);
    if (!referencia) {
        alert("No pude encontrar esa referencia en la Biblia seleccionada.");
        return;
    }
    if (!referencia.capitulo) {
        mostrarCapitulosBibliaDinamica_(referencia.libro.id);
        return;
    }
    mostrarCapitulosBibliaDinamica_(referencia.libro.id, referencia.capitulo, referencia.versiculoInicio, referencia.versiculoFin);
}

function cambiarTraduccionBibliaDinamica_(evento) {
    const biblia = obtenerBibliaPorId(evento.target.value);
    if (!biblia) return;
    guardarBibliaSeleccionada(biblia.id);
    const datos = document.querySelector(".datos-traduccion-biblia");
    if (datos) datos.innerHTML = `<span><strong>Idioma:</strong> ${biblia.idiomaNombre}</span><span><strong>Traducción:</strong> ${obtenerEtiquetaBiblia(biblia)}</span><span><strong>Titular:</strong> ${biblia.titular}</span>`;
    cargarLibrosBibliaDinamica_();
}

function crearSelectorTraduccionBibliaDinamico_() {
    const seleccionada = obtenerBibliaSeleccionada();
    const opciones = BIBLIAS_PAGINA.map(biblia => `<option value="${biblia.id}" ${biblia.id === seleccionada.id ? "selected" : ""}>${biblia.idiomaNombre} — ${obtenerEtiquetaBiblia(biblia)}</option>`).join("");
    return `<section class="selector-traduccion-biblia"><div class="selector-traduccion-cabecera"><span class="selector-traduccion-icono">🌐</span><div><strong>Versión de la Biblia</strong><small>Selecciona el idioma y la traducción del texto bíblico.</small></div></div><select id="selectorTraduccionBiblia" aria-label="Seleccionar versión de la Biblia">${opciones}</select><div class="datos-traduccion-biblia"><span><strong>Idioma:</strong> ${seleccionada.idiomaNombre}</span><span><strong>Traducción:</strong> ${obtenerEtiquetaBiblia(seleccionada)}</span><span><strong>Titular:</strong> ${seleccionada.titular}</span></div></section>`;
}

function iniciarBiblia() {
    if (window.__bibliaDinamicaIniciada) return;
    const app = document.getElementById("app");
    if (!app) return;
    window.__bibliaDinamicaIniciada = true;
    app.style.display = "block";
    app.innerHTML = `${crearHeader()}<main class="biblia-app"><section class="biblia-portada"><div class="biblia-intro"><span class="biblia-simbolo">📖</span><h2>La Biblia</h2><p>Explora la Palabra de Dios, libro por libro y capítulo por capítulo.</p></div><div class="credito-biblia"><strong>📖 Fuente del texto bíblico</strong><p>Los pasajes bíblicos mostrados en esta página son obtenidos mediante <a href="https://api.bible" target="_blank" rel="noopener noreferrer">API.Bible</a>.</p><p>Las traducciones bíblicas pertenecen a sus respectivos titulares de derechos y se utilizan conforme a sus licencias y condiciones de uso.</p></div>${crearSelectorTraduccionBibliaDinamico_()}<div class="biblia-buscador"><input id="busquedaBiblia" type="text" placeholder="🔍 Buscar una referencia, por ejemplo: Juan 3:16"><button id="btnBuscarBiblia">Buscar</button></div><div id="bibliaContenido"></div></section></main>${crearFooter()}`;
    iniciarHeader();
    iniciarFooter();

    document.getElementById("btnBuscarBiblia").addEventListener("click", ejecutarBusquedaBibliaDinamica_);
    document.getElementById("busquedaBiblia").addEventListener("keydown", e => { if (e.key === "Enter") ejecutarBusquedaBibliaDinamica_(); });
    document.getElementById("selectorTraduccionBiblia").addEventListener("change", cambiarTraduccionBibliaDinamica_);
    cargarLibrosBibliaDinamica_();
}

document.addEventListener("click", evento => {
    const botonTestamento = evento.target.closest(".testamento");
    if (botonTestamento) seleccionarTestamentoDinamico_(botonTestamento.dataset.testamento);

    const botonLibro = evento.target.closest(".libro-card");
    if (botonLibro && botonLibro.dataset.libroId) mostrarCapitulosBibliaDinamica_(botonLibro.dataset.libroId);

    const botonCapitulo = evento.target.closest(".capitulo-biblia");
    if (botonCapitulo && botonCapitulo.dataset.capituloId) {
        leerCapituloBibliaDinamica_(botonCapitulo.dataset.libroId, botonCapitulo.dataset.capituloId, Number(botonCapitulo.dataset.capitulo));
    }
});
