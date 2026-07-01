window.onload = iniciar;

async function iniciar(){

    try{

        const datos = await obtenerDevocional();

        // Por ahora mostramos el primer devocional.
        // Después lo cambiaremos para detectar automáticamente la fecha.

        const devocional = datos[0];

        mostrarDevocional(devocional);

        document.getElementById("loader").style.display="none";

        document.getElementById("app").style.display="block";

    }

    catch(error){

        console.error(error);

    }

}
