const API_URL =
"https://script.google.com/macros/s/AKfycbxpCZ00WGFhINXrmOEs2NmVWOXIw_-_mmO0Da_XGfrWzLzuZyki2kzercmR14I7HlkNAw/exec";

/************************************************
 * Obtiene el devocional del día
 ***********************************************/
async function obtenerDevocional() {

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error("No fue posible conectar con la API.");
    }

    return await respuesta.json();

}
