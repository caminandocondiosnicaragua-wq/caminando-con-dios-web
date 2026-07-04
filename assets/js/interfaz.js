/************************************************
 * INTERFAZ
 * CAMINANDO CON DIOS
 ************************************************/

function mostrarDevocional(devocional) {

    const app = document.getElementById("app");

    app.innerHTML = `

    <div class="pagina">

        <header class="cabecera">
          
            <img
                src="assets/img/hero.png"
                class="hero"
                alt="Portada">
    <div class="overlay"></div>
                        
            <div class="logo-area">

            
                <div>
                    <h1>Caminando con Dios | Biblia y Fe</h1>

                    <p class="lema">

                        Confía en Jehová con todo tu corazón,
                        y no te apoyes en tu propia prudencia.

                        <br>

                        <strong>Proverbios 3:5-6</strong>

                    </p>

                </div>

            </div>

        </header>

        <main class="tarjeta">

           ${crearCabecera(devocional)}
            ${crearAcciones()}
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

        </main>

    </div>

    `;

}

/************************************************
 * CABECERA DEL DEVOCIONAL
 ************************************************/

function crearCabecera(devocional){

    return `

        <section class="cabecera-devocional">

            <div class="fecha">

                📅 ${formatearFecha(devocional.FECHA)}

            </div>

            <h2>

                ${devocional.TITULO || "Devocional Diario"}

            </h2>

        </section>

    `;

}
/************************************************
 * LECTURAS BÍBLICAS
 ************************************************/

function crearLecturas(devocional){

    return `

        <section class="lecturas">

            <div class="lectura-card antiguo">

                <div class="lectura-icono">
                    📜
                </div>

                <div>

                    <h3>Antiguo Testamento</h3>

                    <p class="cita">

                        ${devocional["TEXTO A.T."]}

                    </p>

                </div>

            </div>

            <div class="lectura-card nuevo">

                <div class="lectura-icono">
                    ✝️
                </div>

                <div>

                    <h3>Nuevo Testamento</h3>

                    <p class="cita">

                        ${devocional["TEXTO. N.T."]}

                    </p>

                </div>

            </div>

        </section>

    `;

}


/************************************************
 * SECCIONES
 ************************************************/

function crearSeccion(icono,titulo,texto){

    return `

        <section class="seccion">

            <div class="titulo-seccion">

                <span class="icono">

                    ${icono}

                </span>

                <h3>

                    ${titulo}

                </h3>

            </div>

            <div class="contenido-seccion">

                ${texto}

            </div>

        </section>

    `;

}


/************************************************
 * PALABRA DE VIDA
 ************************************************/

function crearPalabraVida(texto){

    return `

        <section class="palabra-vida">

            <h3>

                ✨ Palabra de Vida

            </h3>

            <blockquote>

                ${texto}

            </blockquote>

        </section>

    `;

}
/************************************************
 * BOTONES DE ACCIÓN
 ************************************************/

function crearAcciones(){

    return `

        <section class="acciones">

            <button class="btn secundario">

                ← Día anterior

            </button>

            <button class="btn principal">

                📅 Elegir día

            </button>

            <button class="btn secundario">

                Día siguiente →

            </button>

        </section>

        <section class="acciones">

            <button class="btn lectura">

                📖 Leer capítulo completo

            </button>

        </section>

    `;

}


/************************************************
 * FORMATEAR FECHA
 ************************************************/

function formatearFecha(fecha){

    if(!fecha) return "";

    const f = new Date(fecha + "T00:00:00");

    return f.toLocaleDateString("es-ES",{

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    });

}
