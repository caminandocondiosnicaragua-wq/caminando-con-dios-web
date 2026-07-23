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
    const ANTIGUO = [
        "GEN","EXO","LEV","NUM","DEU",
        "JOS","JDG","RUT",
        "1SA","2SA","1KI","2KI",
        "1CH","2CH",
        "EZR","NEH","EST",
        "JOB","PSA","PRO","ECC","SNG",
        "ISA","JER","LAM","EZK","DAN",
        "HOS","JOL","AMO","OBA","JON",
        "MIC","NAM","HAB","ZEP",
        "HAG","ZEC","MAL"
    ];
    const antiguo = [];
    const nuevo = [];
    lista.forEach(function(item){
        if(ANTIGUO.includes(item.codigo)){
            antiguo.push(item);
        }else{
            nuevo.push(item);
        }
    });
    contenedor.innerHTML = `
        <div class="grupo-lectura">
            <h3>📜 Antiguo Testamento</h3>
            <div id="listaAT"></div>
        </div>
        <div class="grupo-lectura">
            <h3>✝ Nuevo Testamento</h3>
            <div id="listaNT"></div>
        </div>
    `;
    crearTarjetas("listaAT", antiguo);
    crearTarjetas("listaNT", nuevo);

}/************************************************
 * CREAR TARJETAS
 ************************************************/
function crearTarjetas(idContenedor, lista){
    const contenedor = document.getElementById(idContenedor);
    if(!contenedor) return;
    lista.forEach(function(item){
        const tarjeta = document.createElement("button");
        tarjeta.className = "tarjeta-capitulo";
        tarjeta.dataset.libro = item.codigo;
        tarjeta.dataset.capitulo = item.capitulo;
        tarjeta.innerHTML = `
            <span>
                📖 ${item.libro} ${item.capitulo}
            </span>
            <span>
                ➜
            </span>
        `;
        tarjeta.addEventListener("click", async function(){
            try{
                const datos = await obtenerCapituloBiblia(
                item.codigo,
                item.capitulo
            );
            const html = crearHTMLCapitulo(datos);
            mostrarTextoBiblico(html);
            }
            catch(error){
                console.error(error);
            }
        });
        contenedor.appendChild(tarjeta);
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
/************************************************
 * CREAR HTML DEL CAPÍTULO
 ************************************************/
function crearHTMLCapitulo(capitulo){
    let html = `
        <h2>${capitulo.referencia}</h2>
    `;
    if(capitulo.titulo){
        html += `
            <h3>${capitulo.titulo}</h3>
        `;
    }
    capitulo.versiculos.forEach(function(versiculo){
        html += `
            <p class="versiculo">
                <strong>${versiculo.numero}</strong>
                ${versiculo.texto}
            </p>
        `;
    });
    return html;
}
