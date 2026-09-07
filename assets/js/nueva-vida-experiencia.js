/* CAMINANDO CON DIOS · NUEVA VIDA · CAPA VISUAL E INTERACTIVA */
(function(){
  const FONT_KEY="nv1_font_scale";
  const DATE_KEY="nv1_commitment_date";
  const VF_TEXTOS=["Para ser salvo sólo necesito creer que Dios existe.","El pecado causa una separación entre Dios y el hombre.","Soy salvo por asistir a la iglesia y hacer cosas buenas."];
  document.addEventListener("DOMContentLoaded",iniciarExperienciaNV1_);

  function iniciarExperienciaNV1_(){
    prepararVF_(); eliminarDuplicadosVF_(); mejorarTarjetas_(); agregarAccesibilidad_(); agregarAudio_(); agregarCamposDeEjercicio_(); agregarImagenesSecciones_(); transformarEnsenanzas_(); mejorarExamen_(); instalarBibliaExacta_(); aplicarEscalaGuardada_();
  }

  function prepararVF_(){
    const seccion=document.querySelector('.nv1-section[data-step="1"]'); if(!seccion)return;
    seccion.classList.add("nv1-vf-section");
    seccion.querySelectorAll('.nv1-choice').forEach((label,i)=>{
      const input=label.querySelector('input[type="radio"]'); if(!input)return;
      const texto=VF_TEXTOS[i]||label.querySelector('span')?.textContent?.trim()||"";
      label.classList.add("nv1-vf-choice");
      label.innerHTML=`<span class="nv1-vf-statement">${escapeHTML_(texto)}</span><span class="nv1-vf-options"><span class="nv1-vf-option"><input type="radio" name="vf-${i}" value="true"><b>V</b><em>Verdadero</em></span><span class="nv1-vf-option"><input type="radio" name="vf-${i}" value="false"><b>F</b><em>Falso</em></span></span>`;
    });
  }

  function eliminarDuplicadosVF_(){
    const normalizar=t=>String(t||"").replace(/\s+/g," ").trim().toLowerCase();
    const claves=new Set(VF_TEXTOS.map(normalizar));
    document.querySelectorAll('.nv1-section:not([data-step="1"]) .nv1-question').forEach(card=>{if(claves.has(normalizar(card.querySelector("h3")?.textContent)))card.remove();});
  }

  function mejorarTarjetas_(){
    document.querySelectorAll(".nv1-db-item").forEach(item=>{
      item.classList.add("nv1-media-card"); const label=item.querySelector(".nv1-db-label"); if(!label)return;
      const tipo=label.textContent.toLowerCase();
      if(tipo.includes("enseñanza"))label.insertAdjacentHTML("afterbegin","<span class=\"nv1-card-symbol\">💡</span>");
      if(tipo.includes("ejercicio"))label.insertAdjacentHTML("afterbegin","<span class=\"nv1-card-symbol\">🎯</span>");
      if(tipo.includes("reflex"))label.insertAdjacentHTML("afterbegin","<span class=\"nv1-card-symbol\">💭</span>");
      if(tipo.includes("bienvenida"))label.insertAdjacentHTML("afterbegin","<span class=\"nv1-card-symbol\">🌱</span>");
    });
  }

  function transformarEnsenanzas_(){
    document.querySelectorAll(".nv1-db-teaching").forEach(card=>{
      if(card.querySelector(".nv1-step-list"))return; const p=card.querySelector("p"); if(!p)return;
      const texto=p.textContent.trim(); const partes=texto.split(/(?=\d+\.\s)/).map(x=>x.trim()).filter(Boolean); const pasos=partes.length>1?partes:[texto];
      const wrap=document.createElement("div"); wrap.className="nv1-step-list";
      pasos.forEach((paso,i)=>{const m=paso.match(/^\d+\.\s*(.*)$/s); const el=document.createElement("div"); el.className="nv1-step-card"; el.innerHTML=`<span>${i+1}</span><p>${escapeHTML_(m?m[1]:paso)}</p>`; wrap.appendChild(el);});
      p.replaceWith(wrap);
      const img=document.createElement("img"); img.className="nv1-card-art"; img.src="assets/img/nueva-vida/ensenanza.svg"; img.alt="Ilustración para acompañar la enseñanza"; card.prepend(img);
    });
    document.querySelectorAll(".nv1-db-reflection").forEach(card=>{if(card.querySelector(".nv1-card-art"))return;const img=document.createElement("img");img.className="nv1-card-art nv1-card-art-reflection";img.src="assets/img/nueva-vida/reflexion.svg";img.alt="Persona en un momento de reflexión";card.prepend(img);});
  }

  function agregarAccesibilidad_(){
    const progress=document.querySelector(".nv1-progress"); if(!progress||document.getElementById("nv1-accessibility"))return;
    const bar=document.createElement("div"); bar.id="nv1-accessibility"; bar.className="nv1-accessibility"; bar.innerHTML=`<span>🔎 Tamaño de texto</span><button type="button" data-font="minus" aria-label="Reducir letra">A−</button><button type="button" data-font="normal" aria-label="Tamaño normal">A</button><button type="button" data-font="plus" aria-label="Agrandar letra">A+</button>`; progress.after(bar);
    bar.querySelector('[data-font="minus"]').onclick=()=>cambiarEscala_(-1); bar.querySelector('[data-font="normal"]').onclick=()=>establecerEscala_(1); bar.querySelector('[data-font="plus"]').onclick=()=>cambiarEscala_(1);
  }
  function obtenerEscala_(){return Number(localStorage.getItem(FONT_KEY)||"1");}
  function establecerEscala_(valor){const escala=Math.max(.9,Math.min(1.3,Number(valor)));localStorage.setItem(FONT_KEY,String(escala));aplicarEscalaGuardada_();}
  function cambiarEscala_(delta){establecerEscala_(obtenerEscala_()+delta*.1);}
  function aplicarEscalaGuardada_(){document.documentElement.style.setProperty("--nv1-font-scale",obtenerEscala_());}

  function agregarAudio_(){
    document.querySelectorAll(".nv1-section,.nv1-db-item,.nv1-question").forEach(card=>{
      if(card.classList.contains("nv1-question")&&card.closest(".nv1-game"))return; if(card.querySelector(":scope > .nv1-audio-control"))return;
      const texto=extraerTextoParaAudio_(card); if(!texto)return;
      card.querySelectorAll(":scope > .nv1-audio-placeholder").forEach(e=>e.remove());
      const boton=document.createElement("button"); boton.type="button"; boton.className="nv1-audio-control"; boton.innerHTML="🔊 Escuchar"; boton.addEventListener("click",()=>reproducirTexto_(texto,boton));
      const destino=card.querySelector(":scope > .nv1-section-companion")||card.querySelector(":scope > .nv1-db-content")||card.querySelector(":scope > .nv1-actions"); if(destino)destino.before(boton);else card.appendChild(boton);
    });
  }
  function extraerTextoParaAudio_(card){const clone=card.cloneNode(true);clone.querySelectorAll("button,textarea,input,.nv1-audio-control,.nv1-actions,.nv1-wizard-nav").forEach(e=>e.remove());return clone.innerText?.replace(/\s+/g," ").trim()||"";}
  function reproducirTexto_(texto,boton){if(!("speechSynthesis"in window)){boton.textContent="🔊 Audio no disponible";return;}speechSynthesis.cancel();const voz=new SpeechSynthesisUtterance(texto);voz.lang=document.documentElement.lang||"es-ES";voz.rate=.92;boton.textContent="⏸ Detener";voz.onend=voz.onerror=()=>{boton.textContent="🔊 Escuchar";};speechSynthesis.speak(voz);}

  function agregarCamposDeEjercicio_(){
    document.querySelectorAll(".nv1-db-exercise").forEach(card=>{
      if(card.querySelector(".nv1-date-input"))return; if(!/fecha\s*:/i.test(card.textContent||""))return;
      const wrap=document.createElement("label");wrap.className="nv1-date-wrap";wrap.innerHTML=`📅 <span>Fecha de mi compromiso</span><input class="nv1-date-input" type="date">`;
      const action=card.querySelector(".nv1-exercise-action");if(action)action.before(wrap);else card.appendChild(wrap);
      const usuario=typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null; const key=DATE_KEY+"_"+(usuario?.idUsuario||usuario?.correo||"anon"); const guardada=localStorage.getItem(key); if(guardada)wrap.querySelector("input").value=guardada;
      wrap.querySelector("input").addEventListener("change",e=>localStorage.setItem(key,e.target.value));
    });
  }

  function agregarImagenesSecciones_(){
    document.querySelectorAll(".nv1-section").forEach(section=>{
      if(section.querySelector(":scope > .nv1-section-art"))return; const titulo=(section.querySelector("h2")?.textContent||"").toLowerCase(); let src="",alt="";
      if(titulo.includes("obra")||titulo.includes("enseñanza")){src="assets/img/nueva-vida/ensenanza.svg";alt="Ilustración sobre aprender y crecer en la fe";}else if(titulo.includes("reflex")||titulo.includes("resum")){src="assets/img/nueva-vida/reflexion.svg";alt="Momento de reflexión";}else return;
      const art=document.createElement("div");art.className="nv1-section-art";art.innerHTML=`<img src="${src}" alt="${alt}">`;const visual=section.querySelector(":scope > .nv1-section-visual");if(visual)visual.after(art);else section.querySelector("h2")?.after(art);
    });
  }

  function mejorarExamen_(){
    const opciones=document.getElementById("nv1-game-options");if(!opciones)return;let ocupado=false;
    const barajar=()=>{
      if(ocupado)return;const botones=Array.from(opciones.querySelectorAll(".nv1-game-option"));if(botones.length!==4)return;ocupado=true;observer.disconnect();
      const estado=botones.map(b=>({node:b,text:b.textContent.replace(/^[A-D]\.\s*/,"").trim(),onclick:b.getAttribute("onclick")}));
      for(let i=estado.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[estado[i],estado[j]]=[estado[j],estado[i]];}
      opciones.innerHTML="";estado.forEach((item,i)=>{item.node.textContent=`${String.fromCharCode(65+i)}. ${item.text}`;if(item.onclick)item.node.setAttribute("onclick",item.onclick);opciones.appendChild(item.node);});
      ocupado=false;observer.observe(opciones,{childList:true});
    };
    const observer=new MutationObserver(()=>{if(!ocupado)barajar();});observer.observe(opciones,{childList:true});setTimeout(barajar,80);
  }

  function instalarBibliaExacta_(){
    if(typeof obtenerCapituloBiblia!=="function"||typeof obtenerCodigoLibro!=="function")return;
    window.abrirBibliaNV1_=async function(referencia){
      const modal=document.getElementById("nv1-bible-modal"),title=document.getElementById("nv1-bible-title"),content=document.getElementById("nv1-bible-content");if(!modal||!title||!content)return;
      modal.classList.add("open");title.textContent=referencia;content.innerHTML='<div class="nv1-loading">Cargando el pasaje exacto...</div>';
      try{const parsed=parsearReferenciaVersiculos_(referencia);if(!parsed)throw new Error("Referencia no reconocida");const datos=await obtenerCapituloBiblia(parsed.codigo,parsed.capitulo);const versos=Array.isArray(datos?.versiculos)?datos.versiculos:[];const seleccion=versos.filter(v=>Number(v.numero)>=parsed.inicio&&Number(v.numero)<=parsed.fin);if(!seleccion.length)throw new Error("No se encontraron los versículos solicitados");content.innerHTML=seleccion.map(v=>`<p><strong>${escapeHTML_(v.numero)}.</strong> ${escapeHTML_(v.texto)}</p>`).join("");}catch(error){console.error("Biblia NV1:",error);content.innerHTML=`<div class="nv1-bible-error"><strong>No pudimos mostrar este pasaje.</strong><p>La referencia es <b>${escapeHTML_(referencia)}</b>. Puedes intentarlo nuevamente desde el lector bíblico.</p></div>`;}
    };
  }
  function parsearReferenciaVersiculos_(referencia){const m=String(referencia||"").trim().match(/^(.*?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/);if(!m)return null;const libro=m[1].trim(),codigo=obtenerCodigoLibro(libro);if(!codigo)return null;const capitulo=Number(m[2]),inicio=Number(m[3]||1),fin=Number(m[4]||inicio);return{libro,codigo,capitulo,inicio,fin};}
  function escapeHTML_(valor){return String(valor??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");}
})();
