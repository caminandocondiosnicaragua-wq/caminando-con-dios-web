window.onload=iniciar;

async function iniciar(){

const datos=await obtenerDevocionales();

const hoy=datos[0];

document.getElementById("heroTitulo").textContent=hoy.TITULO;

document.getElementById("heroFecha").textContent=hoy.FECHA;

document.getElementById("heroAT").textContent=hoy["TEXTO A.T."];

document.getElementById("heroNT").textContent=hoy["TEXTO N.T."];

document.getElementById("ensenanza").textContent=hoy.ENSEÑANZA;

document.getElementById("idea").textContent=hoy["IDEA CENTRAL"];

document.getElementById("explicacion").textContent=hoy.EXPLICACION;

document.getElementById("reflexion").textContent=hoy.REFLEXION;

document.getElementById("preguntas").textContent=hoy.PREGUNTAS;

document.getElementById("oracion").textContent=hoy.ORACION;

document.getElementById("palabra").textContent=hoy["PALABRA DE VIDA"];

document.getElementById("heroImagen").src=hoy.IMAGEN;

}
