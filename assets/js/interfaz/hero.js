/************************************************
 * CAMINANDO CON DIOS
 * HERO
 ************************************************/

function crearHero(){
    return `
<section class="hero">
    <img
        src="assets/img/hero.png"
        class="hero-imagen"
        alt="${CONFIG.APP.nombre}">
    <div class="hero-overlay">
        <div class="hero-contenido">
            <h2>
                ${CONFIG.APP.nombre}
            </h2>
            <p>
                ${CONFIG.APP.subtitulo}
            </p>
        </div>
    </div>
</section>
`;
}


/************************************************
 * CAMBIAR HERO
 ************************************************/

function cambiarHero(imagen){
    const hero=document.querySelector(".hero-imagen");
    if(hero){
        hero.src=imagen;
    }
}
