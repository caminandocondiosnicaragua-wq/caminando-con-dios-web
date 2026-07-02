window.onload = iniciar;

async function iniciar() {

    try {

        const datos = await obtenerDevocional();

        if (!Array.isArray(datos) || datos.length === 0) {
            throw new Error("La API no devolvió datos.");
        }

        // Fecha actual
        const hoy = new Date();

        const fechaHoy =
            hoy.getFullYear() + "-" +
            String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoy.getDate()).padStart(2, "0");

        // Buscar el devocional del día
        let devocional = datos.find(
            d => d.FECHA === fechaHoy
        );

        // Si aún no existe, mostrar el primero
        if (!devocional) {
            devocional = datos[0];
        }

        mostrarDevocional(devocional);

        document.getElementById("loader").style.display = "none";
        document.getElementById("app").style.display = "block";

    }

    catch (error) {

        console.error(error);

        document.getElementById("loader").innerHTML =
            "<h2>Error al cargar el devocional.</h2>";

    }

}
