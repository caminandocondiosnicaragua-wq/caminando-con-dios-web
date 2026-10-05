const KEY="caminando_con_dios_nv1_paso_2";
const EXAM=[
["Según Efesios 2:1, ¿cuál era nuestra condición antes de recibir la vida eterna?",["Estábamos muertos en delitos y pecados","Éramos hijos maduros de Dios","No teníamos ninguna necesidad espiritual","Ya habíamos alcanzado la vida eterna"],0],
["Según Romanos 3:23, ¿ha pecado toda persona?",["Sí","No","Solo quienes no asisten a una iglesia","Solo quienes no conocen la Biblia"],0],
["Según Efesios 2:4-5, ¿qué hizo Dios por nosotros?",["Nos dio vida juntamente con Cristo","Nos pidió que primero hiciéramos suficientes obras","Nos dejó resolver solos nuestra condición","Nos dio salvación por asistir a la iglesia"],0],
["Según Romanos 5:8, ¿cómo muestra Dios su amor?",["Cristo murió por nosotros siendo aún pecadores","Nos dio riquezas materiales","Nos evitó todas las dificultades","Nos permitió salvarnos por nuestros propios méritos"],0],
["Según Efesios 2:8-9, la salvación es por...",["Gracia por medio de la fe","Obras y asistencia religiosa","Conocimiento humano","Esfuerzo personal"],0],
["Según Gálatas 3:26, ¿en quién debemos tener fe para ser hijos de Dios?",["En Cristo Jesús","En nuestras buenas obras","En nuestra propia capacidad","En una tradición religiosa"],0],
["Según Juan 1:12, ¿qué recibe quien recibe a Cristo?",["El derecho de ser hijo de Dios","Una vida sin problemas","La obligación de salvarse por obras","Una promesa de riqueza"],0],
["Según 2 Corintios 5:17, quien está en Cristo es...",["Una nueva criatura","La misma persona sin ningún cambio posible","Una persona sin necesidad de crecer","Una persona que ya no necesita obedecer a Dios"],0]
];
let data=[],groups=[],index=0,answers=[],examIndex=0,examAnswers=[],seconds=300,timer=null;

if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init)}else{init()}

function user(){return typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null}
function avatar(){return typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null}
function esc(v){const d=document.createElement("div");d.textContent=String(v??"");return d.innerHTML}
function state(){const u=user();try{return JSON.parse(localStorage.getItem(KEY+"_"+(u.idUsuario||u.correo))||"{}")}catch(_){return {}}}
function save(s){const u=user();try{localStorage.setItem(KEY+"_"+(u.idUsuario||u.correo),JSON.stringify(s))}catch(_){}}
function paso1Terminado(){const u=user();try{return JSON.parse(localStorage.getItem("caminando_con_dios_nv1_"+(u.idUsuario||u.correo))||"{}").completado===true}catch(_){return false}}

async function init(){
 const u=user();
 if(!u){location.href="comunidad.html";return}
 if(!paso1Terminado()){bloqueo();return}
 renderBase(u);
 try{
  const r=await fetch(CONFIG.API.url+"?coleccion=contenidoNuevaVida");
  const all=await r.json();
  data=all.filter(x=>String(x.Parte||"").trim()==="Parte 1"&&Number(x.Paso)===2).sort((a,b)=>(a.Orden||0)-(b.Orden||0));
  const map={};
  data.forEach(x=>(map[x.Seccion||"Contenido"]??=[]).push(x));
  groups=Object.entries(map);
  render();
  show(0);
 }catch(e){document.getElementById("content").innerHTML="<div class='nv2-error'>No se pudo cargar el contenido del Paso 2.</div>"}
}

function bloqueo(){
 document.getElementById("app").innerHTML=crearHeader()+"<div class='nv2-page'><div class='nv2-locked'><h2>🔒 Paso 2 bloqueado</h2><p>Primero debes completar el Paso 1 para continuar.</p><button class='nv2-btn nv2-primary' onclick='location.href=&quot;nueva-vida-parte-1-paso-1.html&quot;'>Ir al Paso 1</button></div></div>";
 iniciarHeader();
}

