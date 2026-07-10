/************************************************
 * CAMINANDO CON DIOS
 * FOOTER
 ************************************************/
function crearFooter(){
    return `
<footer class="footer">
    <div class="footer-contenedor">
                   <h3>
                    ${CONFIG.APP.nombre}
                </h3>
                <p>
                    ${CONFIG.APP.subtitulo}
                </p>
            </div>
        <div class="footer-enlaces">
            <h4>
                Navegación
            </h4>
            <a href="#">Inicio</a>
            <a href="#">Devocionales</a>
            <a href="#">Biblioteca</a>
            <a href="#">Estudios</a>
        </div>
              <div class="footer-redes">
                <button
                    class="btn-red-social"
                    id="btnYoutube">
                    ▶ YouTube
                </button>
                <button
                    class="btn-red-social"
                    id="btnFacebook">
                    📘 Facebook
                </button>
            </div>
    </div>

    <div class="footer-donacion">
        <p>
            💛 ¿Este devocional bendice tu vida?
            Considera apoyar este ministerio.
        </p>
        <a
            href="https://www.paypal.com/paypalme/CaminandoconDiosNic"
            target="_blank"
            rel="noopener"
            class="btn-donar">
            💝 Donar vía PayPal
        </a>
    </div>

    <div class="footer-copy">
        © ${new Date().getFullYear()} ${CONFIG.APP.nombre}
        | Versión ${CONFIG.APP.version}
    </div>
</footer>
`;
}
/************************************************
 * FOOTER
 ************************************************/
function iniciarFooter(){
    const youtube = document.getElementById("btnYoutube");
    if(youtube){
        youtube.addEventListener("click",()=>{
            abrirCanalYoutube();
        });
    }

    const facebook = document.getElementById("btnFacebook");
    if(facebook){
        facebook.addEventListener("click",()=>{
            abrirFacebook();
        });
    }
}
/************************************************
 * YOUTUBE
 ************************************************/
function abrirCanalYoutube(){
    window.open(
        "https://www.youtube.com/@caminandocondiosnicaragua8147",
        "_blank"
    );
}
/************************************************
 * FACEBOOK
 ************************************************/
function abrirFacebook(){
    window.open(
        "https://www.facebook.com/camiandoconDios",
        "_blank"
    );
}
