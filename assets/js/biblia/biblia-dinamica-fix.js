/************************************************
 * CAMINANDO CON DIOS
 * PROTECCIÓN DE EVENTOS Y RENDERIZADO DE LA BIBLIA
 ************************************************/

function escaparTextoBibliaDinamica_(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function crearLectorBibliaDinamico_(datos, libro, capituloNumero, versiculoInicio = null, versiculoFin = null) {
    const todos = Array.isArray(datos && datos.versiculos) ? datos.versiculos : [];
    const versiculos = versiculoInicio
        ? todos.filter(v => {
            const numero = Number(v.numero);
            return numero >= Number(versiculoInicio) && numero <= Number(versiculoFin || versiculoInicio);
        })
        : todos;

    const biblia = obtenerBibliaSeleccionada();
    const referencia = datos.referencia || `${libro.nombre} ${capituloNumero}`;
    const subtitulo = versiculoInicio
        ? `Versículo${versiculoFin && versiculoFin !== versiculoInicio ? "s" : ""} ${versiculoInicio}${versiculoFin && versiculoFin !== versiculoInicio ? "–" + versiculoFin : ""}`
        : (datos.titulo || "");

    const indice = BIBLIA_DINAMICA_ESTADO.capitulosActuales.findIndex(c => c.numero === Number(capituloNumero));
    const anterior = indice > 0 ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice - 1] : null;
    const siguiente = indice >= 0 && indice < BIBLIA_DINAMICA_ESTADO.capitulosActuales.length - 1
        ? BIBLIA_DINAMICA_ESTADO.capitulosActuales[indice + 1]
        : null;

    const textoVersiculos = versiculos.map(v => {
        const numero = Number(v.numero);
        const texto = escaparTextoBibliaDinamica_(v.texto);
        return `<p class="versiculo-biblia" id="versiculo-${numero}"><sup>${numero}</sup><span>${texto}</span></p>`;
    }).join("");

    return `<div class="lector-biblia"><div class="lector-barra"><button id="volverCapitulos">← ${escaparTextoBibliaDinamica_(libro.nombre)}</button><div class="tamano-letra" aria-label="Tamaño de letra"><button data-size="small">A−</button><button data-size="normal" class="activo">A</button><button data-size="large">A+</button></div></div><div class="referencia-lectura"><h2>${escaparTextoBibliaDinamica_(referencia)}</h2><p>${escaparTextoBibliaDinamica_(subtitulo || obtenerEtiquetaBiblia(biblia))}</p><small class="identificacion-traduccion">${escaparTextoBibliaDinamica_(biblia.idiomaNombre)} · ${escaparTextoBibliaDinamica_(obtenerEtiquetaBiblia(biblia))} · ${escaparTextoBibliaDinamica_(biblia.titular)}</small></div><article class="texto-biblia">${textoVersiculos}</article><div class="navegacion-capitulo"><button id="capAnterior" ${anterior ? "" : "disabled"}>← ${textoInterfazBiblia_("anterior")}</button><button id="capSiguiente" ${siguiente ? "" : "disabled"}>${textoInterfazBiblia_("siguiente")}</button></div></div>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.getElementById("bibliaContenido");
    if (!contenido) return;

    contenido.addEventListener("click", evento => {
        const boton = evento.target instanceof Element ? evento.target.closest("button") : null;
        if (!boton || !contenido.contains(boton)) return;

        const botonTestamento = boton.closest(".testamento");
        if (botonTestamento) {
            evento.preventDefault();
            evento.stopPropagation();
            seleccionarTestamentoDinamico_(botonTestamento.dataset.testamento);
            return;
        }

        const botonLibro = boton.closest(".libro-card");
        if (botonLibro && botonLibro.dataset.libroId) {
            evento.preventDefault();
            evento.stopPropagation();
            mostrarCapitulosBibliaDinamica_(botonLibro.dataset.libroId);
            return;
        }

        const botonCapitulo = boton.closest(".capitulo-biblia");
        if (botonCapitulo && botonCapitulo.dataset.capituloId) {
            evento.preventDefault();
            evento.stopPropagation();
            leerCapituloBibliaDinamica_(botonCapitulo.dataset.libroId, botonCapitulo.dataset.capituloId, Number(botonCapitulo.dataset.capitulo));
        }
    });
});
