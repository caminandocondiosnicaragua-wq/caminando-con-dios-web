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
        alt="Caminando con Dios">
    <div class="hero-overlay">

        <div class="hero-contenido">
            <h1>
                ${CONFIG.APP.nombre}
            </h1>
            <h2>
                ${CONFIG.APP.subtitulo}
            </h2>

            <p class="hero-versiculo">
                "Confía en Jehová con todo tu corazón,
                y no te apoyes en tu propia prudencia."
            </p>
            <span>
                Proverbios 3:5-6
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
