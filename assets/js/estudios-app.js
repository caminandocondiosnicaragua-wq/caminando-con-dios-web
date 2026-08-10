/************************************************
 * CAMINANDO CON DIOS
 * ESTUDIOS BÍBLICOS
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarEstudios);

/************************************************
 * DOCTRINAS PRINCIPALES
 *
 * Cada doctrina es una tarjeta independiente.
 * Cuando un estudio esté desarrollado,
 * se podrá agregar su enlace aquí.
 ************************************************/

const DOCTRINAS_ESTUDIOS = [

    {
        icono: "📖",
        titulo: "Bibliología",
        subtitulo: "Doctrina de la Biblia",
        descripcion: "Estudia la naturaleza, inspiración, autoridad, suficiencia y propósito de las Sagradas Escrituras."
    },

    {
        icono: "👑",
        titulo: "Teología Propia",
        subtitulo: "Doctrina de Dios",
        descripcion: "Estudia quién es Dios, Sus atributos, Su carácter, Sus obras y Su relación con Su creación."
    },

    {
        icono: "👤",
        titulo: "Antropología Bíblica",
        subtitulo: "Doctrina del ser humano",
        descripcion: "Estudia la creación del ser humano, su naturaleza, dignidad, propósito y condición delante de Dios."
    },

    {
        icono: "⚠️",
        titulo: "Hamartiología",
        subtitulo: "Doctrina del pecado",
        descripcion: "Estudia el origen, naturaleza, alcance y consecuencias del pecado y la condición humana delante de Dios."
    },

    {
        icono: "✝️",
        titulo: "Cristología",
        subtitulo: "Doctrina de Cristo",
        descripcion: "Estudia la persona y obra de Jesucristo: Su divinidad, humanidad, muerte, resurrección y señorío."
    },

    {
        icono: "🕊️",
        titulo: "Neumatología",
        subtitulo: "Doctrina del Espíritu Santo",
        descripcion: "Estudia la persona y obra del Espíritu Santo y Su obra en la vida del creyente y de la Iglesia."
    },

    {
        icono: "🩸",
        titulo: "Soteriología",
        subtitulo: "Doctrina de la salvación",
        descripcion: "Estudia la salvación y sus fundamentos: gracia, fe, arrepentimiento, justificación, santificación y glorificación."
    },

    {
        icono: "👥",
        titulo: "Eclesiología",
        subtitulo: "Doctrina de la Iglesia",
        descripcion: "Estudia la naturaleza, propósito, misión, organización y función de la Iglesia según las Escrituras."
    },

    {
        icono: "👼",
        titulo: "Angelología",
        subtitulo: "Doctrina de los ángeles",
        descripcion: "Estudia lo que las Escrituras enseñan acerca de los ángeles y los seres espirituales."
    },

    {
        icono: "🌅",
        titulo: "Escatología",
        subtitulo: "Doctrina de las últimas cosas",
        descripcion: "Estudia las enseñanzas bíblicas sobre el futuro, la esperanza cristiana y el cumplimiento final del plan de Dios."
    }

];

/************************************************
 * INICIAR ESTUDIOS
 ************************************************/

function iniciarEstudios(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">
            ${crearPaginaEstudios()}
        </div>

        ${crearFooter()}

    `;

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

}

/************************************************
 * CREAR PÁGINA
 ************************************************/

function crearPaginaEstudios(){

    return `

<section class="estudios-pagina">

    <div class="estudios-cabecera">

        <h1>📚 Estudios Bíblicos</h1>

        <p>
            Un espacio para conocer y profundizar en las principales
            doctrinas de la fe cristiana a la luz de las Escrituras.
        </p>

        <p class="estudios-aviso">
            Aquí iremos desarrollando los fundamentos de la teología
            cristiana, estudiando cada doctrina desde su fundamento bíblico,
            su contexto y sus implicaciones para nuestra vida.
        </p>

    </div>

    <div class="grid-estudios">
        ${crearTarjetasEstudios()}
    </div>

    <div class="estudios-pendiente">

        <div class="pendiente-icono">🔨</div>

        <h2>Estamos trabajando en esta sección</h2>

        <p>
            Cada estudio será desarrollado progresivamente para ofrecer
            contenido bíblico, ordenado y útil para el crecimiento espiritual.
        </p>

        <strong>Permanece pendiente. Pronto encontrarás nuevos estudios.</strong>

    </div>

</section>

`;

}

/************************************************
 * CREAR TARJETAS
 ************************************************/

function crearTarjetasEstudios(){

    return DOCTRINAS_ESTUDIOS.map(doctrina => `

        <article class="tarjeta-estudio">

            <div class="tarjeta-estudio-icono">
                ${doctrina.icono}
            </div>

            <h2>${doctrina.titulo}</h2>

            <h3>${doctrina.subtitulo}</h3>

            <p>
                ${doctrina.descripcion}
            </p>

            <span class="estado-estudio">
                Próximamente
            </span>

        </article>

    `).join("");

}
