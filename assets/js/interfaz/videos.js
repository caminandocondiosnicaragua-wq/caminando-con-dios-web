/************************************************
 * CAMINANDO CON DIOS
 * VIDEO DEL DEVOCIONAL
 ************************************************/

/************************************************
 * CREAR VIDEO
 ************************************************/
function crearVideo(devocional){

    const videoID = devocional["ID VIDEO"] || "";

    if(!videoID){
        return "";
    }

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
            src="https://www.youtube.com/embed/${videoID}"
            title="Video del Día"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
function iniciarVideo(devocional){

    const videoID = devocional["ID VIDEO"] || "";

    const botonVideo =
        document.getElementById("btnVerYoutube");

    const botonCanal =
        document.getElementById("btnCanal");

    if(botonVideo){

        botonVideo.addEventListener("click",()=>{

            abrirVideoYoutube(videoID);

        });

    }

    if(botonCanal){

        botonCanal.addEventListener("click",abrirCanalYoutube);

    }

}

/************************************************
 * ABRIR VIDEO EN YOUTUBE
 ************************************************/
function abrirVideoYoutube(videoID){

    if(!videoID){

        return;

    }

    window.open(

        `https://www.youtube.com/watch?v=${videoID}`,

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