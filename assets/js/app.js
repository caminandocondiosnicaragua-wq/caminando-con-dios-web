window.onload = iniciar;

async function iniciar(){

    console.clear();

    console.log("================================");
    console.log("CAMINANDO CON DIOS");
    console.log("Iniciando plataforma...");
    console.log("================================");

    try{

        const datos = await obtenerDevocional();

        console.log(datos);

    }

    catch(error){

        console.error(error);

    }

}
