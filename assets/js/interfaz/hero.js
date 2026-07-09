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
