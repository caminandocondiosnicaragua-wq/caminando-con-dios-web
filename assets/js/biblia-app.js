document.addEventListener("DOMContentLoaded", iniciarBiblia);

const GRUPOS_BIBLIA = {
    antiguo: [
        { titulo: "Pentateuco", libros: ["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio"] },
        { titulo: "Históricos", libros: ["Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", "Esdras", "Nehemías", "Ester"] },
        { titulo: "Poéticos y Sapienciales", libros: ["Job", "Salmos", "Proverbios", "Eclesiastés", "Cantares"] },
        { titulo: "Profetas Mayores", libros: ["Isaías", "Jeremías", "Lamentaciones", "Ezequiel", "Daniel"] },
        { titulo: "Profetas Menores", libros: ["Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías"] }
    ],
    nuevo: [
        { titulo: "Evangelios", libros: ["Mateo", "Marcos", "Lucas", "Juan"] },
        { titulo: "Historia", libros: ["Hechos"] },
        { titulo: "Cartas de Pablo", libros: ["Romanos", "1 Corintios", "2 Corintios", "Gálatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo", "2 Timoteo", "Tito", "Filemón"] },
        { titulo: "Cartas Generales", libros: ["Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas"] },
        { titulo: "Profecía", libros: ["Apocalipsis"] }
    ]
};

function iniciarBiblia(){
    const app = document.getElementById("app");
    if(!app) return;
    app.style.display = "block";
    app.innerHTML = `${crearHeader()}<main class="biblia-app"><section class="biblia-portada"><div class="biblia-intro"><span class="biblia-simbolo">📖</span><h2>La Biblia</h2><p>Explora la Palabra de Dios, libro por libro y capítulo por capítulo.</p></div><div class="credito-biblia"><strong>📖 Fuente del texto bíblico</strong><p>Los pasajes bíblicos mostrados en esta página son obtenidos mediante <a href="https://api.bible" target="_blank" rel="noopener noreferrer">API.Bible</a>.</p><p>Las traducciones bíblicas pertenecen a sus respectivos titulares de derechos y se utilizan conforme a sus licencias y condiciones de uso.</p></div>${crearSelectorTraduccionBiblia()}<div class="biblia-buscador"><input id="busquedaBiblia" type="text" placeholder="🔍 Buscar una referencia, por ejemplo: Juan 3:16"><button id="btnBuscarBiblia">Buscar</button></div><div id="bibliaContenido">${crearSelectorTestamentos()}</div></section></main>${crearFooter()}`;
    iniciarHeader();
    iniciarFooter();
    document.getElementById("btnBuscarBiblia").addEventListener("click", ejecutarBusquedaBiblia);
    document.getElementById("busquedaBiblia").addEventListener("keydown", e => { if(e.key === "Enter") ejecutarBusquedaBiblia(); });
    const selector = document.getElementById("selectorTraduccionBiblia");
    if(selector) selector.addEventListener("change", cambiarTraduccionBiblia);
}

function crearSelectorTraduccionBiblia(){
    const seleccionada = obtenerBibliaSeleccionada();
    const opciones = BIBLIAS_PAGINA.map(biblia => {
        const etiqueta = obtenerEtiquetaBiblia(biblia);
        const disabled = biblia.alcance === "Nuevo Testamento" ? "" : "";
        return `<option value="${biblia.id}" ${biblia.id === seleccionada.id ? "selected" : ""} ${disabled}>${biblia.idiomaNombre} — ${etiqueta}</option>`;
    }).join("");
    return `<section class="selector-traduccion-biblia"><div class="selector-traduccion-cabecera"><span class="selector-traduccion-icono">🌐</span><div><strong>Versión de la Biblia</strong><small>Selecciona el idioma y la traducción del texto bíblico.</small></div></div><select id="selectorTraduccionBiblia" aria-label="Seleccionar versión de la Biblia">${opciones}</select><div class="datos-traduccion-biblia"><span><strong>Idioma:</strong> ${seleccionada.idiomaNombre}</span><span><strong>Traducción:</strong> ${obtenerEtiquetaBiblia(seleccionada)}</span><span><strong>Titular:</strong> ${seleccionada.titular}</span></div></section>`;
}

function cambiarTraduccionBiblia(evento){
    const biblia = obtenerBibliaPorId(evento.target.value);
    if(!biblia) return;
    guardarBibliaSeleccionada(biblia.id);
    const datos = document.querySelector(".datos-traduccion-biblia");
    if(datos) datos.innerHTML = `<span><strong>Idioma:</strong> ${biblia.idiomaNombre}</span><span><strong>Traducción:</strong> ${obtenerEtiquetaBiblia(biblia)}</span><span><strong>Titular:</strong> ${biblia.titular}</span>`;
    const contenido = document.getElementById("bibliaContenido");
    if(contenido) contenido.innerHTML = crearSelectorTestamentos();
}

