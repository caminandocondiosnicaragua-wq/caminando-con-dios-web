/************************************************
 * CAMINANDO CON DIOS
 * NAVEGACIÓN DEL DEVOCIONAL
 ************************************************/


/************************************************
 * BOTONES
 ************************************************/
function crearAcciones(devocional){

    return `

<section class="acciones">

    <button
        class="btn lectura"
        id="btnLectura">
        📖 Comenzar lectura bíblica
    </button>

</section>

`;
}

/************************************************
 * ACTIVAR NAVEGACIÓN
 ************************************************/

function iniciarNavegacion(){

    activarBotonAnterior();

    activarBotonSiguiente();

    activarCalendario();

    activarModoLectura();

}
/************************************************
 * DÍA ANTERIOR
 ************************************************/

function activarBotonAnterior(){
    const boton = document.getElementById("btnAnterior");
    if(!boton) return;
    boton.addEventListener("click",()=>{
        console.log("Abrir día anterior");
    });
}
/************************************************
 * DÍA SIGUIENTE
 ************************************************/

function activarBotonSiguiente(){
    const boton = document.getElementById("btnSiguiente");
    if(!boton) return;
    boton.addEventListener("click",()=>{
        console.log("Abrir día siguiente");
    });
}
/************************************************
 * CALENDARIO
 ************************************************/

function activarCalendario(){
    const boton = document.getElementById("btnCalendario");
    if(!boton) return;
    boton.addEventListener("click",()=>{
        console.log("Abrir calendario");
    });
}
/************************************************
 * MODO LECTURA
 ************************************************/
function activarModoLectura(){

    const boton = document.getElementById("btnLectura");

    if(!boton) return;

    boton.addEventListener("click", function(e){

        e.preventDefault();

        console.log("CLICK LECTURA");

        abrirModoLectura();

    });

}
