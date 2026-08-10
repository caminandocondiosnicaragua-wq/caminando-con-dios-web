/************************************************
 * CAMINANDO CON DIOS
 * DEVOCIONALES
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarDevocionales);

/************************************************
 * PLANES DE YOUVERSION
 *
 * Para agregar un nuevo plan en el futuro,
 * solo agrega un objeto a esta lista.
 ************************************************/

const PLANES_YOUVERSION = [

    {
        icono: "🌅",
        titulo: "Día a Día con Dios",
        descripcion: "Un plan de 7 días para acercarte cada día a Dios y fortalecer tu caminar con Él.",
        enlace: "https://www.bible.com/reading-plans/71833"
    },

    {
        icono: "❤️",
        titulo: "Sanando la identidad en Cristo",
        descripcion: "Un plan de 7 días para descubrir quién eres, sanar tu corazón y vivir tu verdadera identidad en Cristo.",
        enlace: "https://www.bible.com/reading-plans/74913"
    }

];

/************************************************
 * INICIAR DEVOCIONALES
 ************************************************/

function iniciarDevocionales(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">

            ${crearDevocionales()}

        </div>

        ${crearFooter()}

    `;

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

}

/************************************************
 * CREAR PÁGINA DE DEVOCIONALES
 ************************************************/

function crearDevocionales(){

    return `

<section class="devocionales-pagina">

    <div class="devocionales-cabecera">

        <h1>📖 Devocionales</h1>

        <p>
            Encuentra planes y devocionales que pueden ayudarte
            a acercarte más a Dios, profundizar en Su Palabra
            y fortalecer tu vida espiritual.
        </p>

        <p class="devocionales-aviso">
            Esta sección irá creciendo poco a poco con nuevos
            recursos seleccionados para acompañarte en tu caminar con Dios.
        </p>

    </div>

    <div class="grid-devocionales">

        ${crearTarjetasDevocionales()}

    </div>

    <div class="devocionales-pendiente">

        <div class="pendiente-icono">🔨</div>

        <h2>Estamos trabajando en esta sección</h2>

        <p>
            Pronto agregaremos nuevos planes y recursos de YouVersion
            para que puedas seguir creciendo en tu relación con Dios.
        </p>

        <strong>Permanece pendiente.</strong>

    </div>

</section>

`;

}

/************************************************
 * CREAR TARJETAS
 ************************************************/

function crearTarjetasDevocionales(){

    return PLANES_YOUVERSION.map(plan => `

        <article class="tarjeta-devocional">

            <div class="tarjeta-devocional-icono">
                ${plan.icono}
            </div>

            <h2>${plan.titulo}</h2>

            <p>
                ${plan.descripcion}
            </p>

            <a
                href="${plan.enlace}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-youversion">

                Ver en YouVersion →

            </a>

        </article>

    `).join("");

}
