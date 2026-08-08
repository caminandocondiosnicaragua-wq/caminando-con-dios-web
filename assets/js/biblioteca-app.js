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
 * CATEGORÍAS DE LA BIBLIOTECA
 ************************************************/

const CATEGORIAS_BIBLIOTECA = [

    {
        titulo: "📖 Libros y Literatura",
        tarjetas: [
            "Libros de la Biblia",
            "Poesía y Sabiduría"
        ]
    },

    {
        titulo: "🏛 Historia y Contexto",
        tarjetas: [
            "Historia Bíblica",
            "Geografía Bíblica",
            "Línea de Tiempo"
        ]
    },

    {
        titulo: "✝ Enseñanza",
        tarjetas: [
            "Enseñanza de Jesús",
            "Enseñanza de los Apóstoles",
            "Escatología"
        ]
    },

    {
        titulo: "👤 Personajes Bíblicos",
        tarjetas: [
            "Personajes Bíblicos",
            "Patriarcas",
            "Jueces",
            "Reyes",
            "Profetas",
            "Mujeres de la Biblia",
            "Genealogías Bíblicas"
        ]
    },

    {
        titulo: "🧰 Recursos",
        tarjetas: [
            "Monedas, Pesas y Medidas"
        ]
    }

];
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
    <div id="contenedorCategorias">

        ${crearCategorias()}

    </div>
</section>

`;

}

/************************************************
 * CREAR CATEGORÍAS
 ************************************************/

function crearCategorias(){

    let html = "";

    CATEGORIAS_BIBLIOTECA.forEach(categoria => {

        html += `
            <section class="categoria-biblioteca">

                <h2>${categoria.titulo}</h2>

                <div class="grid-tarjetas">
        `;

       categoria.tarjetas.forEach(tarjeta => {
    html += `
        <div class="tarjeta-biblioteca">
            <div class="tarjeta-icono">
                📚
            </div>
            <div class="tarjeta-titulo">
                ${tarjeta}
            </div>
        </div>
    `;
});

        html += `
                </div>

            </section>
        `;

    });

    return html;

}
