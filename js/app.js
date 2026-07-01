window.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    try {

        const devocionales = await obtenerDevocionales();

        if (devocionales.length === 0) return;

        mostrarDevocional(devocionales[0]);

    } catch (error) {

        console.error(error);

    }

}

function mostrarDevocional(devocional) {

    asignarTexto("heroTitulo", devocional.TITULO);
    asignarTexto("heroFecha", devocional.FECHA);
    asignarTexto("heroAT", devocional["TEXTO A.T."]);
    asignarTexto("heroNT", devocional["TEXTO N.T."]);

    asignarTexto("ensenanza", devocional.ENSEÑANZA);
    asignarTexto("idea", devocional["IDEA CENTRAL"]);
    asignarTexto("explicacion", devocional.EXPLICACION);
    asignarTexto("reflexion", devocional.REFLEXION);
    asignarTexto("preguntas", devocional.PREGUNTAS);
    asignarTexto("oracion", devocional.ORACION);
    asignarTexto("palabra", devocional["PALABRA DE VIDA"]);

    const imagen = document.getElementById("heroImagen");

    if (devocional.IMAGEN) {
        imagen.src = devocional.IMAGEN;
    }

}

function asignarTexto(id, valor) {

    const elemento = document.getElementById(id);

    if (elemento) {

        elemento.textContent = valor || "";

    }

}
