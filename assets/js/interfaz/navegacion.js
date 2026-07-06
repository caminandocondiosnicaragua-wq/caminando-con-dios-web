/************************************************
 * CAMINANDO CON DIOS
 * NAVEGACIÓN DEL DEVOCIONAL
 ************************************************/


/************************************************
 * BOTONES
 ************************************************/

function crearAcciones(devocional){

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
        id="btnLectura">
        📖 Comenzar lectura bíblica
    </button>

</section>
`;
}


/************************************************
 * ACTIVAR NAVEGACIÓN
 ************************************************/

function iniciarNavegacion(){

    activarBotonAnterior();

    activarBotonSiguiente();

    activarCalendario();

    activarModoLectura();

}
