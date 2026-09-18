document.addEventListener("DOMContentLoaded", iniciarNuevaVidaParte1);

const NV1_KEY = "caminando_con_dios_nv1";

const NV1_EXAMEN = [
  { q:"Según Efesios 2:1, ¿cuál era nuestra condición antes de recibir la vida eterna?", o:["Estábamos muertos en delitos y pecados","Éramos hijos maduros de Dios","No teníamos ninguna necesidad espiritual","Ya habíamos alcanzado la vida eterna"], a:0 },
  { q:"Según Romanos 3:23, ¿ha pecado toda persona?", o:["Sí","No","Solo quienes no asisten a una iglesia","Solo quienes no conocen la Biblia"], a:0 },
  { q:"Según Efesios 2:4-5, ¿qué hizo Dios por nosotros?", o:["Nos dio vida juntamente con Cristo","Nos pidió que primero hiciéramos suficientes obras","Nos dejó resolver solos nuestra condición","Nos dio salvación por asistir a la iglesia"], a:0 },
  { q:"Según Romanos 5:8, ¿cómo muestra Dios su amor?", o:["Cristo murió por nosotros siendo aún pecadores","Nos dio riquezas materiales","Nos evitó todas las dificultades","Nos permitió salvarnos por nuestros propios méritos"], a:0 },
  { q:"Según Efesios 2:8-9, la salvación es por...", o:["Gracia por medio de la fe","Obras y asistencia religiosa","Conocimiento humano","Esfuerzo personal"], a:0 },
  { q:"Según Gálatas 3:26, ¿en quién debemos tener fe para ser hijos de Dios?", o:["En Cristo Jesús","En nuestras buenas obras","En nuestra propia capacidad","En una tradición religiosa"], a:0 },
  { q:"Según Juan 1:12, ¿qué recibe quien recibe a Cristo?", o:["El derecho de ser hijo de Dios","Una vida sin problemas","La obligación de salvarse por obras","Una promesa de riqueza"], a:0 },
  { q:"Según 2 Corintios 5:17, quien está en Cristo es...", o:["Una nueva criatura","La misma persona sin ningún cambio posible","Una persona sin necesidad de crecer","Una persona que ya no necesita obedecer a Dios"], a:0 }
];

function obtenerEstadoNV1_(){
  const usuario = typeof obtenerUsuarioComunidad === "function" ? obtenerUsuarioComunidad() : null;
  if(!usuario) return null;
  const key = NV1_KEY + "_" + (usuario.idUsuario || usuario.correo);
  try{return JSON.parse(localStorage.getItem(key) || "{}");}catch(_){return {};}
}

function guardarEstadoNV1_(estado){
  const usuario = typeof obtenerUsuarioComunidad === "function" ? obtenerUsuarioComunidad() : null;
  if(!usuario) return;
  const key = NV1_KEY + "_" + (usuario.idUsuario || usuario.correo);
  localStorage.setItem(key, JSON.stringify(estado));
}

