/************************************************
 * CAMINANDO CON DIOS
 * HERO
 ************************************************/

function crearHero() {

    return `

<section class="hero">
    <img
        src="assets/img/hero.png"
        class="hero-imagen"
        alt="${CONFIG.APP.nombre}"
    <div class="hero-overlay">

        <div class="hero-contenido">
            <h1>
                ${CONFIG.APP.nombre}
            </h1>
            <h2>
                ${CONFIG.APP.subtitulo}
            </h2>

            <p class="hero-versiculo">
    "${CONFIG.APP.versiculo}"
</p>
<span class="hero-cita">
    ${CONFIG.APP.cita}
</span>

        </div>
    </div>
</section>

`;

}
/************************************************
 * CAMBIAR HERO
 ************************************************/

function cambiarHero(imagen){
    const hero = document.querySelector(".hero-imagen");
    if(hero){
        hero.src = imagen;
    }
}
