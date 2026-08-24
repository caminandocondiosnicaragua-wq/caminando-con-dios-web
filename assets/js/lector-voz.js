/************************************************
 * CAMINANDO CON DIOS
 * LECTOR DE VOZ DEL NAVEGADOR
 *
 * Solo funciona cuando el devocional NO tiene AUDIO.
 ************************************************/

let lectorVoz = {
    frases: [],
    indice: 0,
    hablando: false,
    detenido: true,
    voces: [],
    iniciado: false
};

function iniciarLectorVoz(){
    if(lectorVoz.iniciado) return;
    lectorVoz.iniciado = true;

    if(!window.speechSynthesis || !window.SpeechSynthesisUtterance){
        console.warn("El navegador no admite Speech Synthesis.");
        return;
    }

    if(!devocionalActual) return;

    // Si existe audio propio, se conserva y no se activa este lector.
    const audioExistente = String(devocionalActual.AUDIO || "").trim();
    if(audioExistente) return;

    prepararFrasesLector();
    if(!lectorVoz.frases.length) return;

    crearLectorVoz();
    cargarVoces();
    speechSynthesis.addEventListener("voiceschanged", cargarVoces);
}

function prepararFrasesLector(){
    const zonas = document.querySelectorAll(
        ".contenido-seccion, .palabra-vida blockquote"
    );

    let indice = 0;

    zonas.forEach(function(zona){
        const walker = document.createTreeWalker(
            zona,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node){
                    if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    if(node.parentElement && node.parentElement.closest("button,script,style,select")){
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodos = [];
        let nodo;
        while((nodo = walker.nextNode())) nodos.push(nodo);

        nodos.forEach(function(texto){
            const partes = texto.nodeValue.match(/[^.!?¡¿]+[.!?]+|[^.!?¡¿]+$/g);
            if(!partes) return;

            const fragmento = document.createDocumentFragment();

            partes.forEach(function(parte){
                const contenido = parte.trim();
                if(!contenido) return;

                const frase = document.createElement("span");
                frase.className = "lector-frase";
                frase.dataset.lectorIndice = indice;

                const palabras = contenido.match(/\S+\s*/g) || [contenido];
                let posicion = 0;

                palabras.forEach(function(palabraTexto){
                    const palabra = document.createElement("span");
                    palabra.className = "lector-palabra";
                    palabra.dataset.posicion = posicion;
                    palabra.textContent = palabraTexto;
                    frase.appendChild(palabra);
                    posicion += palabraTexto.length;
                });

                fragmento.appendChild(frase);

                lectorVoz.frases.push({
                    indice: indice,
                    elemento: frase,
                    texto: contenido,
                    palabras: [...frase.querySelectorAll(".lector-palabra")]
                });

                indice++;
            });

            texto.parentNode.replaceChild(fragmento, texto);
        });
    });
}

function crearLectorVoz(){
    if(document.getElementById("lectorVoz")) return;

    const lector = document.createElement("section");
    lector.id = "lectorVoz";
    lector.className = "lector-voz";
    lector.setAttribute("aria-label", "Lector de voz del devocional");

    lector.innerHTML = `
        <div class="lector-voz-cabecera">
            <div>
                <strong>🔊 Lectura del devocional</strong>
                <span id="lectorEstado">Listo para leer</span>
            </div>
            <button type="button" id="lectorCerrar" aria-label="Cerrar lector">×</button>
        </div>

        <div class="lector-voz-controles">
            <button type="button" id="lectorReproducir" class="lector-btn lector-principal">▶ Reproducir</button>
            <button type="button" id="lectorPausa" class="lector-btn" disabled>⏸ Pausar</button>
            <button type="button" id="lectorDetener" class="lector-btn" disabled>⏹ Detener</button>

            <label class="lector-voz-select">
                <span>Voz</span>
                <select id="lectorVozSelect" aria-label="Seleccionar voz"></select>
            </label>

            <label class="lector-velocidad">
                <span>Velocidad</span>
                <select id="lectorVelocidad" aria-label="Seleccionar velocidad">
                    <option value="0.8">0.8×</option>
                    <option value="0.9">0.9×</option>
                    <option value="1" selected>1×</option>
                    <option value="1.1">1.1×</option>
                    <option value="1.2">1.2×</option>
                </select>
            </label>
        </div>

        <div class="lector-progreso">
            <div class="lector-progreso-barra">
                <div id="lectorProgreso" class="lector-progreso-avance"></div>
            </div>
            <span id="lectorContador">1 / ${lectorVoz.frases.length}</span>
        </div>
    `;

    document.body.appendChild(lector);

    document.getElementById("lectorReproducir").addEventListener("click", reproducirLector);
    document.getElementById("lectorPausa").addEventListener("click", pausarLector);
    document.getElementById("lectorDetener").addEventListener("click", detenerLector);
    document.getElementById("lectorCerrar").addEventListener("click", cerrarLectorVoz);
}

function cargarVoces(){
    const selector = document.getElementById("lectorVozSelect");
    if(!selector) return;

    const voces = speechSynthesis.getVoices()
        .filter(function(voz){ return /^es(-|_|$)/i.test(voz.lang); })
        .sort(function(a,b){
            const aPreferida = /Google español de Estados Unidos/i.test(a.name) || /es-US/i.test(a.lang) ? 0 : 1;
            const bPreferida = /Google español de Estados Unidos/i.test(b.name) || /es-US/i.test(b.lang) ? 0 : 1;
            return aPreferida - bPreferida || a.name.localeCompare(b.name);
        });

    lectorVoz.voces = voces;
    const anterior = selector.value;
    selector.innerHTML = "";

    if(!voces.length){
        const opcion = document.createElement("option");
        opcion.textContent = "No hay voces en español disponibles";
        opcion.value = "";
        selector.appendChild(opcion);
        return;
    }

    voces.forEach(function(voz, indice){
        const opcion = document.createElement("option");
        opcion.value = String(indice);
        opcion.textContent = `${voz.name} — ${voz.lang}`;
        selector.appendChild(opcion);
    });

    if(anterior && [...selector.options].some(op => op.value === anterior)){
        selector.value = anterior;
    }else{
        selector.value = "0";
    }
}

function obtenerVozSeleccionada(){
    const selector = document.getElementById("lectorVozSelect");
    if(!selector || !lectorVoz.voces.length) return null;
    return lectorVoz.voces[Number(selector.value)] || lectorVoz.voces[0];
}

function reproducirLector(){
    if(!lectorVoz.frases.length) return;

    if(!lectorVoz.detenido && !lectorVoz.hablando){
        speechSynthesis.resume();
        lectorVoz.hablando = true;
        actualizarControlesLector();
        actualizarEstadoLector("Continuando…");
        return;
    }

    if(!lectorVoz.detenido && lectorVoz.hablando) return;

    lectorVoz.detenido = false;
    hablarFraseActual();
}

function hablarFraseActual(){
    if(lectorVoz.detenido) return;

    if(lectorVoz.indice >= lectorVoz.frases.length){
        finalizarLector();
        return;
    }

    const frase = lectorVoz.frases[lectorVoz.indice];
    resaltarFraseLector(lectorVoz.indice);

    const utterance = new SpeechSynthesisUtterance(frase.texto);
    const voz = obtenerVozSeleccionada();

    if(voz){
        utterance.voice = voz;
        utterance.lang = voz.lang;
    }else{
        utterance.lang = "es-US";
    }

    const velocidad = document.getElementById("lectorVelocidad");
    utterance.rate = velocidad ? Number(velocidad.value) : 1;
    utterance.pitch = 1;

    utterance.onstart = function(){
        lectorVoz.hablando = true;
        actualizarControlesLector();
        actualizarEstadoLector("Leyendo…");
    };

    utterance.onboundary = function(evento){
        if(evento.name !== "word") return;

        const posicion = Number(evento.charIndex || 0);
        const siguiente = posicion + Math.max(Number(evento.charLength || 1), 1);
        let palabraActual = null;

        for(const palabra of frase.palabras){
            const inicio = Number(palabra.dataset.posicion || 0);
            const fin = inicio + palabra.textContent.length;

            if(posicion < fin && siguiente > inicio){
                palabraActual = palabra;
                break;
            }
        }

        if(!palabraActual) return;

        frase.palabras.forEach(function(palabra){
            palabra.classList.remove("lector-palabra-activa");
        });

        palabraActual.classList.add("lector-palabra-activa");
    };

    utterance.onend = function(){
        if(lectorVoz.detenido) return;
        lectorVoz.indice++;
        hablarFraseActual();
    };

    utterance.onerror = function(evento){
        if(evento.error === "canceled" || evento.error === "interrupted") return;
        lectorVoz.hablando = false;
        actualizarControlesLector();
        actualizarEstadoLector("No se pudo continuar con esta voz.");
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function pausarLector(){
    if(lectorVoz.detenido) return;
    speechSynthesis.pause();
    lectorVoz.hablando = false;
    actualizarControlesLector();
    actualizarEstadoLector("En pausa");
}

function detenerLector(){
    speechSynthesis.cancel();
    lectorVoz.detenido = true;
    lectorVoz.hablando = false;
    lectorVoz.indice = 0;
    limpiarResaltadoLector();
    actualizarProgresoLector();
    actualizarControlesLector();
    actualizarEstadoLector("Listo para leer desde el principio");
}

function finalizarLector(){
    speechSynthesis.cancel();
    lectorVoz.detenido = true;
    lectorVoz.hablando = false;
    lectorVoz.indice = lectorVoz.frases.length;
    limpiarResaltadoLector();
    actualizarProgresoLector();
    actualizarControlesLector();
    actualizarEstadoLector("Lectura terminada");
}

function resaltarFraseLector(indice){
    limpiarResaltadoLector();
    const frase = lectorVoz.frases[indice];
    if(!frase) return;

    frase.elemento.classList.add("lector-frase-activa");
    frase.elemento.scrollIntoView({behavior:"smooth", block:"center"});
    actualizarProgresoLector();
}

function limpiarResaltadoLector(){
    document.querySelectorAll(".lector-frase-activa, .lector-palabra-activa").forEach(function(elemento){
        elemento.classList.remove("lector-frase-activa", "lector-palabra-activa");
    });
}

function actualizarProgresoLector(){
    const barra = document.getElementById("lectorProgreso");
    const contador = document.getElementById("lectorContador");
    if(!barra || !contador) return;

    const total = lectorVoz.frases.length || 1;
    const actual = Math.min(lectorVoz.indice + 1, total);
    const porcentaje = lectorVoz.indice >= total ? 100 : (lectorVoz.indice / total) * 100;

    barra.style.width = `${porcentaje}%`;
    contador.textContent = `${actual} / ${total}`;
}

function actualizarEstadoLector(texto){
    const estado = document.getElementById("lectorEstado");
    if(estado) estado.textContent = texto;
}

function actualizarControlesLector(){
    const reproducir = document.getElementById("lectorReproducir");
    const pausa = document.getElementById("lectorPausa");
    const detener = document.getElementById("lectorDetener");
    if(!reproducir || !pausa || !detener) return;

    reproducir.disabled = lectorVoz.hablando;
    pausa.disabled = lectorVoz.detenido || !lectorVoz.hablando;
    detener.disabled = lectorVoz.detenido;
    reproducir.textContent = !lectorVoz.hablando && !lectorVoz.detenido ? "▶ Continuar" : "▶ Reproducir";
}

function cerrarLectorVoz(){
    speechSynthesis.cancel();
    limpiarResaltadoLector();

    const lector = document.getElementById("lectorVoz");
    if(lector) lector.remove();

    lectorVoz.detenido = true;
    lectorVoz.hablando = false;
}
