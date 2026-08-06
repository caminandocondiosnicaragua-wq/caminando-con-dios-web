/************************************************
 * CAMINANDO CON DIOS
 * LAYOUT GENERAL
 ************************************************/

function crearLayout(contenido) {

    return `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">

            ${contenido}

        </div>

        ${crearFooter()}

    `;

}
