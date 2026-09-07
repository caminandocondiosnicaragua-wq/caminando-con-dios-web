/*
 * CAMINANDO CON DIOS
 * NUEVA VIDA · PARTE 1 · CONTENIDO DINÁMICO
 *
 * Lee CONTENIDO-NUEVA VIDA y lo presenta como un recorrido
 * interactivo por secciones. Todavía NO guarda respuestas en Notion.
 */

document.addEventListener("DOMContentLoaded", cargarContenidoNuevaVidaParte1_);

async function cargarContenidoNuevaVidaParte1_(){
  const contenedor = document.querySelector('.nv1-section[data-step="2"]');
  const examen = document.getElementById("nv1-examen");
  if(!contenedor || !examen) return;

  try{
    const respuesta = await fetch(CONFIG.API.url + "?coleccion=contenidoNuevaVida", {method:"GET"});
    if(!respuesta.ok) throw new Error("La API respondió con HTTP " + respuesta.status);

    const datos = await respuesta.json();
    if(!Array.isArray(datos)) throw new Error("La API no devolvió una lista de contenido.");

    const contenido = datos
      .filter(registro => String(registro.Parte || "").trim() === "Parte 1" && Number(registro.Paso) === 1)
      .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0));

    if(!contenido.length) throw new Error("No se encontró contenido para Parte 1 · Paso 1.");

    const fragmento = document.createDocumentFragment();
    const secciones = agruparPorSeccionNV1_(contenido);
    let indiceSeccion = 0;

    Object.keys(secciones).forEach(nombreSeccion => {
      const registros = secciones[nombreSeccion];
      const seccion = document.createElement("section");
      seccion.className = "nv1-section nv1-wizard-section";
      seccion.dataset.step = String(indiceSeccion + 2);
      seccion.dataset.wizardTitle = nombreSeccion || "Nueva Vida en Cristo";
      indiceSeccion++;

      seccion.innerHTML = `
        <div class="nv1-section-visual">
          <div class="nv1-section-icon">${iconoSeccionNV1_(nombreSeccion)}</div>
          <div>
            <span class="nv1-badge">Momento de tu recorrido</span>
            <h2>${escaparHTMLNV1DB_(nombreSeccion || "Nueva Vida en Cristo")}</h2>
            <p class="nv1-section-intro">Tómate tu tiempo. Lee, piensa y avanza cuando estés listo.</p>
          </div>
        </div>
        <div class="nv1-db-content"></div>
        <div class="nv1-section-companion">
          <span>💬</span>
          <p><strong>Vamos paso a paso.</strong> No tienes que terminar todo de una vez.</p>
        </div>
      `;

      const cuerpo = seccion.querySelector(".nv1-db-content");
      registros.forEach(registro => cuerpo.appendChild(crearBloqueContenidoNV1_(registro)));
      fragmento.appendChild(seccion);
    });

    document.querySelectorAll('.nv1-section[data-step="2"], .nv1-section[data-step="3"], .nv1-section[data-step="4"], .nv1-section[data-step="5"]').forEach(seccion => seccion.remove());
    examen.parentNode.insertBefore(fragmento, examen);

    iniciarInteraccionesContenidoNV1DB_();
    iniciarRecorridoNV1_();
    actualizarProgresoNV1_();

  }catch(error){
    console.error("Nueva Vida: no se pudo cargar CONTENIDO-NUEVA VIDA", error);
    mostrarErrorContenidoNV1DB_(contenedor, error.message);
  }
}

function agruparPorSeccionNV1_(registros){
  return registros.reduce((grupos, registro) => {
    const clave = String(registro.Seccion || "Contenido").trim() || "Contenido";
    if(!grupos[clave]) grupos[clave] = [];
    grupos[clave].push(registro);
    return grupos;
  }, {});
}

function iniciarRecorridoNV1_(){
  const secciones = Array.from(document.querySelectorAll(".nv1-section"));
  if(!secciones.length) return;

  secciones.forEach((seccion, indice) => {
    seccion.dataset.wizardIndex = String(indice);
    seccion.classList.toggle("nv1-wizard-hidden", indice !== 0);
  });

  let barra = document.getElementById("nv1-wizard-nav");
  if(!barra){
    barra = document.createElement("div");
    barra.id = "nv1-wizard-nav";
    barra.className = "nv1-wizard-nav";
    const progreso = document.querySelector(".nv1-progress");
    progreso?.after(barra);
  }

  function mostrar(indice){
    indice = Math.max(0, Math.min(indice, secciones.length - 1));
    secciones.forEach((seccion, i) => seccion.classList.toggle("nv1-wizard-hidden", i !== indice));

    const actual = secciones[indice];
    const titulo = actual.dataset.wizardTitle || actual.querySelector("h2")?.textContent || "Recorrido";
    const porcentaje = Math.round((indice / Math.max(1, secciones.length - 1)) * 100);

    barra.innerHTML = `
      <div class="nv1-wizard-top">
        <button type="button" class="nv1-nav-link" data-nav="home">⌂ Inicio</button>
        <div class="nv1-wizard-title"><span>Parte 1 · ¡Salvo!</span><strong>${escaparHTMLNV1DB_(titulo)}</strong></div>
        <span class="nv1-wizard-count">${indice + 1} / ${secciones.length}</span>
      </div>
      <div class="nv1-wizard-dots" aria-label="Progreso de la lección">
        ${secciones.map((_,i)=>`<button type="button" class="nv1-wizard-dot ${i===indice?"active":""} ${i<indice?"done":""}" data-go="${i}" aria-label="Ir al paso ${i+1}">${i<indice?"✓":i+1}</button>`).join("")}
      </div>
      <div class="nv1-wizard-actions">
        <button type="button" class="nv1-btn nv1-btn-secondary" data-nav="back" ${indice===0?"disabled":""}>← Atrás</button>
        <span class="nv1-wizard-percent">${porcentaje}%</span>
        <button type="button" class="nv1-btn nv1-btn-primary" data-nav="next">${indice===secciones.length-1?"✓ Terminar":"Siguiente →"}</button>
      </div>
    `;

    barra.querySelector('[data-nav="home"]').onclick = () => mostrar(0);
    barra.querySelector('[data-nav="back"]').onclick = () => mostrar(indice - 1);
    barra.querySelector('[data-nav="next"]').onclick = () => mostrar(indice + 1);
    barra.querySelectorAll("[data-go]").forEach(btn => btn.onclick = () => mostrar(Number(btn.dataset.go)));

    const pageTop = document.querySelector(".nv1-page");
    if(pageTop) window.scrollTo({top: Math.max(0, pageTop.offsetTop - 90), behavior:"smooth"});
  }

  mostrar(0);
}

