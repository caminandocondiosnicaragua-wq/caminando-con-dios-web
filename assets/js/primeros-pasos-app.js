/************************************************
 * CAMINANDO CON DIOS
 * PRIMEROS PASOS DEL CREYENTE
 *
 * Esta primera versión prepara únicamente el
 * acceso al contenido. No conecta todavía con
 * Notion ni modifica el sistema de respuestas.
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarPrimerosPasos);

function iniciarPrimerosPasos(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">
            ${crearPaginaPrimerosPasos()}
        </div>

        ${crearFooter()}

    `;

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();
}

function crearPaginaPrimerosPasos(){

    return `

        <section class="comunidad-pagina">

            <div class="comunidad-cabecera">

                <h1>🌱 Los primeros pasos del creyente</h1>

                <p>
                    Un espacio de discipulado para comenzar a caminar en la fe,
                    conocer más de Dios y crecer en la vida cristiana.
                </p>

            </div>

            <div class="grid-comunidad">

                <article class="tarjeta-comunidad">

                    <div class="tarjeta-comunidad-icono">📖</div>

                    <h2>¡Salvo!</h2>

                    <p>
                        Primer estudio de discipulado. Aquí comenzaremos el
                        recorrido con el contenido preparado para el creyente
                        que inicia su caminar con Cristo.
                    </p>

                    <button
                        type="button"
                        class="btn-comunidad btn-pendiente"
                        disabled>
                        Preparando contenido
                    </button>

                </article>

            </div>

        </section>

    `;
}
