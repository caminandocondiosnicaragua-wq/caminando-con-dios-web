/************************************************
 * Arranque del controlador dinámico de Biblia.
 *
 * biblia-app.js registra su propio iniciarBiblia antes
 * de que biblia-dinamica.js lo reemplace. Este listener
 * ejecuta la versión dinámica cuando el DOM está listo.
 ************************************************/
document.addEventListener("DOMContentLoaded", () => {
    if (typeof cargarLibrosBibliaDinamica_ === "function" && typeof iniciarBiblia === "function") {
        iniciarBiblia();
    }
});
