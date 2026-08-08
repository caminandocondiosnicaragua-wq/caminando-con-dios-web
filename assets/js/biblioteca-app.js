/************************************************
 * CAMINANDO CON DIOS
 * BIBLIOTECA
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarBiblioteca);

/************************************************
 * INICIAR BIBLIOTECA
 ************************************************/

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

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

}

/************************************************
 * CREAR BIBLIOTECA
 ************************************************/

function crearBiblioteca(){

    return `

<section class="biblioteca">

    <div class="biblioteca-cabecera">

        <h2>📚 Biblioteca Bíblica</h2>

        <p>
            Explora la Palabra de Dios por categorías
            o encuentra cualquier tema mediante el buscador.
        </p>

    </div>

    <div class="buscador-biblia">

        <input
            type="text"
            id="buscarBiblia"
            placeholder="🔍 Buscar personaje, lugar, doctrina o tema...">

    </div>

    <div class="sugerencias">

        <button>David</button>
        <button>Jerusalén</button>
        <button>Gracia</button>
        <button>Moisés</button>
        <button>Pascua</button>
        <button>Pablo</button>

    </div>

</section>

`;

}
