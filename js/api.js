const API_URL = "https://script.google.com/macros/s/AKfycbxpCZ00WGFhINXrmOEs2NmVWOXIw_-_mmO0Da_XGfrWzLzuZyki2kzercmR14I7HlkNAw/exec";

async function obtenerDevocionales() {

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error("No fue posible obtener los datos.");
    }

    return await respuesta.json();

}
