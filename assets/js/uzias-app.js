/************************************************
 * CAMINANDO CON DIOS
 * ESTUDIO DEL REY UZÍAS
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarUzias);


/************************************************
 * INICIAR UZÍAS
 ************************************************/

function iniciarUzias(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}


        <main class="estudio-uzias">

            <div class="canva-estudio">

                <iframe
                    loading="lazy"
                    src="https://www.canva.com/design/DAHRhjZ0oDM/I7KURDp9MuKK0IiskSHtVA/view?embed"
                    allowfullscreen>
                </iframe>

            </div>

        </main>

        

    `;

    app.style.display = "block";

    iniciarHeader();
    

}