function iconoSeccionNV1_(nombre){
  const texto = String(nombre || "").toLowerCase();
  if(texto.includes("bienvenida")) return "🌱";
  if(texto.includes("ejercicio")) return "🏃";
  if(texto.includes("vida")) return "🕊️";
  if(texto.includes("obra")) return "❤️";
  if(texto.includes("fe")) return "🙏";
  if(texto.includes("reflex")) return "💭";
  if(texto.includes("decid")) return "🧭";
  return "📖";
}

function crearBloqueContenidoNV1_(registro){
  const tipo = String(registro.Tipo || "").trim().toLowerCase();
  const texto = String(registro.Texto || "").trim();
  const cita = String(registro["Cita Bíblica"] || "").trim();
  const numero = registro.Número !== undefined && registro.Número !== null ? String(registro.Número).trim() : "";
  const bloque = document.createElement("div");
  bloque.className = "nv1-db-item";

  if(tipo === "pregunta"){
    bloque.classList.add("nv1-question","nv1-interactive-card");
    bloque.innerHTML = `
      <div class="nv1-q-head">
        <div class="nv1-q-num">${escaparHTMLNV1DB_(numero || "?")}</div>
        <div>
          <span class="nv1-mini-label">✍️ Reflexiona</span>
          <h3>${escaparHTMLNV1DB_(texto)}</h3>
          ${crearCitaNV1DB_(cita)}
        </div>
      </div>
      <textarea class="nv1-answer" data-q="${escaparHTMLNV1DB_(numero)}" placeholder="Escribe aquí lo que piensas..."></textarea>
    `;
    return bloque;
  }

  if(tipo === "versiculo"){
    bloque.classList.add("nv1-db-verse","nv1-interactive-card");
    bloque.innerHTML = `
      <div class="nv1-db-label">📖 Palabra de Dios</div>
      <p>${escaparHTMLNV1DB_(texto)}</p>
      ${crearCitaNV1DB_(cita)}
      <button type="button" class="nv1-audio-placeholder">🔊 Escuchar</button>
    `;
    return bloque;
  }

  if(tipo === "bienvenida") bloque.classList.add("nv1-db-welcome");
  else if(tipo === "enseñanza") bloque.classList.add("nv1-db-teaching");
  else if(tipo === "ejercicio") bloque.classList.add("nv1-db-exercise");
  else if(tipo === "reflexion") bloque.classList.add("nv1-db-reflection");

  bloque.classList.add("nv1-interactive-card");
  const icono = tipo === "bienvenida" ? "🌱" : tipo === "enseñanza" ? "💡" : tipo === "ejercicio" ? "🎯" : tipo === "reflexion" ? "💭" : "✨";
  bloque.innerHTML = `
    <div class="nv1-db-label">${icono} ${escaparHTMLNV1DB_(registro.Tipo || "Contenido")}</div>
    <p>${escaparHTMLNV1DB_(texto)}</p>
    ${crearCitaNV1DB_(cita)}
    ${tipo === "ejercicio" ? '<button type="button" class="nv1-exercise-action">✓ Lo hice</button>' : ''}
  `;
  return bloque;
}

function crearCitaNV1DB_(cita){
  if(!cita) return "";
  return `<button type="button" class="nv1-ref" data-ref="${escaparHTMLNV1DB_(cita)}">📖 ${escaparHTMLNV1DB_(cita)}</button>`;
}

function iniciarInteraccionesContenidoNV1DB_(){
  document.querySelectorAll(".nv1-ref").forEach(btn => btn.addEventListener("click", () => abrirBibliaNV1_(btn.dataset.ref)));
  document.querySelectorAll(".nv1-answer").forEach(el => el.addEventListener("input", () => { guardarRespuestasNV1_(0,true); actualizarProgresoNV1_(); }));
  document.querySelectorAll(".nv1-exercise-action").forEach(btn => btn.addEventListener("click", () => { btn.classList.toggle("done"); btn.textContent = btn.classList.contains("done") ? "✓ Completado" : "✓ Lo hice"; }));
}

function mostrarErrorContenidoNV1DB_(contenedor, mensaje){
  const aviso = document.createElement("div");
  aviso.className = "nv1-db-error";
  aviso.innerHTML = `<strong>No pudimos cargar el contenido.</strong><p>${escaparHTMLNV1DB_(mensaje || "Error desconocido")}</p>`;
  contenedor.parentNode.insertBefore(aviso, contenedor);
}

function escaparHTMLNV1DB_(valor){
  return String(valor ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
}
