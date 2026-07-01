function mostrarDevocional(devocional){

    const app = document.getElementById("app");

    app.innerHTML = `

        <section class="contenedor">

            <h1>Caminando con Dios</h1>

            <p>${devocional.FECHA}</p>

            <h2>${devocional.TITULO}</h2>

            <h3>${devocional["TEXTO A.T."]}</h3>

            <h3>${devocional["TEXTO N.T."]}</h3>

            <hr>

            <h2>Enseñanza</h2>

            <p>${devocional.ENSEÑANZA}</p>

        </section>

    `;

}