function iniciarNuevaVidaParte1(){
 restaurarTamanoNV1_();
  const usuario = typeof obtenerUsuarioComunidad === "function" ? obtenerUsuarioComunidad() : null;
  if(!usuario){ window.location.href="comunidad.html"; return; }

  const app=document.getElementById("app");
  if(!app) return;
  const nombre=escaparNV1_(usuario.nombre || "hermano/a");
  const correo=escaparNV1_(usuario.correo || "");
  const estado=obtenerEstadoNV1_();

  app.innerHTML=`
    ${crearHeader()}
    ${crearHero()}
    <div class="nv1-page">
      <div class="nv1-wrap">
        <div class="nv1-user">
          <div class="nv1-user-avatar">👋</div>
          <div class="nv1-user-info"><strong>Hola, ${nombre}</strong><span>${correo} · Tu recorrido de discipulado es personal.</span></div>
          <button class="nv1-logout" onclick="salirNV1_()">Cerrar sesión</button>
        </div>

        <section class="nv1-hero">
          <div class="nv1-hero-copy">
            <div class="nv1-kicker">Nueva Vida en Cristo · Parte 1</div>
            <h1>¡Salvo!</h1>
            <p>Hoy no vienes solamente a contestar preguntas. Vamos a caminar juntos por los primeros pasos de esta nueva vida.</p>
            <div class="nv1-companion">
              <div class="nv1-companion-icon">🌱</div>
              <div><strong id="nv1-companion-title">Estoy aquí contigo</strong><p id="nv1-companion-text">Avanza a tu ritmo. Lee, piensa, responde y vuelve a mirar lo aprendido cuando lo necesites.</p></div>
            </div>
          </div>
          <div class="nv1-hero-image"><img src="assets/img/hero.png" alt="Caminar con Dios"></div>
        </section>

        <div class="nv1-progress">
          <div class="nv1-progress-row"><span>Tu avance en esta parte</span><strong id="nv1-progress-text">0%</strong></div>
          <div class="nv1-progress-track"><div id="nv1-progress-bar" class="nv1-progress-bar"></div></div>
        </div>

        <nav class="nv1-app-nav" aria-label="Navegación de la lección">
          <button type="button" id="nv1-nav-inicio" class="nv1-nav-btn" onclick="irInicioNV1_()">⌂ <span>Inicio</span></button>
          <button type="button" id="nv1-nav-atras" class="nv1-nav-btn" onclick="navegarNV1_(-1)">‹ <span>Atrás</span></button>
          <div class="nv1-nav-indicator"><span id="nv1-nav-step">1</span><small>de <span id="nv1-nav-total">8</span></small></div>
          <button type="button" id="nv1-nav-siguiente" class="nv1-nav-btn nv1-nav-next" onclick="navegarNV1_(1)"><span>Siguiente</span> ›</button>
        </nav>

        ${renderVerdaderoFalso_()}
        ${renderContenido_()}
        ${renderExamen_()}
        ${renderCierre_()}
      </div>
    </div>
    ${crearFooter()}
    <div id="nv1-bible-modal" class="nv1-bible-modal" onclick="cerrarBibliaNV1_(event)">
      <div class="nv1-bible-box" onclick="event.stopPropagation()">
        <button class="nv1-close" onclick="cerrarBibliaNV1_()">Cerrar</button>
        <h3 id="nv1-bible-title">Pasaje bíblico</h3>
        <div id="nv1-bible-content" class="nv1-bible-text"><div class="nv1-loading">Cargando el pasaje...</div></div>
      </div>
    </div>`;

  app.style.display="block";
  iniciarHeader(); iniciarFooter();
  restaurarNV1_();
  iniciarInteraccionesNV1_();
  iniciarNavegacionNV1_();
}

function renderVerdaderoFalso_(){
 const items=[
  ["Para ser salvo sólo necesito creer que Dios existe.","Santiago 2:19","false"],
  ["El pecado causa una separación entre Dios y el hombre.","Romanos 6:23","true"],
  ["Soy salvo por asistir a la iglesia y hacer cosas buenas.","Efesios 2:8-9","false"]
 ];
 const avatar=typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null;
 const companion=avatar?'<aside class="nv1-avatar-companion" aria-label="Acompañamiento de '+escaparNV1_(avatar.nombre)+'"><div class="nv1-avatar-bubble"><strong>'+escaparNV1_(avatar.nombre)+' piensa...</strong><p>Lee cada afirmación con calma. Este es tu punto de partida para aprender.</p></div><div class="nv1-avatar-figure"><img src="'+avatar.imagen+'" alt="'+escaparNV1_(avatar.nombre)+'"></div></aside>':'<aside class="nv1-avatar-companion nv1-avatar-companion-fallback" aria-label="Acompañamiento"><div class="nv1-avatar-bubble"><strong>Un momento para pensar</strong><p>Lee cada afirmación con calma antes de responder.</p></div></aside>';
 return `<section class="nv1-section nv1-vf-section" data-step="1">
   <div class="nv1-accessibility" aria-label="Herramientas de lectura">
     <span>Texto</span><button type="button" onclick="cambiarTamanoNV1_(-1)" aria-label="Reducir letra">A−</button><button type="button" onclick="cambiarTamanoNV1_(1)" aria-label="Aumentar letra">A+</button>
     <button type="button" class="nv1-audio-control" onclick="escucharSeccionNV1_(this)">🔊 Escuchar</button>
   </div>
   <span class="nv1-badge">Primero: descubre lo que ya sabes</span>
   <h2>Falso o Verdadero</h2>
   <p class="nv1-section-intro">Responde las <strong>tres afirmaciones</strong>. En cada una debes elegir <strong>Verdadero</strong> o <strong>Falso</strong>. La cita bíblica es apoyo para estudiar, no una tercera opción.</p>
   ${companion}
   <div class="nv1-vf-list">${items.map((x,i)=>`<article class="nv1-vf-item">
      <div class="nv1-vf-statement-wrap"><div class="nv1-vf-number">${i+1}</div><div><div class="nv1-vf-statement">${x[0]}</div><button type="button" class="nv1-ref" data-ref="${x[1]}">📖 ${x[1]} · leer apoyo</button></div></div>
      <div class="nv1-vf-options" role="group" aria-label="Responder afirmación ${i+1}">
        <label class="nv1-vf-option"><input type="radio" name="vf-${i}" value="true"><b>V</b><em>Verdadero</em></label>
        <label class="nv1-vf-option"><input type="radio" name="vf-${i}" value="false"><b>F</b><em>Falso</em></label>
      </div>
   </article>`).join("")}</div>
   <div class="nv1-actions"><button class="nv1-btn nv1-btn-secondary" onclick="guardarBloqueVF_()">Guardar mis respuestas</button></div>
   <div class="nv1-vf-note" id="nv1-vf-note">Aún no has respondido las tres afirmaciones.</div>
 </section>`;
}