function crearSelectorTestamentos(){
    return `<div class="testamentos"><button class="testamento activo" data-testamento="antiguo"><span>📜</span><strong>Antiguo Testamento</strong><small>39 libros</small></button><button class="testamento" data-testamento="nuevo"><span>✝️</span><strong>Nuevo Testamento</strong><small>27 libros</small></button></div><div id="clasificacionesBiblia">${crearClasificaciones("antiguo")}</div>`;
}

function crearClasificaciones(testamento){
    return GRUPOS_BIBLIA[testamento].map(grupo => `<section class="grupo-biblia"><h3>${grupo.titulo}</h3><div class="libros-grid">${grupo.libros.map(libro => `<button class="libro-card" data-libro="${libro}"><span class="libro-lomo">${obtenerAbreviaturaLibro(libro)}</span><span class="libro-nombre">${libro}</span></button>`).join("")}</div></section>`).join("");
}

function obtenerAbreviaturaLibro(libro){
    return libro.replace(/[^A-Za-zÁÉÍÓÚÑ]/g, "").slice(0,3).toUpperCase();
}

function seleccionarTestamento(testamento){
    document.querySelectorAll(".testamento").forEach(b => b.classList.toggle("activo", b.dataset.testamento === testamento));
    document.getElementById("clasificacionesBiblia").innerHTML = crearClasificaciones(testamento);
}

document.addEventListener("click", e => {
    const botonTestamento = e.target.closest(".testamento");
    if(botonTestamento) seleccionarTestamento(botonTestamento.dataset.testamento);
    const botonLibro = e.target.closest(".libro-card");
    if(botonLibro) mostrarCapitulosBiblia(botonLibro.dataset.libro);
});