function renderBase(u){
 const a=avatar();
 const userAvatar=a?"<img src='"+esc(a.imagen)+"' alt='"+esc(a.nombre)+"'>":"👋";
 const big=a?"<div class='nv2-avatar'><img src='"+esc(a.imagen)+"' alt='"+esc(a.nombre)+"'></div>":"";
 document.getElementById("app").innerHTML=crearHeader()+crearHero()+`
 <div class="nv2-page"><div class="nv2-wrap">
  <div class="nv2-user"><div class="nv2-user-avatar">${userAvatar}</div><div class="nv2-user-info"><strong>Hola, ${esc(u.nombre||"hermano/a")}</strong><span>${esc(u.correo||"")} · Tu recorrido de discipulado es personal.</span></div><button class="nv2-logout" onclick="salir()">Cerrar sesión</button></div>
  <section class="nv2-hero"><div class="nv2-hero-copy"><div class="nv2-kicker">Nueva Vida en Cristo · Parte 1 · Paso 2</div><h1>¡Seguro!</h1><p>Aprenderás sobre la seguridad de tu salvación, la vida eterna y cómo Dios te sostiene en Cristo.</p><div class="nv2-companion">${big}<div class="nv2-bubble"><strong id="avatar-title">Estoy aquí contigo</strong><p id="avatar-text">Lee, medita, responde y avanza a tu ritmo.</p></div></div></div><div class="nv2-hero-image"><img src="assets/img/hero.png" alt="Caminar con Dios"></div></section>
  <div class="nv2-progress"><div class="nv2-progress-row"><span>Tu avance en Paso 2</span><strong id="pct">0%</strong></div><div class="nv2-track"><div id="bar" class="nv2-bar"></div></div></div>
  <nav class="nv2-nav"><button id="back" onclick="show(index-1)">← Atrás</button><div class="nv2-nav-center"><small>Paso 2</small><strong id="title">Cargando...</strong></div><button id="next" onclick="show(index+1)">Siguiente →</button></nav>
  <div id="content"></div>
 </div></div>${crearFooter()}
 <div id="modal" class="nv2-bible-modal" onclick="closeBib(event)"><div class="nv2-bible-box" onclick="event.stopPropagation()"><button class="nv2-close" onclick="closeBib()">Cerrar</button><h3 id="bt"></h3><div id="bc" class="nv2-bible-text"></div></div></div>`;
 iniciarHeader();iniciarFooter();
}
function render(){
 const a=avatar();
 let html=groups.map((g,i)=>"<section class='nv2-section' data-i='"+i+"'><div class='nv2-section-head'><div class='nv2-section-icon'>"+icon(g[0])+"</div><div><h2>"+esc(g[0])+"</h2><p class='nv2-section-intro'>Lee, piensa y responde con tus propias palabras.</p></div></div>"+
 (a?"<div class='nv2-avatar-companion'><img src='"+esc(a.imagen)+"'><div class='nv2-avatar-bubble'><strong>"+esc(a.nombre)+" te acompaña</strong><span>Estoy aquí contigo. Avanza con calma.</span></div></div>":"")+
 g[1].map(block).join("")+"<div class='nv2-actions'><button class='nv2-btn nv2-secondary' onclick='saveAnswers()'>💾 Guardar mi avance</button></div></section>").join("");
 html+="<section class='nv2-section' data-i='"+groups.length+"'><div class='nv2-section-head'><div class='nv2-section-icon'>🏆</div><div><h2>Evaluación final</h2><p class='nv2-section-intro'>La evaluación conserva la misma estructura y escala.</p></div></div><div id='exam' class='nv2-exam'></div></section>";
 document.getElementById("content").innerHTML=html;
 document.querySelectorAll(".nv2-ref").forEach(b=>b.onclick=()=>bib(b.dataset.ref));
 document.querySelectorAll(".nv2-answer").forEach(x=>x.oninput=progress);
 exam();
}