function renderContenido_(){
 const bloques=[
  {titulo:"La vida pasada",intro:"Miremos primero de dónde nos sacó Dios.",preguntas:[
   [1,"Según Efesios 2:1, ¿cuál era nuestra condición antes de que Cristo nos diera la vida eterna?","Efesios 2:1"],
   [2,"Según Romanos 3:23, ¿ha pecado toda persona? Entonces, ¿cuál era la condición en que nos encontrábamos antes de que Cristo nos salvara?","Romanos 3:23"],
   [3,"La Biblia dice que estábamos condenados. ¿Por qué?","Juan 3:18"]]},
  {titulo:"La obra de Dios",intro:"Ahora observa lo que Dios hizo. La salvación no empieza con nuestros méritos, sino con su gracia.",preguntas:[
   [4,"En Efesios 2:4-5, ¿cómo se describe a Dios?","Efesios 2:4-5"],
   [5,"Según este pasaje, ¿qué ha hecho Dios por nosotros?","Efesios 2:4-5"],
   [6,"Según Romanos 5:8, ¿en qué forma nos muestra Dios su amor?","Romanos 5:8"],
   [7,"Lea Efesios 2:8-9. Dios decidió que la salvación no es por obras. ¿En cuáles obras confía la gente, creyendo que con ellas serán salvos?","Efesios 2:8-9"],
   [8,"Completa: Somos salvos por ______ por medio de la ______.","Efesios 2:8"]]},
  {titulo:"La fe que recibe a Cristo",intro:"No se trata solamente de conocer palabras. Detente, piensa y escribe con tus propias palabras.",preguntas:[
   [9,"¿En quién debemos tener fe para ser hijos de Dios?","Gálatas 3:26"],
   [10,"Diga en sus propias palabras qué es tener fe en Cristo.","Gálatas 3:26"]]},
  {titulo:"La nueva vida",intro:"La lección ahora mira hacia adelante: qué comienza a cambiar cuando una persona está en Cristo.",preguntas:[
   [11,"¿Con qué propósito vino Cristo?","Juan 10:10"],
   [12,"¿Qué ofrece Dios a quien recibe a Cristo?","Juan 1:12"],
   [13,"Según Juan 5:24, ¿qué sucede con la persona que recibe a Cristo?","Juan 5:24"],
   [14,"Según Efesios 2:10, ¿para qué somos creados en Cristo?","Efesios 2:10"],
   [15,"Lea 2 Corintios 5:17. Estar “en Cristo” significa haberlo aceptado como Salvador. Entonces, si alguno está en Cristo, ¿en qué se convierte?","2 Corintios 5:17"],
   [16,"La segunda parte del versículo 17 habla de cambios en la vida. Escriba algunos ejemplos de lo viejo y de lo nuevo.","2 Corintios 5:17"]]}
 ];
 let html="";
 bloques.forEach((b,bi)=>{
  const avatar=typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null;
  let companion="";
  if(avatar && bi===0){
    companion='<aside class="nv1-avatar-companion" aria-label="Acompañamiento de '+escaparNV1_(avatar.nombre)+'"><div class="nv1-avatar-bubble"><strong>'+escaparNV1_(avatar.nombre)+' te aconseja...</strong><p>Lee primero cada cita bíblica. Haz clic en ella para leer el pasaje y después responde con tus propias palabras.</p></div><div class="nv1-avatar-figure"><img src="'+avatar.imagen+'" alt="'+escaparNV1_(avatar.nombre)+'"></div></aside>';
  }
  if(avatar && bi===1){
    const imagenPensando=avatar.imagenPensando||avatar.imagen;
    companion='<aside class="nv1-avatar-companion nv1-avatar-thinking" aria-label="Acompañamiento de '+escaparNV1_(avatar.nombre)+'"><div class="nv1-avatar-bubble"><strong>'+escaparNV1_(avatar.nombre)+' te recuerda...</strong><p>Tus respuestas serán guardadas para revisión y evaluación. Más adelante podrás consultar tus resultados y ver qué necesitas seguir aprendiendo en tu panel de Información y Estadísticas.</p></div><div class="nv1-avatar-figure"><img src="'+imagenPensando+'" alt="'+escaparNV1_(avatar.nombre)+' pensando"></div></aside>';
  }
  html+=`<section class="nv1-section" data-step="${bi+2}"><span class="nv1-badge">Paso ${bi+1} de estudio</span><h2>${b.titulo}</h2><p class="nv1-section-intro">${b.intro}</p>${companion}`;
  b.preguntas.forEach(p=>{
    if(Number(p[0])===8){
      html+=`<div class="nv1-question nv1-fill-question"><div class="nv1-q-head"><div class="nv1-q-num">${p[0]}</div><div><h3>Completa: Somos salvos por <span class="nv1-blank-label">___</span> por medio de la <span class="nv1-blank-label">___</span>.</h3><button class="nv1-ref" data-ref="${p[2]}">📖 ${p[2]} · leer cita</button></div></div><div class="nv1-fill-boxes"><label><span>Primera palabra</span><input type="text" class="nv1-answer nv1-fill-input" data-q="8a" placeholder="Escribe aquí..."></label><label><span>Segunda palabra</span><input type="text" class="nv1-answer nv1-fill-input" data-q="8b" placeholder="Escribe aquí..."></label></div></div>`;
    }else{
      html+=`<div class="nv1-question"><div class="nv1-q-head"><div class="nv1-q-num">${p[0]}</div><div><h3>${p[1]}</h3><button class="nv1-ref" data-ref="${p[2]}">📖 ${p[2]} · leer cita</button></div></div><textarea class="nv1-answer" data-q="${p[0]}" placeholder="Escribe con tus propias palabras..."></textarea></div>`;
    }
  });
  html+=`<div class="nv1-section-guide-end"><span>✓</span><div><strong>Cuando termines las preguntas</strong><p>Revisa tus respuestas y guarda tu avance antes de continuar.</p></div></div><div class="nv1-actions"><button class="nv1-btn nv1-btn-secondary" onclick="guardarRespuestasNV1_(${bi+2})">Guardar mi avance</button></div></section>`;
 });
 return html;
}

