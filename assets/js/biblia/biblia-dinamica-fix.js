/************************************************
 * CAMINANDO CON DIOS
 * PROTECCIÓN DE EVENTOS DE LA BIBLIA
 *
 * Este archivo evita que otros listeners globales interfieran
 * con la navegación de la Biblia dinámica.
 ************************************************/

document.addEventListener("DOMContentLoaded", () => {
    const contenido = document.getElementById("bibliaContenido");
    if (!contenido) return;

    contenido.addEventListener("click", evento => {
        const boton = evento.target instanceof Element
            ? evento.target.closest("button")
            : null;

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
            leerCapituloBibliaDinamica_(
                botonCapitulo.dataset.libroId,
                botonCapitulo.dataset.capituloId,
                Number(botonCapitulo.dataset.capitulo)
            );
        }
    });
});
