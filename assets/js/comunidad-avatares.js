/************************************************
 * CAMINANDO CON DIOS
 * SELECTOR DE AVATAR DE COMUNIDAD
 *
 * El avatar se elige después de iniciar sesión.
 * La selección queda asociada localmente al usuario.
 *
 * Las imágenes reales se pueden incorporar después
 * sin cambiar la lógica del selector.
 ************************************************/

const COMUNIDAD_AVATAR_KEY = "caminando_con_dios_avatar";

const RUTA_AVATARES_COMUNIDAD = "assets/img/AVATARES/";\n\nconst AVATARES_COMUNIDAD = [\n    {\n        id:"estela",\n        nombre:"Estela",\n        genero:"mujer",\n        imagen:RUTA_AVATARES_COMUNIDAD + "ESTELA-CAMINANDO%20CON%20DIOS.png",\n        lema:"Tu guía en el camino",\n        principal:true\n    },\n    {\n        id:"alma-luz",\n        nombre:"Alma Luz",\n        genero:"mujer",\n        imagen:RUTA_AVATARES_COMUNIDAD + "ALMA%20LUZ-%20CAMINANDO%20CON%20DIOS.png",\n        lema:"Aprendamos juntos de la Palabra."\n    },\n    {\n        id:"dan",\n        nombre:"Dan",\n        genero:"hombre",\n        imagen:RUTA_AVATARES_COMUNIDAD + "DAN-CAMINANDO%20CON%20DIOS.png",\n        lema:"Caminemos juntos en la verdad."\n    },\n    {\n        id:"sam",\n        nombre:"Sam",\n        genero:"hombre",\n        imagen:RUTA_AVATARES_COMUNIDAD + "SAM-%20CAMINANDO%20CON%20DIOS.png",\n        lema:"Pregunta, aprende y crece."\n    }\n];

function obtenerClaveAvatarComunidad_(){
    const usuario = typeof obtenerUsuarioComunidad === "function" ? obtenerUsuarioComunidad() : null;
    if(!usuario) return null;
    return COMUNIDAD_AVATAR_KEY + "_" + (usuario.idUsuario || usuario.correo);
}

function obtenerAvatarComunidad(){
    const clave = obtenerClaveAvatarComunidad_();
    if(!clave) return null;

    try{
        const id = localStorage.getItem(clave);
        return AVATARES_COMUNIDAD.find(a => a.id === id) || null;
    }catch(error){
        console.error("No se pudo leer el avatar de Comunidad:", error);
        return null;
    }
}

function guardarAvatarComunidad_(id){
    const clave = obtenerClaveAvatarComunidad_();
    if(!clave) return false;
    localStorage.setItem(clave, id);
    return true;
}

function iniciarSelectorAvatarComunidad_(){
    const contenedor = document.getElementById("selector-avatar-comunidad");
    if(!contenedor) return;

    const avatar = obtenerAvatarComunidad();

    if(avatar){
        renderAvatarSeleccionadoComunidad_(contenedor, avatar);
    }else{
        renderSelectorCompletoComunidad_(contenedor);
    }
}

function renderSelectorCompletoComunidad_(contenedor){
    contenedor.innerHTML = `
        <div class="avatar-selector-cabecera">
            <span class="avatar-selector-badge">Tu compañero de estudio</span>
            <h2>Elige quién te acompañará</h2>
            <p>
                Después de iniciar sesión puedes escoger un compañero o compañera
                para acompañarte durante tus estudios.
            </p>
        </div>

        <div class="avatar-selector-filtros" role="tablist" aria-label="Filtrar avatares">
            <button type="button" class="avatar-filtro activo" data-genero="todos">Todos</button>
            <button type="button" class="avatar-filtro" data-genero="mujer">👩 Mujeres</button>
            <button type="button" class="avatar-filtro" data-genero="hombre">👨 Hombres</button>
        </div>

        <div class="avatar-grid" id="avatar-grid-comunidad">
            ${AVATARES_COMUNIDAD.map(avatar => crearTarjetaAvatarComunidad_(avatar)).join("")}
        </div>

        <div class="avatar-selector-acciones">
            <button type="button" class="btn-avatar-continuar" id="btn-avatar-continuar" disabled>
                Escoge un compañero para continuar
            </button>
        </div>

        <p class="avatar-selector-nota">
            Podrás cambiar tu compañero más adelante desde tu espacio de Comunidad.
        </p>
    `;

    contenedor.classList.add("avatar-selector-visible");
    activarControlesAvatarComunidad_();
}