function renderExamen_(){
 return `<section class="nv1-section" id="nv1-examen" data-step="7"><span class="nv1-badge">Desafío final · modo juego</span><h2>Reto de comprensión</h2><p class="nv1-section-intro">Ahora sí: una pequeña prueba con tiempo. El resultado queda guardado en tu recorrido para que puedas volver a verlo.</p><div class="nv1-game"><div class="nv1-game-top"><div><strong id="nv1-exam-counter">Pregunta 1 de ${NV1_EXAMEN.length}</strong><div class="nv1-game-note">No es una carrera contra otros. Es una oportunidad para ver cuánto has comprendido.</div></div><div id="nv1-timer" class="nv1-timer">05:00</div></div><div id="nv1-game-question" class="nv1-game-question"></div><div id="nv1-game-options" class="nv1-game-options"></div><div class="nv1-game-footer"><span id="nv1-game-feedback" class="nv1-game-note"></span><button id="nv1-game-next" class="nv1-btn nv1-btn-primary" onclick="siguientePreguntaNV1_()">Siguiente</button></div><div id="nv1-result" class="nv1-result" style="display:none"></div></div></section>`;
}

function renderCierre_(){
 return `<section class="nv1-section nv1-reflection" data-step="8"><span class="nv1-badge">Para cerrar</span><h2>No termina aquí</h2><p class="nv1-section-intro">El material invita a resumir lo aprendido y continuar creciendo. Tómate un momento para escribir tu propia respuesta.</p><div class="nv1-question"><div class="nv1-q-head"><div class="nv1-q-num">♥</div><div><h3>¿Cómo era mi vida sin Cristo?</h3></div></div><textarea class="nv1-answer" data-q="resumen1" placeholder="Escribe tu reflexión..."></textarea></div><div class="nv1-question"><div class="nv1-q-head"><div class="nv1-q-num">✝</div><div><h3>¿Qué hizo Cristo por mí?</h3></div></div><textarea class="nv1-answer" data-q="resumen2" placeholder="Escribe tu reflexión..."></textarea></div><div class="nv1-question"><div class="nv1-q-head"><div class="nv1-q-num">🌱</div><div><h3>¿Cómo se debe mostrar, en mi andar diario, la nueva vida que Dios me dio?</h3></div></div><textarea class="nv1-answer" data-q="resumen3" placeholder="Escribe tu reflexión..."></textarea></div><div class="nv1-question"><div class="nv1-q-head"><div class="nv1-q-num">📖</div><div><h3>Mi compromiso de crecimiento</h3><p class="nv1-section-intro">Esta semana el material propone leer Juan 1–7, un capítulo por día, y memorizar Efesios 2:8-9.</p></div></div><label class="nv1-choice"><input type="checkbox" id="nv1-compromiso"> Me comprometo a apartar tiempo para leer y orar.</label></div><div class="nv1-actions"><button class="nv1-btn nv1-btn-primary" onclick="guardarCierreNV1_()">Guardar mi cierre</button></div><div id="nv1-complete" class="nv1-complete"><h2>🌱 Has dado un paso más</h2><p>Tu avance quedó guardado en este dispositivo para tu cuenta. Puedes volver y continuar desde aquí.</p><div id="nv1-history" class="nv1-history"></div></div></section>`;
}

