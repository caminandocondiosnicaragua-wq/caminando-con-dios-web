const API_URL="https://script.google.com/macros/s/AKfycbxpCZ00WGFhINXrmOEs2NmVWOXIw_-_mmO0Da_XGfrWzLzuZyki2kzercmR14I7HlkNAw/exec";

async function obtenerDevocionales(){

const respuesta=await fetch(API_URL);

return await respuesta.json();

}