function icon(s){s=String(s).toLowerCase();if(s.includes("evaluacion"))return"📝";if(s.includes("seguridad"))return"🛡️";if(s.includes("mensaje"))return"💬";if(s.includes("reflex"))return"💭";if(s.includes("advertencia"))return"⚠️";if(s.includes("ejercicio"))return"🙏";if(s.includes("crecer"))return"🌱";return"📖"}

function block(r){
 const t=String(r.Tipo||"").toLowerCase(),q=t==="pregunta"||t==="reflexion",c=String(r["Cita Bíblica"]||"");
 const meta="paso='2' data-titulo='Seguro' data-seccion='"+esc(r.Seccion||"")+"' data-numero='"+esc(r.Número||"")+"' data-pregunta='"+esc(r.Texto||"")+"' data-parte='Parte 1'";
 if(q)return "<article class='nv2-item nv2-question' data-answerable='1' "+meta+"><div class='nv2-q-head'><div class='nv2-q-num'>"+esc(r.Número||"?")+"</div><div><span class='nv2-item-label'>✍️ "+(t==="reflexion"?"Reflexiona":"Pregunta")+"</span><h3>"+esc(r.Texto)+"</h3>"+(c?"<button class='nv2-ref' data-ref='"+esc(c)+"'>📖 "+esc(c)+"</button>":"")+"</div></div><textarea class='nv2-answer' placeholder='Escribe aquí con tus propias palabras...'></textarea></article>";
 return "<article class='nv2-item'><div class='nv2-item-label'>"+(t==="enseñanza"?"💡 Enseñanza":t==="versiculo"?"📖 Versículo":t==="alternativa"?"💬 Mensaje":"🙏 Ejercicio")+"</div><p>"+esc(r.Texto)+"</p>"+(c?"<button class='nv2-ref' data-ref='"+esc(c)+"'>📖 "+esc(c)+"</button>":"")+"</article>";
}

function show(i){if(!groups.length)return;index=Math.max(0,Math.min(i,groups.length));document.querySelectorAll(".nv2-section").forEach((s,k)=>s.classList.toggle("active",k===index));document.getElementById("title").textContent=index<groups.length?groups[index][0]:"Evaluación final";document.getElementById("back").disabled=index===0;document.getElementById("next").disabled=index===groups.length;window.scrollTo({top:0,behavior:"smooth"})}

async function saveAnswers(){const u=user();const s=state();const respuestas=[...document.querySelectorAll(".nv2-answer")].filter(x=>x.value.trim()).map(x=>({parte:x.dataset.parte,paso:Number(x.getAttribute("paso")),tituloPaso:x.dataset.titulo,seccion:x.dataset.seccion,numero:x.dataset.numero,pregunta:x.dataset.pregunta,respuesta:x.value.trim()}));s.respuestas=respuestas;s.updated=new Date().toISOString();save(s);document.getElementById("avatar-title").textContent="¡Guardado!";document.getElementById("avatar-text").textContent="Tus respuestas quedaron guardadas. Estamos registrándolas en tu recorrido.";if(!u||!CONFIG?.API?.url)return;for(const x of respuestas){try{await fetch(CONFIG.API.url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({accion:"guardarRespuestaNuevaVida",correo:u.correo,parte:x.parte,paso:x.paso,tituloPaso:x.tituloPaso,seccion:x.seccion,numeroPregunta:Number(x.numero)||0,pregunta:x.pregunta,citaBiblica:"",respuesta:x.respuesta,completado:true})})}catch(e){console.error("No se pudo registrar respuesta del Paso 2",e)}}}

function progress(){const n=[...document.querySelectorAll(".nv2-answer")].filter(x=>x.value.trim()).length,total=document.querySelectorAll(".nv2-answer").length,p=Math.round(n/Math.max(1,total)*100),b=document.getElementById("bar"),ptext=document.getElementById("pct");if(b)b.style.width=p+"%";if(ptext)ptext.textContent=p+"%"}

function exam(){
 document.getElementById("exam").innerHTML="<div class='nv2-exam-top'><strong id='ec'></strong><span id='et'>05:00</span></div><div id='eq' class='nv2-exam-q'></div><div id='eo'></div><div class='nv2-actions'><button class='nv2-btn nv2-primary' onclick='nextExam()'>Siguiente</button></div><div id='result' class='nv2-result'></div>";
 examQuestion();
}

