/************************************************
 * CAMINANDO CON DIOS
 * ACERCA DE
 ************************************************/

document.addEventListener("DOMContentLoaded", iniciarAcerca);

function iniciarAcerca(){

    const app = document.getElementById("app");

    app.innerHTML = `

        ${crearHeader()}

        ${crearHero()}

        <div class="contenedor">
            ${crearPaginaAcerca()}
        </div>

        ${crearFooter()}

    `;

    app.style.display = "block";

    iniciarHeader();
    iniciarFooter();

}

function crearPaginaAcerca(){

    return `

<section class="acerca-pagina">

    <div class="acerca-cabecera">

        <h1>ℹ️ Acerca de Caminando con Dios</h1>

        <p class="acerca-frase">
            No queremos solamente compartir contenido. Queremos que la Palabra de Dios
            encuentre corazones, despierte esperanza y transforme vidas.
        </p>

    </div>

    <section class="acerca-seccion">

        <h2>❤️ ¿Por qué existe Caminando con Dios?</h2>

        <p>
            Hay personas que necesitan escuchar que Dios las ama. Hay quienes están
            buscando respuestas, atravesando momentos difíciles o simplemente desean
            conocer más de Él.
        </p>

        <p>
            <strong>Caminando con Dios nace con el deseo de llevar la Palabra de Dios
            hasta donde podamos llegar.</strong> Queremos que este espacio sea una puerta
            para quienes buscan a Dios y un lugar de crecimiento para quienes ya han
            comenzado a caminar con Él.
        </p>

        <p>
            Creemos que el evangelio no es solamente un mensaje para escuchar, sino
            una verdad que puede cambiar el corazón, restaurar la esperanza y transformar
            la manera en que vivimos.
        </p>

    </section>

    <section class="acerca-seccion">

        <h2>📖 Nuestra misión</h2>

        <p>
            Compartir la Palabra de Dios con claridad, fidelidad y propósito,
            utilizando diferentes recursos para alcanzar a personas de distintos
            lugares y ayudarlas a conocer a Dios, crecer en la fe y vivir conforme
            a Su Palabra.
        </p>

        <p>
            Queremos llevar el mensaje de salvación a quienes todavía no conocen a
            Cristo y acompañar en su crecimiento espiritual a quienes ya han decidido
            seguirle.
        </p>

    </section>

    <section class="acerca-seccion">

        <h2>🌎 Nuestra visión</h2>

        <p>
            Ser un espacio ministerial en línea que alcance vidas más allá de nuestras
            fronteras, conectando a las personas con la Palabra de Dios y creando caminos
            de evangelismo, discipulado, enseñanza y crecimiento espiritual.
        </p>

        <p>
            Soñamos con ver personas que conocen a Dios, crecen en Su Palabra y luego
            llevan ese mensaje a otros. Porque una vida transformada por Cristo puede
            convertirse en una influencia para una familia, una comunidad y muchas más vidas.
        </p>

    </section>

    <section class="acerca-destacado">

        <p class="destacado-texto">
            "La Palabra de Dios no fue dada solamente para ser leída, sino para ser
            creída, vivida y compartida."
        </p>

        <p>
            Ese es el corazón de <strong>Caminando con Dios</strong>.
        </p>

    </section>

    <section class="acerca-seccion acerca-recursos">

        <h2>📚 Recursos para seguir creciendo</h2>

        <p>
            A través de este proyecto iremos creando y reuniendo devocionales,
            estudios bíblicos, recursos de consulta, planes de lectura y otros
            materiales que puedan ayudarte en tu caminar con Dios.
        </p>

        <p>
            Algunos de estos recursos son desarrollados bajo <strong>LumiWord Creaciones</strong>,
            un proyecto editorial relacionado con la creación de materiales cristianos.
            Si en algún momento deseas conocer o adquirir alguno de esos recursos,
            podrás encontrarlos desde los espacios correspondientes.
        </p>

        <p>
            Pero el propósito de este lugar permanece claro: <strong>compartir la Palabra,
            anunciar las Buenas Nuevas y ayudar a que más personas conozcan a Dios.</strong>
        </p>

    </section>

    <section class="acerca-invitacion">

        <h2>✨ Tú también puedes comenzar</h2>

        <p>
            Tal vez llegaste buscando una respuesta. Tal vez alguien compartió esta
            página contigo. Tal vez simplemente estás buscando conocer más de Dios.
        </p>

        <p>
            Sea cual sea la razón, queremos invitarte a detenerte un momento,
            abrir Su Palabra y comenzar a caminar con Él.
        </p>

        <p class="invitacion-final">
            <strong>Conoce a Dios. Conoce Su Palabra. Vive Su verdad. Comparte Su amor.</strong>
        </p>

    </section>

</section>

`;

}
