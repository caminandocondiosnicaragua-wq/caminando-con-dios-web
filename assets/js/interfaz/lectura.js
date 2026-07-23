/************************************************
 * CAMINANDO CON DIOS
 * MODO LECTURA BÍBLICA
 ************************************************/

let lecturaActiva = false;

let scrollAnterior = 0;

/************************************************
 * ESTADO DEL LECTOR BÍBLICO
 ************************************************/

let lecturaActual = {

    lecturas: [],

    indiceLectura: 0,

    libro: "",

    capitulos: [],

    indiceCapitulo: 0

};
/************************************************
 * ABRIR MODO LECTURA
 ************************************************/

function abrirModoLectura(){

    // Evitar abrir varias veces el lector
    if(document.getElementById("modoLectura")){
        return;
    }

    scrollAnterior = window.scrollY;

    lecturaActiva = true;

    // Obtener todas las lecturas del día
    lecturaActual.lecturas = obtenerCapitulosDelDia(devocionalActual);

    lecturaActual.indiceLectura = 0;

    const devocional = document.querySelector(".devocional");

    if(!devocional) return;

    devocional.style.display="none";

    mostrarPantallaLectura();

}
/************************************************
 * PANTALLA DE LECTURA
 ************************************************/

function mostrarPantallaLectura(){
   
    if(document.getElementById("modoLectura")){
    return;
}
    const app = document.getElementById("app");

    const pantalla = document.createElement("section");

    pantalla.id="modoLectura";

    pantalla.className="modo-lectura";

    pantalla.innerHTML=`

        <div class="lectura-contenedor">

            <button
                id="btnVolverDevocional"
                class="btn secundario">

                ← Volver al Devocional

            </button>

            <h2>

                📖 Lectura Bíblica

            </h2>

            <p>

                Antes de continuar con el devocional,
                dedica unos minutos a leer la Palabra de Dios.

            </p>

            <br>

            <p>

                Seleccione el capítulo que desea leer.

            </p>

            <div id="listaCapitulos">

            </div>

            <div id="textoBiblico">

            </div>

        </div>

    `;

  app.appendChild(pantalla);

// Mostrar los capítulos del día
mostrarCapitulos(lecturaActual.lecturas);

iniciarModoLectura();

}
/************************************************
 * EVENTOS
 ************************************************/

function iniciarModoLectura(){

    const boton=document.getElementById("btnVolverDevocional");

    if(!boton) return;

    boton.addEventListener("click",cerrarModoLectura);

}
/************************************************
 * CERRAR MODO LECTURA
 ************************************************/

function cerrarModoLectura(){

    lecturaActiva=false;

    const pantalla=document.getElementById("modoLectura");

    if(pantalla){

        pantalla.remove();

    }

    const devocional=document.querySelector(".devocional");

    if(devocional){

        devocional.style.display="block";

    }

    window.scrollTo({

        top:scrollAnterior,

        behavior:"smooth"

    });

}
/************************************************
 * LISTA DE CAPÍTULOS
 ************************************************/

/************************************************
 * LISTA DE CAPÍTULOS
 ************************************************/

function mostrarCapitulos(lista){

    const contenedor = document.getElementById("listaCapitulos");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    lista.forEach(function(item){

        contenedor.innerHTML += `

            <button
                class="btn-capitulo"
                data-libro="${item.codigo}"
                data-capitulo="${item.capitulo}">

                ${item.libro} ${item.capitulo}
            </button>
        `;
    });
    const botones = contenedor.querySelectorAll(".btn-capitulo");
    botones.forEach(function(boton){
        boton.addEventListener("click", async function(){
            const libro = boton.dataset.libro;
            const capitulo = Number(
                boton.dataset.capitulo
            );
            try{
    const datos = await obtenerCapituloBiblia(
        libro,
        capitulo
    );
    console.log(datos);
}
catch(error){
    console.error(error);
    alert(
        "No fue posible cargar el capítulo."
    );
}
            // Próximo paso:
            // obtenerCapituloBiblia(libro, capitulo);
        });
    });
}
/************************************************
 * MOSTRAR CAPÍTULO
 ************************************************/

function mostrarTextoBiblico(html){

    const texto=document.getElementById("textoBiblico");

    if(!texto) return;

    texto.innerHTML=html;

}
