/************************************************
 * CAMINANDO CON DIOS
 * BIBLIOTECA
 ************************************************/

function iniciarBiblioteca() {

    const app = document.getElementById("app");

    app.innerHTML = `
        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">

            ${crearBiblioteca()}

        </div>

        ${crearFooter()}
    `;

    iniciarHeader();

}
/************************************************
 * CREAR BIBLIOTECA
 ************************************************/

function crearBiblioteca() {

    return `

<section class="biblioteca">

    <h2>📚 Biblioteca Bíblica</h2>

    <p>

        Explora las Escrituras por categorías y profundiza en el conocimiento de la Palabra de Dios.

    </p>

</section>

`;

}
/************************************************
 * INICIAR
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarBiblioteca);