function examQuestion(){const q=EXAM[examIndex];document.getElementById("ec").textContent="Pregunta "+(examIndex+1)+" de 8";document.getElementById("eq").textContent=q[0];document.getElementById("eo").innerHTML=q[1].map((x,i)=>"<button class=\"nv2-exam-option "+(examAnswers[examIndex]===i?"selected":"")+"\" onclick=\"selectExam("+i+")\">"+String.fromCharCode(65+i)+". "+esc(x)+"</button>").join("")}
function selectExam(i){if(!timer){timer=setInterval(()=>{seconds--;document.getElementById("et").textContent=Math.floor(seconds/60).toString().padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");if(seconds<=0){clearInterval(timer);finishExam()}},1000)}examAnswers[examIndex]=i;examQuestion()}
function nextExam(){if(examAnswers[examIndex]===undefined){return}if(examIndex<7){examIndex++;examQuestion()}else finishExam()}
function finishExam(){if(timer)clearInterval(timer);let correct=0;examAnswers.forEach((x,i)=>{if(x===EXAM[i][2])correct++});const points=Math.round(correct/8*100),s=state();s.examen={correct:correct,total:8,puntos:points,fecha:new Date().toISOString()};s.aprobado=points>=80;s.completado=s.aprobado;save(s);const u=user();if(u&&CONFIG?.API?.url){fetch(CONFIG.API.url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({accion:"guardarRespuestaNuevaVida",correo:u.correo,parte:"Parte 1",paso:2,tituloPaso:"Seguro",seccion:"Evaluación final",numeroPregunta:0,pregunta:"Resultado de la evaluación del Paso 2",citaBiblica:"",respuesta:correct+"/8 ("+points+" puntos)",completado:points>=80})}).catch(e=>console.error("No se pudo registrar evaluación del Paso 2",e))}const a=avatar(),m=points>=90?"¡Felicidades! Sigue avanzando.":points>=80?"Bien, sigue adelante y mejora tu próxima lección.":"Ánimo, vuelve a intentarlo.";document.getElementById("result").innerHTML=(a?"<img class=\"nv2-avatar-result\" src=\""+esc(a.imagen)+"\">":"")+"<div class=\"nv2-score\">"+points+"</div><h2>"+(points>=80?"¡Aprobado!":"Debes repetir")+"</h2><p><strong>"+m+"</strong></p><p>Resultado: "+correct+"/8</p>"+(points<80?"<button class=\"nv2-btn nv2-primary\" onclick=\"retry()\">Repetir evaluación</button>":"<button class=\"nv2-btn nv2-primary\" onclick=\"location.href=&quot;nueva-vida-parte-1.html&quot;\">Volver a los pasos</button>");document.getElementById("result").classList.add("show")}
function retry(){examIndex=0;examAnswers=[];seconds=300;timer=null;document.getElementById("result").classList.remove("show");examQuestion()}
async function bib(ref){document.getElementById("modal").classList.add("open");document.getElementById("bt").textContent=ref;document.getElementById("bc").textContent="Cargando...";try{const p=ref.lastIndexOf(" "),lib=ref.slice(0,p),cit=ref.slice(p+1),ps=cit.split(":"),d=await obtenerCapituloBiblia(obtenerCodigoLibro(lib),parseInt(ps[0]));let v=d.versiculos||[];if(ps[1]){const z=ps[1].split("-"),a=+z[0],b=+(z[1]||z[0]);v=v.filter(x=>+x.numero>=a&&+x.numero<=b)}document.getElementById("bc").textContent=v.map(x=>x.texto).join("\\n\\n")}catch(_){document.getElementById("bc").textContent="No fue posible mostrar la cita ahora."}}
function closeBib(e){if(e&&e.target!==e.currentTarget)return;document.getElementById("modal").classList.remove("open")}
function salir(){if(typeof cerrarSesionComunidad==="function")cerrarSesionComunidad();location.href="comunidad.html"}