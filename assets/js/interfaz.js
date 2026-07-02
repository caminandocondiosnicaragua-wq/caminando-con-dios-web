function mostrarDevocional(devocional){

    const app = document.getElementById("app");

    app.innerHTML = `

    <div class="pagina">

        <header class="cabecera">

            <h1>Caminando con Dios | Biblia y Fe</h1>

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

                    ${devocional["TEXTO. N.T."]}

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
function crearCabecera(devocional){

    return `

    <div class="cabecera-devocional">

        <div class="fecha">

            📅 ${formatearFecha(devocional["FECHA"])}

        </div>

        <h2>

            ${devocional["TÍTULO"] || "Devocional Diario"}

        </h2>

    </div>

    `;

}
function crearLecturas(devocional){

    return `

    <section class="lecturas">

        <div class="lectura">

            <strong>📜 Antiguo Testamento</strong>

            <p>

                ${devocional["TEXTO A.T."] || "-"}

            </p>

        </div>

        <div class="lectura">

            <strong>✝ Nuevo Testamento</strong>

            <p>

                ${devocional["TEXTO. N.T."] || "-"}

            </p>

        </div>

    </section>

    `;

}
function crearSeccion(icono,titulo,contenido){

    if(!contenido){

        return "";

    }

    return `

    <section class="bloque">

        <h3>

            ${icono} ${titulo}

        </h3>

        <p>

            ${contenido}

        </p>

    </section>

    `;

}
function crearPalabraVida(texto){

    if(!texto){

        return "";

    }

    return `

    <section class="palabra">

        <h3>

            ✨ Palabra de Vida

        </h3>

        <blockquote>

            ${texto}

        </blockquote>

    </section>

    `;

}
function crearAcciones(){

    return `

    <section class="acciones">

        <button disabled>

            ❤️ Me ayudó

        </button>

        <button disabled>

            💬 Comentar

        </button>

        <button disabled>

            📤 Compartir

        </button>

    </section>

    `;

}
function formatearFecha(fecha){

    if(!fecha){

        return "";

    }

    const partes = fecha.split("-");

    if(partes.length!==3){

        return fecha;

    }

    const f = new Date(

        Number(partes[0]),
        Number(partes[1])-1,
        Number(partes[2])

    );

    return f.toLocaleDateString(

        "es-ES",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}
