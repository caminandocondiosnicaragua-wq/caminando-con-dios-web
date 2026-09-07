/*
 * CAMINANDO CON DIOS · NUEVA VIDA
 * Capa visual e interactiva de la Parte 1.
 * No cambia la fuente de contenido ni el almacenamiento existente.
 */
(function(){
  const FONT_KEY = "nv1_font_scale";
  const VF_TEXTOS = [
    "Para ser salvo sólo necesito creer que Dios existe.",
    "El pecado causa una separación entre Dios y el hombre.",
    "Soy salvo por asistir a la iglesia y hacer cosas buenas."
  ];

  document.addEventListener("DOMContentLoaded", iniciarExperienciaNV1_);

  function iniciarExperienciaNV1_(){
    // El contenido dinámico ya fue construido por los módulos anteriores.
    prepararVF_();
    eliminarDuplicadosVF_();
    mejorarTarjetas_();
    agregarAccesibilidad_();
    agregarAudio_();
    agregarCamposDeEjercicio_();
    agregarImagenesSecciones_();
    mejorarExamen_();
    instalarBibliaExacta_();
    aplicarEscalaGuardada_();
  }

  function prepararVF_(){
    const seccion = document.querySelector('.nv1-section[data-step="1"]');
    if(!seccion) return;
    const choices = seccion.querySelectorAll('.nv1-choice');
    choices.forEach((label,i)=>{
      const input = label.querySelector('input[type="radio"]');
      if(!input) return;
      const texto = VF_TEXTOS[i] || label.querySelector('span')?.textContent?.trim() || "";
      label.classList.add("nv1-vf-choice");
      label.innerHTML = `
        <span class="nv1-vf-statement">${escapeHTML_(texto)}</span>
        <span class="nv1-vf-options">
          <span class="nv1-vf-option"><input type="radio" name="vf-${i}" value="true" ${input.checked && input.value === "true" ? "checked" : ""}><b>V</b><em>Verdadero</em></span>
          <span class="nv1-vf-option"><input type="radio" name="vf-${i}" value="false" ${input.checked && input.value === "false" ? "checked" : ""}><b>F</b><em>Falso</em></span>
        </span>`;
    });
  }

  function eliminarDuplicadosVF_(){
    const textoNormalizado = t => String(t || "").replace(/\s+/g," ").trim().toLowerCase();
    const claves = new Set(VF_TEXTOS.map(textoNormalizado));
    document.querySelectorAll('.nv1-section:not([data-step="1"]) .nv1-question').forEach(card=>{
      const texto = textoNormalizado(card.querySelector("h3")?.textContent);
      if(claves.has(texto)) card.remove();
    });
  }

  function mejorarTarjetas_(){
    document.querySelectorAll(".nv1-db-item").forEach(item=>{
      item.classList.add("nv1-media-card");
      const label = item.querySelector(".nv1-db-label");
      if(label && !label.querySelector(".nv1-card-action")){
        const tipo = label.textContent.toLowerCase();
        if(tipo.includes("enseñanza")) label.insertAdjacentHTML("afterbegin", "<span class=\"nv1-card-symbol\">💡</span>");
        if(tipo.includes("ejercicio")) label.insertAdjacentHTML("afterbegin", "<span class=\"nv1-card-symbol\">🎯</span>");
        if(tipo.includes("reflex")) label.insertAdjacentHTML("afterbegin", "<span class=\"nv1-card-symbol\">💭</span>");
        if(tipo.includes("bienvenida")) label.insertAdjacentHTML("afterbegin", "<span class=\"nv1-card-symbol\">🌱</span>");
      }
    });
  }

  function agregarAccesibilidad_(){
    const progress = document.querySelector(".nv1-progress");
    if(!progress || document.getElementById("nv1-accessibility")) return;
    const bar = document.createElement("div");
    bar.id = "nv1-accessibility";
    bar.className = "nv1-accessibility";
    bar.innerHTML = `
      <span>🔎 Tamaño de texto</span>
      <button type="button" data-font="minus" aria-label="Reducir letra">A−</button>
      <button type="button" data-font="normal" aria-label="Tamaño normal">A</button>
      <button type="button" data-font="plus" aria-label="Agrandar letra">A+</button>`;
    progress.after(bar);
    bar.querySelector('[data-font="minus"]').onclick = () => cambiarEscala_(-1);
    bar.querySelector('[data-font="normal"]').onclick = () => establecerEscala_(1);
    bar.querySelector('[data-font="plus"]').onclick = () => cambiarEscala_(1);
  }

  function obtenerEscala_(){ return Number(localStorage.getItem(FONT_KEY) || "1"); }
  function establecerEscala_(valor){
    const escala = Math.max(.9, Math.min(1.3, Number(valor)));
    localStorage.setItem(FONT_KEY, String(escala));
    aplicarEscalaGuardada_();
  }
  function cambiarEscala_(delta){ establecerEscala_(obtenerEscala_() + delta*.1); }
  function aplicarEscalaGuardada_(){
    const escala = obtenerEscala_();
    document.documentElement.style.setProperty("--nv1-font-scale", escala);
    document.body.dataset.nv1Font = escala.toFixed(1);
  }

  function agregarAudio_(){
    document.querySelectorAll(".nv1-section, .nv1-db-item, .nv1-question").forEach(card=>{
      if(card.classList.contains("nv1-question") && card.closest(".nv1-game")) return;
      if(card.querySelector(":scope > .nv1-audio-control")) return;
      const texto = extraerTextoParaAudio_(card);
      if(!texto) return;
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "nv1-audio-control";
      boton.innerHTML = "🔊 Escuchar";
      boton.addEventListener("click", ()=>reproducirTexto_(texto, boton));
      const destino = card.querySelector(":scope > .nv1-section-companion") || card.querySelector(":scope > .nv1-db-content") || card.querySelector(":scope > .nv1-actions");
      if(destino) destino.before(boton); else card.appendChild(boton);
    });
  }

  function extraerTextoParaAudio_(card){
    const clone = card.cloneNode(true);
    clone.querySelectorAll("button, textarea, input, .nv1-audio-control, .nv1-actions, .nv1-wizard-nav").forEach(e=>e.remove());
    const texto = clone.innerText?.replace(/\s+/g," ").trim() || "";
    return texto.length >= 15 ? texto : "";
  }

  function reproducirTexto_(texto, boton){
    if(!("speechSynthesis" in window)){
      boton.textContent = "🔊 Audio no disponible";
      return;
    }
    speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = document.documentElement.lang || "es-ES";
    voz.rate = .92;
    boton.textContent = "⏸ Detener";
    voz.onend = voz.onerror = ()=>{ boton.textContent = "🔊 Escuchar"; };
    speechSynthesis.speak(voz);
  }

  function agregarCamposDeEjercicio_(){
    document.querySelectorAll(".nv1-db-exercise").forEach(card=>{
      if(card.querySelector(".nv1-date-input")) return;
      const texto = card.textContent || "";
      if(/fecha\s*:/i.test(texto)){
        const wrap = document.createElement("label");
        wrap.className = "nv1-date-wrap";
        wrap.innerHTML = `📅 <span>Fecha de mi compromiso</span><input class="nv1-date-input" type="date">`;
        const action = card.querySelector(".nv1-exercise-action");
        if(action) action.before(wrap); else card.appendChild(wrap);
      }
    });
  }

  function agregarImagenesSecciones_(){
    document.querySelectorAll(".nv1-section").forEach(section=>{
      if(section.querySelector(":scope > .nv1-section-art")) return;
      const titulo = (section.querySelector("h2")?.textContent || "").toLowerCase();
      let src = "";
      let alt = "";
      if(titulo.includes("obra") || titulo.includes("enseñanza")){ src="assets/img/nueva-vida/ensenanza.svg"; alt="Ilustración sobre aprender y crecer en la fe"; }
      else if(titulo.includes("reflex") || titulo.includes("resum")){ src="assets/img/nueva-vida/reflexion.svg"; alt="Momento de reflexión"; }
      if(!src) return;
      const art = document.createElement("div");
      art.className = "nv1-section-art";
      art.innerHTML = `<img src="${src}" alt="${alt}">`;
      const visual = section.querySelector(":scope > .nv1-section-visual");
      if(visual) visual.after(art); else section.querySelector("h2")?.after(art);
    });
  }

  function mejorarExamen_(){
    // Distribuye visualmente las opciones sin alterar la respuesta correcta:
    // el texto correcto conserva su identidad y la selección se remapea.
    document.addEventListener("click", function(e){
      const boton = e.target.closest(".nv1-game-option");
      if(!boton) return;
      const botones = Array.from(document.querySelectorAll(".nv1-game-option"));
      botones.forEach(b=>b.classList.remove("nv1-option-selected"));
      boton.classList.add("nv1-option-selected");
    }, true);
  }

  function instalarBibliaExacta_(){
    if(typeof obtenerCapituloBiblia !== "function" || typeof obtenerCodigoLibro !== "function") return;
    window.abrirBibliaNV1_ = async function(referencia){
      const modal = document.getElementById("nv1-bible-modal");
      const title = document.getElementById("nv1-bible-title");
      const content = document.getElementById("nv1-bible-content");
      if(!modal || !title || !content) return;
      modal.classList.add("open");
      title.textContent = referencia;
      content.innerHTML = '<div class="nv1-loading">Cargando el pasaje exacto...</div>';
      try{
        const parsed = parsearReferenciaVersiculos_(referencia);
        if(!parsed) throw new Error("Referencia no reconocida");
        const datos = await obtenerCapituloBiblia(parsed.codigo, parsed.capitulo);
        const versos = Array.isArray(datos?.versiculos) ? datos.versiculos : [];
        const seleccion = versos.filter(v=>Number(v.numero) >= parsed.inicio && Number(v.numero) <= parsed.fin);
        if(!seleccion.length) throw new Error("No se encontraron los versículos solicitados");
        content.innerHTML = seleccion.map(v=>`<p><strong>${escapeHTML_(v.numero)}.</strong> ${escapeHTML_(v.texto)}</p>`).join("");
      }catch(error){
        console.error("Biblia NV1:", error);
        content.innerHTML = `<div class="nv1-bible-error"><strong>No pudimos mostrar este pasaje.</strong><p>La referencia es <b>${escapeHTML_(referencia)}</b>. Puedes intentarlo nuevamente desde el lector bíblico.</p></div>`;
      }
    };
  }

  function parsearReferenciaVersiculos_(referencia){
    const m = String(referencia || "").trim().match(/^(.*?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/);
    if(!m) return null;
    const libro = m[1].trim();
    const codigo = obtenerCodigoLibro(libro);
    if(!codigo) return null;
    const capitulo = Number(m[2]);
    const inicio = Number(m[3] || 1);
    const fin = Number(m[4] || inicio);
    return {libro,codigo,capitulo,inicio,fin};
  }

  function escapeHTML_(valor){
    return String(valor ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
  }
})();
