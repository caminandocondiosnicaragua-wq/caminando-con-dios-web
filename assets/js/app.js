window.onload = iniciar;

async function iniciar() {

    try {

        const datos = await obtenerDevocional();

       // Obtener la fecha de hoy
        const hoy = new Date();

    // Formato YYYY-MM-DD
        const fechaHoy = hoy.toISOString().split("T")[0];

    // Buscar el devocional correspondiente a la fecha
        const devocional = datos.find(item => item.FECHA === fechaHoy);

    // Si no existe, mostrar el primero como respaldo
        const devocionalFinal = devocional || datos[0];

        mostrarDevocional(devocionalFinal);

        document.getElementById("loader").style.display = "none";

        document.getElementById("app").style.display = "block";

    }

    catch (error) {

        console.error(error);

    }

}