function crearTarjetaAvatarComunidad_(avatar){
    return `
        <button type="button"
                class="avatar-card"
                data-avatar-id="${avatar.id}"
                data-genero="${avatar.genero}"
                aria-label="Elegir a ${avatar.nombre}">
            <span class="avatar-card-figura" aria-hidden="true"><img src="${avatar.imagen}" alt="" loading="lazy"></span>
            <span class="avatar-card-nombre">${avatar.nombre}</span>
            <span class="avatar-card-lema">${avatar.lema}</span>
            <span class="avatar-card-check" aria-hidden="true">✓</span>
        </button>
    `;
}

function activarControlesAvatarComunidad_(){
    const grid = document.getElementById("avatar-grid-comunidad");
    const continuar = document.getElementById("btn-avatar-continuar");
    if(!grid || !continuar) return;

    let seleccionado = null;

    grid.querySelectorAll(".avatar-card").forEach(card => {
        card.addEventListener("click", function(){
            grid.querySelectorAll(".avatar-card").forEach(c => c.classList.remove("seleccionado"));
            this.classList.add("seleccionado");
            seleccionado = this.dataset.avatarId;

            continuar.disabled = false;
            continuar.textContent = "Continuar con " + this.querySelector(".avatar-card-nombre").textContent + " →";
        });
    });

    document.querySelectorAll(".avatar-filtro").forEach(filtro => {
        filtro.addEventListener("click", function(){
            document.querySelectorAll(".avatar-filtro").forEach(f => f.classList.remove("activo"));
            this.classList.add("activo");

            const genero = this.dataset.genero;
            grid.querySelectorAll(".avatar-card").forEach(card => {
                card.hidden = genero !== "todos" && card.dataset.genero !== genero;
            });
        });
    });

    continuar.addEventListener("click", function(){
        if(!seleccionado) return;
        guardarAvatarComunidad_(seleccionado);
        const avatar = AVATARES_COMUNIDAD.find(a => a.id === seleccionado);
        renderAvatarSeleccionadoComunidad_(document.getElementById("selector-avatar-comunidad"), avatar);
    });
}

function renderAvatarSeleccionadoComunidad_(contenedor, avatar){
    if(!contenedor || !avatar) return;

    contenedor.innerHTML = `
        <div class="avatar-seleccionado">
            <div class="avatar-seleccionado-figura" aria-hidden="true"><img src="${avatar.imagen}" alt="" loading="lazy"></div>
            <div class="avatar-seleccionado-texto">
                <span class="avatar-selector-badge">Tu compañero de estudio</span>
                <h2>Caminarás junto a ${avatar.nombre}</h2>
                <p>“${avatar.lema}”</p>
            </div>
            <div class="avatar-seleccionado-acciones">
                <button type="button" class="btn-avatar-cambiar" onclick="mostrarSelectorAvataresComunidad_()">
                    Cambiar avatar
                </button>
            </div>
        </div>
    `;

    contenedor.classList.add("avatar-selector-visible");
}

function mostrarSelectorAvataresComunidad_(){
    const contenedor = document.getElementById("selector-avatar-comunidad");
    if(contenedor) renderSelectorCompletoComunidad_(contenedor);
}

function ocultarSelectorAvatarComunidad_(){
    const contenedor = document.getElementById("selector-avatar-comunidad");
    if(contenedor){
        contenedor.innerHTML = "";
        contenedor.classList.remove("avatar-selector-visible");
    }
}
