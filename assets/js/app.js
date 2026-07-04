window.onload = iniciar;

async function iniciar() {

    try {

        const datos = await obtenerDevocional();

       // Obtener la fecha de hoy
        const hoy = new Date();

    // Formato YYYY-MM-DD
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        const fechaHoy = `${año}-${mes}-${dia}`;

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