function obtenerSeccionesNV1_(){
 return Array.from(document.querySelectorAll(".nv1-section"));
}

function iniciarNavegacionNV1_(){
 const secciones=obtenerSeccionesNV1_();
 if(!secciones.length)return;
 const estado=obtenerEstadoNV1_()||{};
 let indice=0;
 if(Number.isInteger(estado.ultimoPaso)){
   const encontrado=secciones.findIndex(s=>Number(s.dataset.step)===Number(estado.ultimoPaso));
   if(encontrado>=0)indice=encontrado;
 }
 mostrarSeccionNV1_(indice,false);
}

function mostrarSeccionNV1_(indice,guardar=true){
 const secciones=obtenerSeccionesNV1_();
 if(!secciones.length)return;
 indice=Math.max(0,Math.min(indice,secciones.length-1));
 secciones.forEach((s,i)=>s.classList.toggle("nv1-active",i===indice));
 const actual=secciones[indice];
 const paso=Number(actual.dataset.step)||indice+1;
 const indicador=document.getElementById("nv1-nav-step");
 const total=document.getElementById("nv1-nav-total");
 if(indicador)indicador.textContent=paso;
 if(total)total.textContent=secciones.length;
 const atras=document.getElementById("nv1-nav-atras");
 const siguiente=document.getElementById("nv1-nav-siguiente");
 const inicio=document.getElementById("nv1-nav-inicio");
 if(atras)atras.disabled=indice===0;
 if(siguiente)siguiente.disabled=indice===secciones.length-1;
 if(inicio)inicio.disabled=indice===0;
 if(guardar){
   const estado=obtenerEstadoNV1_()||{};
   estado.ultimoPaso=paso;
   estado.ultimaActualizacion=new Date().toISOString();
   guardarEstadoNV1_(estado);
 }
 window.scrollTo({top:0,behavior:"smooth"});
}

function navegarNV1_(direccion){
 const secciones=obtenerSeccionesNV1_();
 if(!secciones.length)return;
 const actual=secciones.findIndex(s=>s.classList.contains("nv1-active"));
 mostrarSeccionNV1_((actual<0?0:actual)+direccion);
}

