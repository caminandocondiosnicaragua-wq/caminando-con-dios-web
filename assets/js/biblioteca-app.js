document.addEventListener("DOMContentLoaded", function () {

    const app = document.getElementById("app");

    app.innerHTML = `
        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">

            <section class="biblioteca">
                <h1>📚 Biblioteca Bíblica</h1>
                <p>Biblioteca funcionando.</p>
            </section>

        </div>

        ${crearFooter()}
    `;

    // Mostrar la aplicación
    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

});
