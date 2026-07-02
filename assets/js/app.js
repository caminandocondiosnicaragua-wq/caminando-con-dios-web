function mostrarDevocional(devocional) {

    const app = document.getElementById("app");

    app.innerHTML = `

    <div class="pagina">

        <header class="cabecera">

            <h1>Caminando con Dios | Biblia y Fe</h1>

            <p class="lema">
                Confía en Jehová con todo tu corazón,
                y no te apoyes en tu propia prudencia.
                <br>
                <strong>Proverbios 3:5-6</strong>
            </p>

        </header>

        <main class="tarjeta">

            ${crearCabecera(devocional)}

            ${crearLecturas(devocional)}

            ${crearSeccion(
                "📖",
                "Enseñanza",
                devocional["ENSEÑANZA"]
            )}

            ${crearSeccion(
                "💡",
                "Idea Central",
                devocional["IDEA CENTRAL"]
            )}

            ${crearSeccion(
                "📚",
                "Explicación",
                devocional["EXPLICACION"]
            )}

            ${crearSeccion(
                "❤️",
                "Reflexión",
                devocional["REFLEXION"]
            )}

            ${crearSeccion(
                "❓",
                "Preguntas",
                devocional["PREGUNTAS"]
            )}

            ${crearSeccion(
                "🙏",
                "Oración",
                devocional["ORACION"]
            )}

            ${crearPalabraVida(
                devocional["PALABRA DE VIDA"]
            )}

            ${crearAcciones()}

        </main>

    </div>

    `;

}
