/************************************************
 * CAMINANDO CON DIOS
 * COMENTARIOS
 ************************************************/


/************************************************
 * CREAR SECCIÓN DE COMENTARIOS
 ************************************************/

function crearComentarios(){

    return `

<section class="comentarios">

    <div class="comentarios-cabecera">

        <h2>

            💬 Comentarios

        </h2>

        <p>

            Comparte lo que Dios habló a tu vida mediante este devocional.

        </p>

    </div>

    <div class="comentario-formulario">

        <input
            type="text"
            id="txtNombre"
            placeholder="Tu nombre">

        <textarea
            id="txtComentario"
            rows="5"
            placeholder="Escribe aquí tu comentario..."></textarea>

        <button
            class="btn principal"
            id="btnPublicar">

            Publicar comentario

        </button>

    </div>

    <div
        id="listaComentarios"
        class="lista-comentarios">

    </div>

</section>

`;

}
/************************************************
 * INICIAR COMENTARIOS
 ************************************************/

function iniciarComentarios(){

    const boton = document.getElementById("btnPublicar");

    if(!boton) return;

    boton.addEventListener(

        "click",

        publicarComentario

    );

}
/************************************************
 * PUBLICAR
 ************************************************/
async function publicarComentario(){

    const nombre =

        document.getElementById(

            "txtNombre"

        ).value.trim();

    const comentario =

        document.getElementById(

            "txtComentario"

        ).value.trim();

    if(nombre===""){

        alert(

            "Ingrese su nombre."

        );

        return;

    }

    if(comentario===""){

        alert(

            "Escriba un comentario."

        );

        return;

    }

    console.log(devocionalActual);
    console.log(devocionalActual["ID NOTION"]);
    
    const datos={

        nombre:nombre,

        comentario:comentario,

        fecha:devocionalActual.FECHA,

        idDevocional:

            devocionalActual["ID NOTION"]

    };
try{

    // IMPORTANTE (CORS):
    // Se usa "text/plain" en lugar de "application/json" para que el
    // navegador NO envíe una petición "preflight" OPTIONS. Google Apps
    // Script no responde correctamente al preflight (no incluye el
    // header Access-Control-Allow-Origin), por lo que "application/json"
    // provocaba el bloqueo por política CORS. Con "text/plain" la
    // petición se considera "simple" y se envía directamente como POST.
    // El body sigue siendo JSON (Apps Script lo lee con JSON.parse).
    const respuesta = await fetch(API_URL,{

        method:"POST",

        headers:{

            "Content-Type":"text/plain;charset=utf-8"

        },

        body:JSON.stringify(datos)

    });

    const resultado =

        await respuesta.json();

    if(resultado.ok){

        limpiarFormularioComentario();

        alert(

            "Gracias por compartir tu comentario.\n\n" +

            "Será revisado antes de publicarse."

        );

    }

    else{

        alert(

            resultado.mensaje

        );

    }

}

catch(error){

    console.error(error);

    alert(

        "No fue posible enviar el comentario."

        );
    }
}
/************************************************
 * MOSTRAR COMENTARIOS
 ************************************************/

function mostrarComentarios(lista){

    const contenedor = document.getElementById("listaComentarios");

    if(!contenedor) return;

    contenedor.innerHTML="";

    if(lista.length===0){

        contenedor.innerHTML=`

            <p class="sin-comentarios">

                Aún no hay comentarios.

                Sé el primero en compartir
                cómo Dios habló a tu vida.

            </p>

        `;

        return;

    }

    lista.forEach(item=>{

        contenedor.innerHTML+=`

            <article class="comentario">

                <div class="comentario-nombre">

                    ${item.nombre}

                </div>

                <div class="comentario-fecha">

                    ${formatearFecha(item.fecha)}

                </div>

                <div class="comentario-texto">

                    ${item.comentario}

                </div>

            </article>

        `;

    });

}
/************************************************
 * LIMPIAR FORMULARIO
 ************************************************/

function limpiarFormularioComentario(){

    document.getElementById("txtNombre").value="";

    document.getElementById("txtComentario").value="";

}
/************************************************
 * CARGAR COMENTARIOS
 ************************************************/

async function cargarComentarios(){

    console.log(

        "Comentarios preparados para Notion."

    );

}
