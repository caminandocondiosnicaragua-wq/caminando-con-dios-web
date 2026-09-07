/*
 * CAMINANDO CON DIOS
 * NUEVA VIDA · PARTE 1 · CONTENIDO DINÁMICO
 *
 * Primera etapa de conexión:
 * Lee CONTENIDO-NUEVA VIDA a través de la API existente.
 *
 * Todavía NO guarda respuestas en Notion.
 * Todavía NO modifica progreso en USUARIOS.
 */

document.addEventListener("DOMContentLoaded", cargarContenidoNuevaVidaParte1_);

async function cargarContenidoNuevaVidaParte1_(){
  const contenedor = document.querySelector('.nv1-section[data-step="2"]');
  const examen = document.getElementById("nv1-examen");

  if(!contenedor || !examen){
    return;
  }

  try{
    const url = CONFIG.API.url + "?coleccion=contenidoNuevaVida";
    const respuesta = await fetch(url, { method: "GET" });

    if(!respuesta.ok){
      throw new Error("La API respondió con HTTP " + respuesta.status);
    }

    const datos = await respuesta.json();

    if(!Array.isArray(datos)){
      throw new Error("La API no devolvió una lista de contenido.");
    }

    const contenido = datos
      .filter(registro => {
        return String(registro.Parte || "").trim() === "Parte 1"
          && Number(registro.Paso) === 1;
      })
      .sort((a,b) => Number(a.Orden || 0) - Number(b.Orden || 0));

    if(!contenido.length){
      throw new Error("No se encontró contenido para Parte 1 · Paso 1.");
    }

    const fragmento = document.createDocumentFragment();
    const secciones = agruparPorSeccionNV1_(contenido);
    let indiceSeccion = 0;

    Object.keys(secciones).forEach(nombreSeccion => {
      const registros = secciones[nombreSeccion];
      const seccion = document.createElement("section");
      seccion.className = "nv1-section";
      seccion.dataset.step = String(indiceSeccion + 2);
      indiceSeccion++;

      seccion.innerHTML = `
        <span class="nv1-badge">Contenido del estudio</span>
        <h2>${escaparHTMLNV1DB_(nombreSeccion || "Nueva Vida en Cristo")}</h2>
        <p class="nv1-section-intro">Este contenido proviene de la base <strong>CONTENIDO-NUEVA VIDA</strong>.</p>
        <div class="nv1-db-content"></div>
      `;

      const cuerpo = seccion.querySelector(".nv1-db-content");
      registros.forEach(registro => {
        cuerpo.appendChild(crearBloqueContenidoNV1_(registro));
      });

      const acciones = document.createElement("div");
      acciones.className = "nv1-actions";
      acciones.innerHTML = `<button class="nv1-btn nv1-btn-secondary" onclick="guardarRespuestasNV1_(0,false)">Guardar mi avance</button>`;
      seccion.appendChild(acciones);

      fragmento.appendChild(seccion);
    });

    const seccionesAnteriores = document.querySelectorAll('.nv1-section[data-step="2"], .nv1-section[data-step="3"], .nv1-section[data-step="4"], .nv1-section[data-step="5"]');
    seccionesAnteriores.forEach(seccion => seccion.remove());

    examen.parentNode.insertBefore(fragmento, examen);

    iniciarInteraccionesContenidoNV1DB_();
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

function crearBloqueContenidoNV1_(registro){
  const tipo = String(registro.Tipo || "").trim().toLowerCase();
  const texto = String(registro.Texto || "").trim();
  const cita = String(registro["Cita Bíblica"] || "").trim();
  const numero = registro.Número !== undefined && registro.Número !== null
    ? String(registro.Número).trim()
    : "";

  const bloque = document.createElement("div");
  bloque.className = "nv1-db-item";

  if(tipo === "pregunta"){
    bloque.classList.add("nv1-question");
    bloque.innerHTML = `
      <div class="nv1-q-head">
        <div class="nv1-q-num">${escaparHTMLNV1DB_(numero || "?")}</div>
        <div>
          <h3>${escaparHTMLNV1DB_(texto)}</h3>
          ${crearCitaNV1DB_(cita)}
        </div>
      </div>
      <textarea class="nv1-answer" data-q="${escaparHTMLNV1DB_(numero)}" placeholder="Escribe con tus propias palabras..."></textarea>
    `;
    return bloque;
  }

  if(tipo === "versiculo"){
    bloque.classList.add("nv1-db-verse");
    bloque.innerHTML = `
      <div class="nv1-db-label">Versículo</div>
      <p>${escaparHTMLNV1DB_(texto)}</p>
      ${crearCitaNV1DB_(cita)}
    `;
    return bloque;
  }

  if(tipo === "bienvenida"){
    bloque.classList.add("nv1-db-welcome");
  }else if(tipo === "enseñanza"){
    bloque.classList.add("nv1-db-teaching");
  }else if(tipo === "ejercicio"){
    bloque.classList.add("nv1-db-exercise");
  }else if(tipo === "reflexion"){
    bloque.classList.add("nv1-db-reflection");
  }

  bloque.innerHTML = `
    <div class="nv1-db-label">${escaparHTMLNV1DB_(registro.Tipo || "Contenido")}</div>
    <p>${escaparHTMLNV1DB_(texto)}</p>
    ${crearCitaNV1DB_(cita)}
  `;

  return bloque;
}

function crearCitaNV1DB_(cita){
  if(!cita) return "";
  return `<button type="button" class="nv1-ref" data-ref="${escaparHTMLNV1DB_(cita)}">📖 ${escaparHTMLNV1DB_(cita)}</button>`;
}

function iniciarInteraccionesContenidoNV1DB_(){
  document.querySelectorAll(".nv1-ref").forEach(btn => {
    btn.addEventListener("click", () => abrirBibliaNV1_(btn.dataset.ref));
  });

  document.querySelectorAll(".nv1-answer").forEach(el => {
    el.addEventListener("input", () => {
      guardarRespuestasNV1_(0, true);
      actualizarProgresoNV1_();
    });
  });
}

function mostrarErrorContenidoNV1DB_(contenedor, mensaje){
  const aviso = document.createElement("div");
  aviso.className = "nv1-db-error";
  aviso.innerHTML = `
    <strong>No pudimos cargar el contenido desde la base de datos.</strong>
    <p>${escaparHTMLNV1DB_(mensaje || "Error desconocido")}</p>
    <p>El contenido provisional se mantiene visible para no dejar la página vacía.</p>
  `;
  contenedor.parentNode.insertBefore(aviso, contenedor);
}

function escaparHTMLNV1DB_(valor){
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