function irInicioNV1_(){
 mostrarSeccionNV1_(0);
}

function iniciarInteraccionesNV1_(){
 document.querySelectorAll(".nv1-ref").forEach(btn=>btn.addEventListener("click",()=>abrirBibliaNV1_(btn.dataset.ref)));
 document.querySelectorAll(".nv1-answer").forEach(el=>el.addEventListener("input",()=>{guardarRespuestasNV1_(0,true); actualizarProgresoNV1_();}));
 actualizarProgresoNV1_();
 iniciarExamenNV1_();
}

function restaurarNV1_(){
 const estado=obtenerEstadoNV1_();
 if(!estado) return;
 document.querySelectorAll(".nv1-answer").forEach(el=>{if(estado.respuestas&&estado.respuestas[el.dataset.q]!==undefined)el.value=estado.respuestas[el.dataset.q];});
 if(estado.compromiso) document.getElementById("nv1-compromiso").checked=true;
 if(estado.vf){
   Object.entries(estado.vf).forEach(([name,value])=>{
     const el=document.querySelector("input[name='"+name+"'][value='"+value+"']");
     if(el)el.checked=true;
   });
   const note=document.getElementById("nv1-vf-note");
   if(note)note.textContent=Object.keys(estado.vf).length===3?"✓ Las tres respuestas quedaron guardadas.":"Aún no has respondido las tres afirmaciones.";
 }
 actualizarProgresoNV1_();
 mostrarHistorialNV1_(estado);
}

function recogerRespuestasNV1_(){
 const respuestas={};
 document.querySelectorAll(".nv1-answer").forEach(el=>respuestas[el.dataset.q]=el.value);
 return respuestas;
}

function guardarRespuestasNV1_(paso, silencioso){
 const estado=obtenerEstadoNV1_()||{};
 estado.respuestas=recogerRespuestasNV1_();
 estado.ultimoPaso=paso||estado.ultimoPaso||1;
 estado.ultimaActualizacion=new Date().toISOString();
 guardarEstadoNV1_(estado);
 if(!silencioso) actualizarAcompanamientoNV1_("¡Guardado!", "Muy bien. Puedes seguir cuando estés listo/a; tu avance permanece asociado a tu cuenta en este dispositivo.");
}

function guardarBloqueVF_(){
 const estado=obtenerEstadoNV1_()||{};
 estado.vf={};
 document.querySelectorAll("input[name^='vf-']:checked").forEach(i=>{estado.vf[i.name]=i.value;});
 estado.ultimaActualizacion=new Date().toISOString();
 guardarEstadoNV1_(estado);
 const completas=Object.keys(estado.vf).length===3;
 actualizarAcompanamientoNV1_(completas?"Buen comienzo":"Aún faltan respuestas", completas?"Ya respondiste las tres afirmaciones. Ahora podemos estudiar cada una con calma.":"Recuerda responder las tres afirmaciones: en cada una elige Verdadero o Falso.");
 const note=document.getElementById("nv1-vf-note");
 if(note)note.textContent=completas?"✓ Las tres respuestas quedaron guardadas.":"Aún no has respondido las tres afirmaciones.";
 actualizarProgresoNV1_();
}

function guardarCierreNV1_(){
 guardarRespuestasNV1_(8,true);
 const estado=obtenerEstadoNV1_()||{};
 estado.compromiso=!!document.getElementById("nv1-compromiso")?.checked;
 estado.completado=true;
 estado.fechaCompletado=new Date().toISOString();
 guardarEstadoNV1_(estado);
 document.getElementById("nv1-complete").classList.add("show");
 mostrarHistorialNV1_(estado);
 actualizarAcompanamientoNV1_("Este paso queda en tu historia", "Has terminado la experiencia de la Parte 1. El próximo paso será seguir creciendo, no solamente marcar una casilla.");
 actualizarProgresoNV1_();
}

function actualizarProgresoNV1_(){
 const estado=obtenerEstadoNV1_()||{};
 const respuestas=estado.respuestas||{};
 const campos=Object.keys(respuestas).filter(k=>String(respuestas[k]||"").trim());
 const total=19;
 let completados=Math.min(campos.length,16);
 if(estado.vf && Object.keys(estado.vf).length===3) completados+=1;
 if(estado.examen && estado.examen.length) completados+=1;
 if(estado.completado) completados=total;
 const pct=Math.round(Math.min(100,(completados/total)*100));
 const bar=document.getElementById("nv1-progress-bar"),txt=document.getElementById("nv1-progress-text");
 if(bar)bar.style.width=pct+"%"; if(txt)txt.textContent=pct+"%";
}

