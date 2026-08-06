/************************************************
 * CAMINANDO CON DIOS
 * BIBLIOTECA
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarBiblioteca);

function iniciarBiblioteca(){

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
    iniciarFooter();

}

/************************************************
 * CONTENIDO BIBLIOTECA
 ************************************************/

function crearBiblioteca(){

    return `

<section class="biblioteca">

    <h2>📚 Biblioteca Bíblica</h2>

    <p>
        Explora la Biblia por categorías.
    </p>

</section>

`;

}
