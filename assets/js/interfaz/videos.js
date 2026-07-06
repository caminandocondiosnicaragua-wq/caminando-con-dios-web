/************************************************
 * CAMINANDO CON DIOS
 * VIDEO DEL DÍA
 ************************************************/

function crearVideo(){

    return `

<section class="video-devocional">

    <div class="video-cabecera">

        <h2>

            🎥 Reflexión en Video

        </h2>

        <p>

            Complementa el devocional con esta enseñanza.

        </p>

    </div>

    <div class="video-contenedor">

        <iframe

            id="youtubeVideo"

            src=""

            title="Video del Día"

            allowfullscreen>

        </iframe>

    </div>

    <div class="video-botones">

        <button
            class="btn principal"
            id="btnVerYoutube">

            ▶ Ver en YouTube

        </button>

        <button
            class="btn secundario"
            id="btnCanal">

            📺 Nuestro Canal

        </button>

    </div>

</section>

`;

}
/************************************************
 * INICIAR VIDEO
 ************************************************/

function iniciarVideo(){

    const botonVideo=document.getElementById("btnVerYoutube");

    const botonCanal=document.getElementById("btnCanal");

    if(botonVideo){

        botonVideo.addEventListener("click",abrirVideoYoutube);

    }

    if(botonCanal){

        botonCanal.addEventListener("click",abrirCanalYoutube);

    }

}
/************************************************
 * ABRIR VIDEO
 ************************************************/

function abrirVideoYoutube(){

    if(!CONFIG.YOUTUBE.video){

        return;

    }

    window.open(

        CONFIG.YOUTUBE.video,

        "_blank"

    );

}
/************************************************
 * ABRIR CANAL
 ************************************************/

function abrirCanalYoutube(){

    if(!CONFIG.YOUTUBE.canal){

        return;

    }

    window.open(

        CONFIG.YOUTUBE.canal,

        "_blank"

    );

}
/************************************************
 * CARGAR VIDEO
 ************************************************/

function cargarVideo(videoID){

    const iframe=document.getElementById("youtubeVideo");

    if(!iframe) return;

    iframe.src=

`https://www.youtube.com/embed/${videoID}`;

}