let nv1ExamIndex=0,nv1ExamAnswers=[],nv1ExamSeconds=300,nv1ExamTimer=null,nv1ExamStarted=false;
function iniciarExamenNV1_(){
 document.getElementById("nv1-game-question").textContent=NV1_EXAMEN[0].q;
 renderOpcionesExamenNV1_();
}
function iniciarRelojNV1_(){
 if(nv1ExamStarted)return; nv1ExamStarted=true;
 nv1ExamTimer=setInterval(()=>{nv1ExamSeconds--; actualizarRelojNV1_(); if(nv1ExamSeconds<=0){clearInterval(nv1ExamTimer); finalizarExamenNV1_();}},1000);
}
function actualizarRelojNV1_(){const m=Math.floor(nv1ExamSeconds/60).toString().padStart(2,"0"),s=(nv1ExamSeconds%60).toString().padStart(2,"0");const el=document.getElementById("nv1-timer");if(el)el.textContent=`${m}:${s}`;}
function renderOpcionesExamenNV1_(){
 const q=NV1_EXAMEN[nv1ExamIndex];
 document.getElementById("nv1-exam-counter").textContent=`Pregunta ${nv1ExamIndex+1} de ${NV1_EXAMEN.length}`;
 document.getElementById("nv1-game-question").textContent=q.q;
 document.getElementById("nv1-game-options").innerHTML=q.o.map((x,i)=>`<button class="nv1-game-option" onclick="seleccionarExamenNV1_(${i})">${String.fromCharCode(65+i)}. ${x}</button>`).join("");
 document.getElementById("nv1-game-feedback").textContent="";
 document.getElementById("nv1-game-next").textContent=nv1ExamIndex===NV1_EXAMEN.length-1?"Ver resultado":"Siguiente";
}
function seleccionarExamenNV1_(i){iniciarRelojNV1_();nv1ExamAnswers[nv1ExamIndex]=i;document.querySelectorAll(".nv1-game-option").forEach((b,idx)=>b.classList.toggle("selected",idx===i));}
function siguientePreguntaNV1_(){
 if(nv1ExamAnswers[nv1ExamIndex]===undefined){document.getElementById("nv1-game-feedback").textContent="Primero elige una respuesta.";return;}
 if(nv1ExamIndex<NV1_EXAMEN.length-1){nv1ExamIndex++;renderOpcionesExamenNV1_();return;}
 finalizarExamenNV1_();
}
function finalizarExamenNV1_(){
 if(nv1ExamTimer)clearInterval(nv1ExamTimer);
 let score=0; NV1_EXAMEN.forEach((q,i)=>{if(nv1ExamAnswers[i]===q.a)score++;});
 const estado=obtenerEstadoNV1_()||{}; estado.examen=estado.examen||[];
 estado.examen.unshift({fecha:new Date().toISOString(),score,total:NV1_EXAMEN.length,segundosUsados:300-nv1ExamSeconds}); estado.examen=estado.examen.slice(0,5); guardarEstadoNV1_(estado);
 const r=document.getElementById("nv1-result");r.style.display="block";r.innerHTML=`<div class="nv1-score">${score}/${NV1_EXAMEN.length}</div><p>${mensajeResultadoNV1_(score)}</p><div class="nv1-history">${estado.examen.map(e=>`<div class="nv1-history-item"><span>${new Date(e.fecha).toLocaleDateString("es-NI")}</span><strong>${e.score}/${e.total}</strong></div>`).join("")}</div>`;
 document.getElementById("nv1-game-feedback").textContent="Resultado guardado."; actualizarProgresoNV1_();
}
function mensajeResultadoNV1_(s){if(s===8)return"¡Excelente! Has comprendido muy bien las ideas principales de esta parte.";if(s>=6)return"Muy buen trabajo. Revisa las respuestas y vuelve a intentarlo cuando quieras.";if(s>=4)return"Vas avanzando. Usa los pasajes bíblicos para volver sobre los puntos que te costaron.";return"No te desanimes. El propósito es aprender y crecer; puedes volver a estudiar y repetir el reto.";}
function mostrarHistorialNV1_(estado){const el=document.getElementById("nv1-history");if(!el||!estado.examen)return;el.innerHTML=estado.examen.map(e=>`<div class="nv1-history-item"><span>${new Date(e.fecha).toLocaleDateString("es-NI")}</span><strong>${e.score}/${e.total}</strong></div>`).join("");}
function actualizarAcompanamientoNV1_(titulo,texto){const a=document.getElementById("nv1-companion-title"),b=document.getElementById("nv1-companion-text");if(a)a.textContent=titulo;if(b)b.textContent=texto;}

