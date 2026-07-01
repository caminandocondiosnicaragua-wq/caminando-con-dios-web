function mostrarDevocional(devocional){

    const app = document.getElementById("app");

    app.innerHTML = `

    <div class="pagina">

        <header class="cabecera">

            <h1>Caminando con Dios</h1>

            <p class="lema">
                "Confía en Jehová con todo tu corazón..."<br>
                <strong>Proverbios 3:5-6</strong>
            </p>

        </header>

        <section class="tarjeta">

            <div class="fecha">

                📅 ${formatearFecha(devocional.FECHA)}

            </div>

            <h2 class="titulo">

                ${devocional.TITULO || "Devocional Diario"}

            </h2>

            <div class="lecturas">

                <div>

                    <strong>Antiguo Testamento</strong><br>

                    ${devocional["TEXTO A.T."]}

                </div>

                <div>

                    <strong>Nuevo Testamento</strong><br>

                    ${devocional["TEXTO N.T."]}

                </div>

            </div>

            <section>

                <h3>Enseñanza</h3>

                <p>${devocional.ENSEÑANZA}</p>

            </section>

            <section>

                <h3>Idea Central</h3>

                <p>${devocional["IDEA CENTRAL"]}</p>

            </section>

            <section>

                <h3>Explicación</h3>

                <p>${devocional.EXPLICACION}</p>

            </section>

            <section>

                <h3>Reflexión</h3>

                <p>${devocional.REFLEXION}</p>

            </section>

            <section>

                <h3>Preguntas</h3>

                <p>${devocional.PREGUNTAS}</p>

            </section>

            <section>

                <h3>Oración</h3>

                <p>${devocional.ORACION}</p>

            </section>

            <section>

                <h3>Palabra de Vida</h3>

                <blockquote>

                    ${devocional["PALABRA DE VIDA"]}

                </blockquote>

            </section>

        </section>

    </div>

    `;

}

function formatearFecha(fecha){

    const f = new Date(fecha);

    return f.toLocaleDateString("es-ES",{

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    });

}
