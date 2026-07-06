/************************************************
 * CAMINANDO CON DIOS | BIBLIA Y FE
 * INTERFAZ 2.0
 ************************************************/

function mostrarDevocional(devocional){

    const app = document.getElementById("app");

    app.innerHTML = `

<div class="pagina">

    <!-- HERO -->

    <header>

        <img
            src="assets/img/hero.png"
            class="hero"
            alt="Portada">

        <section class="cabecera">

            <h1>Caminando con Dios | Biblia y Fe</h1>

            <p class="lema">

                "Confía en Jehová con todo tu corazón,
                y no te apoyes en tu propia prudencia."

                <br>

                <strong>Proverbios 3:5-6</strong>

            </p>

        </section>

    </header>

    <!-- CONTENIDO -->

    <div class="layout">

        <!-- COLUMNA IZQUIERDA -->

        <main class="tarjeta">

            ${crearCabecera(devocional)}

            ${crearAcciones(devocional)}

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

        <!-- PANEL DERECHO -->

        <aside class="panel-biblia">

            <h2>

                📖 Leer los capítulos

            </h2>

            <div id="contenidoBiblia">

                <p>

                    Selecciona una lectura para
                    visualizar aquí el capítulo completo.

                </p>

                <hr>

                <h3>

                    Antiguo Testamento

                </h3>

                <p>

                    ${devocional["TEXTO A.T."]}

                </p>

                <h3>

                    Nuevo Testamento

                </h3>

                <p>

                    ${devocional["TEXTO. N.T."]}

                </p>

            </div>

        </aside>

    </div>

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

            <h2 class="titulo">

                ${devocional.TITULO || "Devocional Diario"}

            </h2>

        </section>

    `;

}

/************************************************
 * BOTONES
 ************************************************/

/************************************************
 * BOTONES
 ************************************************/

function crearAcciones(){

    return `

        <section class="acciones">

            <button
                class="btn secundario"
                id="btnAnterior">

                ← Día anterior

            </button>

            <button
                class="btn principal"
                id="btnCalendario">

                📅 Elegir día

            </button>

            <button
                class="btn secundario"
                id="btnSiguiente">

                Día siguiente →

            </button>

        </section>

        <section class="acciones">

            <button
                class="btn lectura"
                id="btnLeerBiblia">

                📖 Comenzar lectura bíblica

            </button>

        </section>

    `;

}
/************************************************
 * LECTURAS BÍBLICAS
 ************************************************/

/************************************************
 * LECTURAS BÍBLICAS
 ************************************************/

function crearLecturas(){

    return "";

}/************************************************
 * SECCIONES DEL DEVOCIONAL
 ************************************************/

function crearSeccion(icono, titulo, texto){

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

                ${texto || ""}

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

                ${texto || ""}

            </blockquote>

        </section>

    `;

}

/************************************************
 * FORMATEAR FECHA
 ************************************************/

function formatearFecha(fecha){

    if(!fecha) return "";

    // Mantener la fecha local (no UTC)
    const f = new Date(fecha + "T00:00:00");

    return f.toLocaleDateString("es-ES",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

/************************************************
 * PANEL BÍBLICO
 * (Preparado para la siguiente versión)
 ************************************************/

function mostrarCapitulo(referencia){

    const panel = document.getElementById("contenidoBiblia");

    if(!panel) return;

    panel.innerHTML = `

        <h2>

            📖 ${referencia}

        </h2>

        <p>

            Aquí cargaremos automáticamente el texto completo
            del capítulo sin salir del devocional.

        </p>

        <br>

        <p>

            Esta función se conectará con nuestra base de datos
            bíblica en la siguiente etapa.

        </p>

    `;

}
/********************************************
NAVEGACIÓN
********************************************/

function diaAnterior(){

    alert(
`📖

Volvamos al devocional anterior.

Cada día en la Palabra fortalece nuestra fe.

(En el siguiente paso cargaremos automáticamente el devocional anterior.)`
    );

}


function diaSiguiente(){

    alert(
`🌅

Gracias por acompañarnos hoy.

El próximo devocional estará disponible
en la fecha correspondiente.

Te esperamos mañana para seguir caminando con Dios.

"Lámpara es a mis pies tu palabra,
y lumbrera a mi camino."

Salmo 119:105`
    );

}


function abrirCalendario(){

    alert(
`📅

Aquí abriremos el calendario.

Solo estarán habilitados:

✓ Hoy

✓ Días anteriores

Los días futuros permanecerán bloqueados
hasta que llegue su fecha.`
    );

}