async function abrirBibliaNV1_(referencia){
 const modal=document.getElementById("nv1-bible-modal"),title=document.getElementById("nv1-bible-title"),content=document.getElementById("nv1-bible-content");
 modal.classList.add("open");title.textContent=referencia;content.innerHTML='<div class="nv1-loading">Buscando la cita bíblica...</div>';
 try{
   const ultimoEspacio=referencia.lastIndexOf(" ");
   if(ultimoEspacio===-1)throw new Error("Referencia no válida.");
   const libro=referencia.substring(0,ultimoEspacio).trim();
   const cita=referencia.substring(ultimoEspacio+1).trim();
   const partesCita=cita.split(":");
   const capitulo=parseInt(partesCita[0],10);
   if(!libro || !Number.isInteger(capitulo))throw new Error("Referencia no válida.");
   const codigo=obtenerCodigoLibro(libro);
   if(!codigo)throw new Error("Libro no reconocido.");
   const datos=await obtenerCapituloBiblia(codigo,capitulo);
   const versos=(datos&&datos.versiculos)||[];
   let seleccion=versos;
   if(partesCita.length>1){
     const rango=partesCita[1].split("-");
     const inicio=parseInt(rango[0],10);
     const fin=parseInt(rango[1]||rango[0],10);
     if(Number.isInteger(inicio)){
       seleccion=versos.filter(v=>{
         const n=parseInt(v.numero,10);
         return n>=inicio && n<=fin;
       });
     }
   }
   const texto=seleccion.map(v=>v.texto).join("\n\n");
   content.textContent=texto||"La cita fue consultada, pero no devolvió texto visible.";
 }catch(e){content.textContent="No fue posible mostrar la cita ahora. La referencia queda disponible para consultarla en la Biblia.";}
}
function cerrarBibliaNV1_(event){if(event&&event.target!==event.currentTarget)return;document.getElementById("nv1-bible-modal")?.classList.remove("open");}
function salirNV1_(){if(typeof cerrarSesionComunidad==="function")cerrarSesionComunidad();else localStorage.removeItem("caminando_con_dios_comunidad_usuario");window.location.href="comunidad.html";}
function escaparNV1_(v){return String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");}


function cambiarTamanoNV1_(delta){
 const actual=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nv1-font-scale"))||1;
 const nuevo=Math.min(1.3,Math.max(.9,actual+delta*.1));
 document.documentElement.style.setProperty("--nv1-font-scale",nuevo);
 try{localStorage.setItem("nv1_font_scale",String(nuevo));}catch(_){}
}
function restaurarTamanoNV1_(){
 try{const v=parseFloat(localStorage.getItem("nv1_font_scale"));if(v)document.documentElement.style.setProperty("--nv1-font-scale",Math.min(1.3,Math.max(.9,v)));}catch(_){}
}
function escucharSeccionNV1_(boton){
 const seccion=boton.closest(".nv1-section");if(!seccion||!window.speechSynthesis)return;
 window.speechSynthesis.cancel();
 const clone=seccion.cloneNode(true);
 clone.querySelectorAll("button,input").forEach(x=>x.remove());
 const texto=(clone.innerText||"").replace(/\s+/g," ").trim();
 const u=new SpeechSynthesisUtterance(texto);u.lang="es-ES";u.rate=.9;
 const voz=window.speechSynthesis.getVoices().find(v=>/^es(-|_)/i.test(v.lang));if(voz)u.voice=voz;
 boton.textContent="⏸ Detener";u.onend=()=>boton.textContent="🔊 Escuchar";u.onerror=()=>boton.textContent="🔊 Escuchar";
 window.speechSynthesis.speak(u);
}
