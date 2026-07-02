window.onload = iniciar;

async function iniciar() {

    try {

        const datos = await obtenerDevocional();

        const devocional = datos[0];

        mostrarDevocional(devocional);

        document.getElementById("loader").style.display = "none";

        document.getElementById("app").style.display = "block";

    }

    catch (error) {

        console.error(error);

    }

}
