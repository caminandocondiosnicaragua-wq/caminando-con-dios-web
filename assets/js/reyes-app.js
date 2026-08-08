/************************************************
 * CAMINANDO CON DIOS
 * REYES DE ISRAEL Y JUDÁ
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarReyes);


/************************************************
 * INICIAR REYES
 ************************************************/

function iniciarReyes(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">

            ${crearPaginaReyes()}

        </div>

        ${crearFooter()}

    `;

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

}


/************************************************
 * DATOS DE LOS REYES
 ************************************************/

const REYES_BIBLICOS = [

    {
        reino: "👑 Reino Unido",
        descripcion: "Antes de la división del reino.",
        reyes: [

            {
                icono: "👑",
                nombre: "Saúl"
            },

            {
                icono: "👑",
                nombre: "David"
            },

            {
                icono: "👑",
                nombre: "Salomón"
            }

        ]
    },


    {
        reino: "🇮🇱 Reino de Israel",
        descripcion: "Reino del norte después de la división.",
        reyes: [

            { icono: "👑", nombre: "Jeroboam I" },
            { icono: "👑", nombre: "Nadab" },
            { icono: "👑", nombre: "Baasa" },
            { icono: "👑", nombre: "Ela" },
            { icono: "👑", nombre: "Zimri" },
            { icono: "👑", nombre: "Omri" },
            { icono: "👑", nombre: "Acab" },
            { icono: "👑", nombre: "Ocozías" },
            { icono: "👑", nombre: "Joram" },
            { icono: "👑", nombre: "Jehú" },
            { icono: "👑", nombre: "Joacaz" },
            { icono: "👑", nombre: "Joás" },
            { icono: "👑", nombre: "Jeroboam II" },
            { icono: "👑", nombre: "Zacarías" },
            { icono: "👑", nombre: "Salum" },
            { icono: "👑", nombre: "Manahem" },
            { icono: "👑", nombre: "Pekaía" },
            { icono: "👑", nombre: "Peka" },
            { icono: "👑", nombre: "Oseas" }

        ]
    },


    {
        reino: "🇯🇺 Reino de Judá",
        descripcion: "Reino del sur después de la división.",
        reyes: [

            { icono: "👑", nombre: "Roboam" },
            { icono: "👑", nombre: "Abías" },
            { icono: "👑", nombre: "Asa" },
            { icono: "👑", nombre: "Josafat" },
            { icono: "👑", nombre: "Joram" },
            { icono: "👑", nombre: "Ocozías" },
            { icono: "👑", nombre: "Joás" },
            { icono: "👑", nombre: "Amasías" },

            {
                icono: "👑",
                nombre: "Uzías",
                enlace: "uzias.html"
            },

            { icono: "👑", nombre: "Jotam" },
            { icono: "👑", nombre: "Acaz" },
            { icono: "👑", nombre: "Ezequías" },
            { icono: "👑", nombre: "Manasés" },
            { icono: "👑", nombre: "Amón" },
            { icono: "👑", nombre: "Josías" },
            { icono: "👑", nombre: "Joacaz" },
            { icono: "👑", nombre: "Joacim" },
            { icono: "👑", nombre: "Joaquín" },
            { icono: "👑", nombre: "Sedequías" }

        ]
    }

];


/************************************************
 * CREAR PÁGINA DE REYES
 ************************************************/

function crearPaginaReyes(){

    let html = `

    <section class="biblioteca">

        <div class="biblioteca-cabecera">

            <h2>👑 Reyes de Israel y Judá</h2>

            <p>
                Conoce a los reyes que gobernaron al pueblo de Dios
                desde el reino unido hasta la división de Israel y Judá.
            </p>

        </div>

    `;


    REYES_BIBLICOS.forEach(grupo => {

        html += `

        <section class="categoria-biblioteca">

            <h2>${grupo.reino}</h2>

            <p>
                ${grupo.descripcion}
            </p>

            <div class="grid-tarjetas">

        `;


        grupo.reyes.forEach(rey => {

            if(rey.enlace){

                html += `

                <a
                    href="${rey.enlace}"
                    class="tarjeta-biblioteca">

                    <div class="tarjeta-icono">
                        ${rey.icono}
                    </div>

                    <div class="tarjeta-titulo">
                        ${rey.nombre}
                    </div>

                </a>

                `;

            } else {

                html += `

                <div class="tarjeta-biblioteca">

                    <div class="tarjeta-icono">
                        ${rey.icono}
                    </div>

                    <div class="tarjeta-titulo">
                        ${rey.nombre}
                    </div>

                </div>

                `;

            }

        });


        html += `

            </div>

        </section>

        `;

    });


    html += `

    </section>

    `;

    return html;

}
