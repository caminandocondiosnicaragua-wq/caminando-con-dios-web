/************************************************
 * CAMINANDO CON DIOS
 * MODO LECTURA BÍBLICA
 ************************************************/

let lecturaActiva = false;

let scrollAnterior = 0;


/************************************************
 * ABRIR MODO LECTURA
 ************************************************/

function abrirModoLectura(){

    scrollAnterior = window.scrollY;

    lecturaActiva = true;

    const devocional = document.querySelector(".devocional");

    if(!devocional) return;

    devocional.style.display="none";

    mostrarPantallaLectura();

}
/************************************************
 * PANTALLA DE LECTURA
 ************************************************/

function mostrarPantallaLectura(){

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

function mostrarCapitulos(lista){

    const contenedor=document.getElementById("listaCapitulos");

    if(!contenedor) return;

    contenedor.innerHTML="";

    lista.forEach(capitulo=>{

        contenedor.innerHTML+=`

            <button
                class="btn-capitulo">

                ${capitulo}

            </button>

        `;

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