function normalizarTextoBiblia(texto){
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function buscarLibroBibliaFlexible(nombre){
    const buscado = normalizarTextoBiblia(nombre);
    return obtenerLibros().find(libro => normalizarTextoBiblia(libro) === buscado) || null;
}

function interpretarBusquedaBiblia(referencia){
    if(!referencia) return null;
    const texto = referencia.trim().replace(/\s+/g, " ");
    const coincidencia = texto.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
    if(!coincidencia){
        const libroSolo = buscarLibroBibliaFlexible(texto);
        return libroSolo ? { libro: libroSolo, codigo: obtenerCodigoLibro(libroSolo) } : null;
    }
    const libro = buscarLibroBibliaFlexible(coincidencia[1]);
    if(!libro) return null;
    const capitulo = Number(coincidencia[2]);
    const versiculoInicio = coincidencia[3] ? Number(coincidencia[3]) : null;
    const versiculoFin = coincidencia[4] ? Number(coincidencia[4]) : versiculoInicio;
    return { libro, codigo: obtenerCodigoLibro(libro), capitulo, versiculoInicio, versiculoFin };
}

function ejecutarBusquedaBiblia(){
    const campo = document.getElementById("busquedaBiblia");
    const valor = campo ? campo.value.trim() : "";
    if(!valor) return;
    const referencia = interpretarBusquedaBiblia(valor);
    if(!referencia){
        alert("No pude encontrar esa referencia. Prueba con Juan, Juan 3 o Juan 3:16.");
        return;
    }
    if(!referencia.capitulo){
        mostrarCapitulosBiblia(referencia.libro);
        return;
    }
    leerCapituloBiblia(referencia.libro, referencia.capitulo, referencia.versiculoInicio, referencia.versiculoFin);
}

function mostrarCapitulosBiblia(libro, capituloInicial = null, versiculoInicio = null, versiculoFin = null){
    const codigo = obtenerCodigoLibro(libro);
    if(!codigo) return;
    const cantidad = obtenerCantidadCapitulos(codigo);
    const botones = Array.from({length:cantidad}, (_,i) => `<button class="capitulo-biblia" data-libro="${libro}" data-capitulo="${i+1}">${i+1}</button>`).join("");
    document.getElementById("bibliaContenido").innerHTML = `<div class="ruta-biblia"><button id="volverBiblia">← Libros</button><h2>${libro}</h2><p>Selecciona un capítulo</p></div><div class="capitulos-grid">${botones}</div>`;
    document.getElementById("volverBiblia").addEventListener("click", () => { document.getElementById("bibliaContenido").innerHTML = crearSelectorTestamentos(); });
    document.querySelectorAll(".capitulo-biblia").forEach(b => b.addEventListener("click", () => leerCapituloBiblia(b.dataset.libro, Number(b.dataset.capitulo))));
    if(capituloInicial) leerCapituloBiblia(libro, capituloInicial, versiculoInicio, versiculoFin);
}

function obtenerCantidadCapitulos(codigo){
    const cantidades = { GEN:50, EXO:40, LEV:27, NUM:36, DEU:34, JOS:24, JDG:21, RUT:4, "1SA":31, "2SA":24, "1KI":22, "2KI":25, "1CH":29, "2CH":36, EZR:10, NEH:13, EST:10, JOB:42, PSA:150, PRO:31, ECC:12, SNG:8, ISA:66, JER:52, LAM:5, EZK:48, DAN:12, HOS:14, JOL:3, AMO:9, OBA:1, JON:4, MIC:7, NAM:3, HAB:3, ZEP:3, HAG:2, ZEC:14, MAL:4, MAT:28, MRK:16, LUK:24, JHN:21, ACT:28, ROM:16, "1CO":16, "2CO":13, GAL:6, EPH:6, PHP:4, COL:4, "1TH":5, "2TH":3, "1TI":6, "2TI":4, TIT:3, PHM:1, HEB:13, JAS:5, "1PE":5, "2PE":3, "1JN":5, "2JN":1, "3JN":1, JUD:1, REV:22 };
    return cantidades[codigo] || 1;
}

async function leerCapituloBiblia(libro, capitulo, versiculoInicio = null, versiculoFin = null){
    const codigo = obtenerCodigoLibro(libro);
    const contenido = document.getElementById("bibliaContenido");
    contenido.innerHTML = `<div class="cargando-biblia">Cargando ${libro} ${capitulo}…</div>`;
    try{
        const biblia = obtenerBibliaSeleccionada();
        const datos = await obtenerCapituloBiblia(codigo, capitulo, biblia.id);
        contenido.innerHTML = crearLectorBiblia(datos, libro, capitulo, versiculoInicio, versiculoFin);
        activarControlesLector(libro, capitulo);
        if(versiculoInicio) solicitarEnfoqueVersiculo(versiculoInicio);
    }catch(error){
        contenido.innerHTML = `<div class="error-biblia"><h3>No se pudo cargar el capítulo</h3><p>${error.message}</p><button id="volverCapitulos">Volver a capítulos</button></div>`;
        document.getElementById("volverCapitulos").addEventListener("click", () => mostrarCapitulosBiblia(libro));
    }
}

function crearLectorBiblia(datos, libro, capitulo, versiculoInicio = null, versiculoFin = null){
    const todos = datos.versiculos || [];
    const versiculos = (versiculoInicio ? todos.filter(v => {
        const n = Number(v.numero);
        return n >= Number(versiculoInicio) && n <= Number(versiculoFin || versiculoInicio);
    }) : todos);
    const biblia = obtenerBibliaSeleccionada();
    const referencia = datos.referencia || `${libro} ${capitulo}`;
    const subtitulo = versiculoInicio ? `Versículo${versiculoFin && versiculoFin !== versiculoInicio ? "s" : ""} ${versiculoInicio}${versiculoFin && versiculoFin !== versiculoInicio ? "–" + versiculoFin : ""}` : (datos.titulo ? datos.titulo : "");
    return `<div class="lector-biblia"><div class="lector-barra"><button id="volverCapitulos">← ${libro}</button><div class="tamano-letra" aria-label="Tamaño de letra"><button data-size="small">A−</button><button data-size="normal" class="activo">A</button><button data-size="large">A+</button></div></div><div class="referencia-lectura"><h2>${referencia}</h2><p>${subtitulo || obtenerEtiquetaBiblia(biblia)}</p><small class="identificacion-traduccion">${biblia.idiomaNombre} · ${obtenerEtiquetaBiblia(biblia)} · ${biblia.titular}</small></div><article class="texto-biblia">${versiculos.map(v => `<p class="versiculo-biblia" id="versiculo-${v.numero}"><sup>${v.numero}</sup><span>${v.texto}</span></p>`).join("")}</article><div class="navegacion-capitulo"><button id="capAnterior" ${capitulo <= 1 ? "disabled" : ""}>← Anterior</button><button id="capSiguiente" ${capitulo >= obtenerCantidadCapitulos(obtenerCodigoLibro(libro)) ? "disabled" : ""}>Siguiente →</button></div></div>`;
}

function solicitarEnfoqueVersiculo(numero){
    requestAnimationFrame(() => {
        const elemento = document.getElementById(`versiculo-${numero}`);
        if(elemento) elemento.scrollIntoView({behavior:"smooth", block:"center"});
    });
}

function activarControlesLector(libro, capitulo){
    document.getElementById("volverCapitulos").addEventListener("click", () => mostrarCapitulosBiblia(libro));
    document.querySelectorAll(".tamano-letra button").forEach(b => b.addEventListener("click", () => {
        document.querySelectorAll(".tamano-letra button").forEach(x => x.classList.remove("activo"));
        b.classList.add("activo");
        document.querySelector(".texto-biblia").dataset.size = b.dataset.size;
    }));
    const anterior = document.getElementById("capAnterior");
    const siguiente = document.getElementById("capSiguiente");
    if(anterior && !anterior.disabled) anterior.addEventListener("click", () => leerCapituloBiblia(libro, capitulo - 1));
    if(siguiente && !siguiente.disabled) siguiente.addEventListener("click", () => leerCapituloBiblia(libro, capitulo + 1));
}
