window.onload = iniciar;

async function iniciar() {

    try {

        const datos = await obtenerDevocional();

        console.log("Datos recibidos:");
        console.log(datos);
        console.log("¿Es un arreglo?:", Array.isArray(datos));

        const devocional = datos[0];

        console.log("Primer devocional:");
        console.log(devocional);

        mostrarDevocional(devocional);

        document.getElementById("loader").style.display = "none";
        document.getElementById("app").style.display = "block";

    }

    catch (error) {

        console.error(error);

    }

}
