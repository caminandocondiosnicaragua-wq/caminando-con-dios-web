/* CAMINANDO CON DIOS · PARTE 1 · CONTROL DE EXPERIENCIA
 * El contenido de Notion se carga solamente al abrir Paso 1.
 */
(function(){
  const STEP_TOTAL=13;
  let examen={index:0,selected:null,correct:0,wrong:0,blank:0,seconds:180,timer:null};
  let audioCtx=null;

  document.addEventListener('DOMContentLoaded',()=>setTimeout(iniciarControlNV1_,0));

  function usuario_(){return typeof obtenerUsuarioComunidad==='function'?obtenerUsuarioComunidad():null;}
  function esc_(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}

  function iniciarControlNV1_(){
    const wrap=document.querySelector('.nv1-wrap');
    if(!wrap)return;
    document.querySelectorAll('.nv1-progress,.nv1-section,#nv1-wizard-nav').forEach(el=>el.classList.add('nv1-control-hidden'));
    const menu=document.createElement('section');
    menu.id='nv1-step-menu-real';
    menu.className='nv1-step-menu-real';
    menu.innerHTML=`<div class="nv1-step-menu-head-real"><span class="nv1-badge">Tu recorrido</span><h2>Parte 1 · Nueva Vida en Cristo</h2><p>Esta parte tiene 13 pasos. Comenzaremos por <strong>¡Salvo!</strong> y avanzaremos juntos, uno a uno.</p></div><div class="nv1-step-grid-real">${crearTarjetas_()}</div><div class="nv1-menu-companion-real"><span>🤝</span><div><strong>No estás solo en este camino</strong><p>Cuando un paso esté listo, se habilitará para ti. Puedes volver a un paso anterior cuando necesites repasar.</p></div></div>`;
    const progress=document.querySelector('.nv1-progress');
    progress?progress.before(menu):wrap.appendChild(menu);
    menu.querySelector('[data-step="1"]').addEventListener('click',()=>abrirPaso1_(wrap,menu));
    agregarAccesibilidad_(menu);
  }

  function crearTarjetas_(){
    return Array.from({length:STEP_TOTAL},(_,i)=>{
      const n=i+1, activo=n===1;
      return `<button type="button" class="nv1-step-card-real ${activo?'available':'locked'}" data-step="${n}" ${activo?'':'disabled'}><span class="nv1-step-number-real">${activo?'▶':'🔒'}</span><span class="nv1-step-copy-real"><small>Parte 1 · Paso ${n}</small><strong>${activo?'¡Salvo!':'Próximamente'}</strong><em>${activo?'Comenzar este paso':'Se habilitará al completar el paso anterior'}</em></span><span class="nv1-step-state-real">${activo?'Comenzar':'Bloqueado'}</span></button>`;
    }).join('');
  }

  function abrirPaso1_(wrap,menu){
    menu.remove();
    document.querySelectorAll('.nv1-section').forEach(el=>el.classList.add('nv1-control-hidden'));
    document.querySelector('.nv1-progress')?.classList.add('nv1-control-hidden');
    const view=document.createElement('section');
    view.id='nv1-step1-view';
    view.className='nv1-step1-view';
    view.innerHTML=`<div class="nv1-step1-toolbar"><button type="button" class="nv1-btn nv1-btn-secondary" id="nv1-volver-pasos">← Volver a los pasos</button><div><span>Parte 1 · Paso 1</span><strong>¡Salvo!</strong></div><span class="nv1-step1-status">En progreso</span></div><div id="nv1-step1-loading" class="nv1-step1-loading"><div class="nv1-loader"></div><strong>Preparando tu recorrido...</strong><p>Estoy cargando el contenido de este paso para ti.</p></div><div id="nv1-step1-content" class="nv1-step1-content" style="display:none"></div>`;
    wrap.appendChild(view);
    view.querySelector('#nv1-volver-pasos').onclick=()=>volverMenu_(wrap,view);
    cargarPaso1_(view);
  }

  async function cargarPaso1_(view){
    try{
      const respuesta=await fetch(CONFIG.API.url+'?coleccion=contenidoNuevaVida',{method:'GET'});
      if(!respuesta.ok)throw new Error('La API respondió con HTTP '+respuesta.status);
      const datos=await respuesta.json();
      if(!Array.isArray(datos))throw new Error('La API no devolvió una lista de contenido.');
      const contenido=datos.filter(r=>String(r.Parte||'').trim()==='Parte 1'&&Number(r.Paso)===1).sort((a,b)=>Number(a.Orden||0)-Number(b.Orden||0));
      if(!contenido.length)throw new Error('No se encontró contenido para Parte 1 · Paso 1.');
      renderPaso1_(view,contenido);
    }catch(error){
      const load=view.querySelector('#nv1-step1-loading');
      load.innerHTML=`<div class="nv1-load-error">⚠️</div><strong>No pudimos cargar este paso.</strong><p>${esc_(error.message)}</p><button type="button" class="nv1-btn nv1-btn-primary" id="nv1-reintentar">Reintentar</button>`;
      load.querySelector('#nv1-reintentar').onclick=()=>{load.innerHTML='<div class="nv1-loader"></div><strong>Preparando tu recorrido...</strong><p>Estoy cargando el contenido de este paso para ti.</p>';cargarPaso1_(view);};
    }
  }

  function renderPaso1_(view,registros){
    const content=view.querySelector('#nv1-step1-content');
    const baseVF=document.querySelector('.nv1-section[data-step="1"]');
    const baseExam=document.getElementById('nv1-examen');
    const baseClose=document.querySelector('.nv1-reflection[data-step="8"]');
    let html='<div class="nv1-step1-intro"><span class="nv1-badge">Acompañamiento · Paso 1</span><h2>¡Salvo!</h2><p>Hoy no vienes solamente a contestar preguntas. Vamos a caminar juntos por lo que Dios ha hecho en tu vida.</p></div>';
    if(baseVF)html+=`<div class="nv1-reuse-block" id="nv1-vf-block">${baseVF.innerHTML}</div>`;
    const grupos=agrupar_(registros);
    Object.keys(grupos).forEach(nombre=>{html+=`<section class="nv1-db-section-real"><div class="nv1-section-visual"><div class="nv1-section-icon">${icono_(nombre)}</div><div><span class="nv1-badge">Momento de tu recorrido</span><h2>${esc_(nombre||'Nueva Vida en Cristo')}</h2><p class="nv1-section-intro">Tómate tu tiempo. Lee, piensa y avanza cuando estés listo.</p></div></div><div class="nv1-db-content-real">${grupos[nombre].map(crearBloque_).join('')}</div><div class="nv1-section-companion"><span>💬</span><p><strong>Vamos paso a paso.</strong> No tienes que terminar todo de una vez.</p></div></section>`;});
    if(baseExam)html+=`<div class="nv1-reuse-block nv1-exam-block-real">${baseExam.innerHTML}</div>`;
    if(baseClose)html+=`<div class="nv1-reuse-block nv1-close-block-real">${baseClose.innerHTML}</div>`;
    html+=`<div class="nv1-final-companion"><span>🌱</span><div><strong>Terminaste este recorrido por hoy.</strong><p>Guarda lo aprendido en tu corazón. El siguiente paso estará disponible cuando corresponda.</p></div></div>`;
    content.innerHTML=html;
    view.querySelector('#nv1-step1-loading').style.display='none';
    content.style.display='block';
    prepararVF_(content); prepararRelleno_(content); instalarCitas_(content); instalarAudio_(content); instalarFecha_(content); iniciarExamen_(content); actualizarTextoUsuario_(content);
    window.scrollTo({top:view.offsetTop-80,behavior:'smooth'});
  }

  function agrupar_(rows){return rows.reduce((g,r)=>{const k=String(r.Seccion||'Contenido').trim()||'Contenido';(g[k]||(g[k]=[])).push(r);return g;},{});}
  function icono_(n){const t=String(n||'').toLowerCase();if(t.includes('bienvenida'))return'🌱';if(t.includes('ejercicio'))return'🏃';if(t.includes('vida'))return'🕊️';if(t.includes('obra'))return'❤️';if(t.includes('fe'))return'🙏';if(t.includes('reflex'))return'💭';if(t.includes('decid'))return'🧭';return'📖';}
  function cita_(c){return c?`<button type="button" class="nv1-ref" data-ref="${esc_(c)}">📖 ${esc_(c)}</button>`:'';}
  function crearBloque_(r){
    const tipo=String(r.Tipo||'').trim().toLowerCase(),texto=String(r.Texto||'').trim(),citaBib=String(r['Cita Bíblica']||'').trim(),numero=r.Número==null?'':String(r.Número).trim();
    if(tipo==='versiculo')return `<article class="nv1-db-item-real nv1-db-verse"><div class="nv1-db-label">📖 Palabra de Dios</div><p>${esc_(texto)}</p>${cita_(citaBib)}<button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
    const cls=tipo==='bienvenida'?'nv1-db-welcome':tipo==='enseñanza'?'nv1-db-teaching':tipo==='ejercicio'?'nv1-db-exercise':tipo==='reflexion'?'nv1-db-reflection':'';
    if(tipo==='pregunta')return `<article class="nv1-question nv1-interactive-card-real"><div class="nv1-q-head"><div class="nv1-q-num">${esc_(numero||'?')}</div><div><span class="nv1-mini-label">✍️ Reflexiona</span><h3>${esc_(texto)}</h3>${cita_(citaBib)}</div></div><textarea class="nv1-answer" data-q="${esc_(numero)}" placeholder="Escribe aquí lo que piensas..."></textarea><button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
    return `<article class="nv1-db-item-real nv1-interactive-card-real ${cls}"><div class="nv1-db-label">${tipo==='bienvenida'?'🌱':tipo==='enseñanza'?'💡':tipo==='ejercicio'?'🎯':tipo==='reflexion'?'💭':'✨'} ${esc_(r.Tipo||'Contenido')}</div><p>${esc_(texto)}</p>${cita_(citaBib)}${tipo==='ejercicio'?'<button type="button" class="nv1-exercise-action">✓ Lo hice</button>':''}<button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
  }

  function prepararVF_(root){const cards=[...root.querySelectorAll('#nv1-vf-block .nv1-choice')];if(!cards.length)return;cards.forEach((label,i)=>{const input=label.querySelector('input');if(label.querySelector('.nv1-vf-option'))return;const original=label.querySelector('span');label.innerHTML='';label.classList.add('nv1-vf-option');label.appendChild(input);label.insertAdjacentHTML('beforeend',`<span class="nv1-vf-pill">${i===1?'V':'F'}</span><span>${original?.textContent||''}</span>`);});}
  function prepararRelleno_(root){root.querySelectorAll('.nv1-question').forEach(card=>{const h=card.querySelector('h3');if(!h)return;const t=h.textContent||'';if(!/Somos salvos por/i.test(t)||!card.querySelector('.nv1-answer'))return;const ref=card.querySelector('.nv1-ref')?.outerHTML||'';h.innerHTML='Somos salvos por <input class="nv1-blank-input" data-answer="gracia" aria-label="gracia"> por medio de la <input class="nv1-blank-input" data-answer="fe" aria-label="fe">.';card.querySelector('.nv1-answer')?.remove();if(ref)h.insertAdjacentHTML('afterend',ref);const feedback=document.createElement('div');feedback.className='nv1-fill-feedback';card.appendChild(feedback);card.querySelectorAll('.nv1-blank-input').forEach(i=>i.addEventListener('input',()=>{const vals=[...card.querySelectorAll('.nv1-blank-input')].map(x=>x.value.trim().toLowerCase());const ok=vals[0]==='gracia'&&vals[1]==='fe';const partial=vals[0]==='gracia'||vals[1]==='fe';feedback.className='nv1-fill-feedback '+(ok?'correct':partial?'partial':'wrong');feedback.textContent=ok?'✓ ¡Muy bien! Has completado correctamente la frase.':partial?'Casi. Revisa las dos respuestas.':'Piénsalo nuevamente: Efesios 2:8 habla de gracia y fe.';}));});}
  function instalarCitas_(root){root.querySelectorAll('.nv1-ref').forEach(b=>b.addEventListener('click',()=>typeof abrirBibliaNV1_==='function'&&abrirBibliaNV1_(b.dataset.ref)));}
  function instalarFecha_(root){root.querySelectorAll('.nv1-db-exercise').forEach(card=>{if(!/fecha\s*:/i.test(card.textContent)||card.querySelector('.nv1-date-input'))return;const l=document.createElement('label');l.className='nv1-date-wrap';l.innerHTML='📅 <span>Fecha de mi compromiso</span><input class="nv1-date-input" type="date">';card.querySelector('.nv1-exercise-action')?.before(l);});}
  function instalarAudio_(root){root.addEventListener('click',e=>{const b=e.target.closest('.nv1-audio-control');if(!b)return;const card=b.closest('article');const clone=card.cloneNode(true);clone.querySelectorAll('button,input,textarea').forEach(x=>x.remove());const text=(clone.innerText||'').replace(/\s+/g,' ').trim();if(!('speechSynthesis'in window)){b.textContent='🔊 Audio no disponible';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='es-ES';u.rate=.9;u.volume=1;const voices=speechSynthesis.getVoices();const voice=voices.find(v=>/^es(-|_)/i.test(v.lang));if(voice)u.voice=voice;b.textContent='⏸ Detener';u.onend=()=>b.textContent='🔊 Escuchar';u.onerror=()=>b.textContent='🔊 Reintentar';speechSynthesis.speak(u);});}
  function actualizarTextoUsuario_(root){const u=usuario_();if(!u)return;root.querySelectorAll('[data-usuario]').forEach(e=>e.textContent=u.nombre||'hermano/a');}

  function iniciarExamen_(root){const box=root.querySelector('.nv1-exam-block-real #nv1-game');if(!box)return;const preguntas=[
    ['Según Efesios 2:1, ¿cuál era nuestra condición antes de recibir la vida eterna?',['Éramos hijos maduros de Dios','Ya habíamos alcanzado la vida eterna','No teníamos ninguna necesidad espiritual','Estábamos muertos en delitos y pecados'],3],
    ['Según Romanos 3:23, ¿ha pecado toda persona?',['Sí','No','Solo quienes no asisten a una iglesia','Solo quienes no conocen la Biblia'],0],
    ['Según Efesios 2:4-5, ¿qué hizo Dios por nosotros?',['Nos pidió que primero hiciéramos suficientes obras','Nos dejó resolver solos nuestra condición','Nos dio vida juntamente con Cristo','Nos dio salvación por asistir a la iglesia'],2],
    ['Según Romanos 5:8, ¿cómo muestra Dios su amor?',['Nos dio riquezas materiales','Cristo murió por nosotros siendo aún pecadores','Nos evitó todas las dificultades','Nos permitió salvarnos por nuestros propios méritos'],1],
    ['Según Efesios 2:8-9, la salvación es por...',['Obras y asistencia religiosa','Conocimiento humano','Gracia por medio de la fe','Esfuerzo personal'],2],
    ['Según Gálatas 3:26, ¿en quién debemos tener fe para ser hijos de Dios?',['En nuestras buenas obras','En una tradición religiosa','En nuestra propia capacidad','En Cristo Jesús'],3],
    ['Según Juan 1:12, ¿qué recibe quien recibe a Cristo?',['El derecho de ser hijo de Dios','Una vida sin problemas','La obligación de salvarse por obras','Una promesa de riqueza'],0],
    ['Según 2 Corintios 5:17, quien está en Cristo es...',['La misma persona sin ningún cambio posible','Una persona sin necesidad de crecer','Una nueva criatura','Una persona que ya no necesita obedecer a Dios'],2]
  ];
    let idx=0,selected=null,correct=0,wrong=0,seconds=180,timer=null;
    function stop(){if(timer){clearInterval(timer);timer=null;}}
    function show(){const q=preguntas[idx];selected=null;box.innerHTML=`<div class="nv1-game-top"><div><strong>Pregunta ${idx+1} de 8</strong><div class="nv1-game-note">Tienes 3 minutos. Lee con calma.</div></div><div id="nv1-timer" class="nv1-timer">03:00</div></div><div class="nv1-game-question">${esc_(q[0])}</div><div class="nv1-game-options">${q[1].map((o,i)=>`<button type="button" class="nv1-game-option" data-correct="${i===q[2]?'1':'0'}">${String.fromCharCode(65+i)}. ${esc_(o)}</button>`).join('')}</div><div class="nv1-game-footer"><span id="nv1-game-feedback" class="nv1-game-note">Selecciona una respuesta.</span><button type="button" id="nv1-game-next" class="nv1-btn nv1-btn-primary" disabled>Siguiente</button></div><div id="nv1-result" class="nv1-result" style="display:none"></div>`;box.querySelectorAll('.nv1-game-option').forEach(b=>b.onclick=()=>{box.querySelectorAll('.nv1-game-option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selected=b.dataset.correct==='1';box.querySelector('#nv1-game-next').disabled=false;});box.querySelector('#nv1-game-next').onclick=()=>{if(selected===null)return;selected?correct++:wrong++;idx++;if(idx>=preguntas.length){stop();finish();}else show();};}
    function tick(){const t=box.querySelector('#nv1-timer');if(!t)return;const m=Math.floor(seconds/60).toString().padStart(2,'0'),s=(seconds%60).toString().padStart(2,'0');t.textContent=m+':'+s;if(seconds<=10){t.classList.add('nv1-timer-danger');beep_(seconds===10?500:750);}if(seconds<=0){stop();finish();}}
    function start(){stop();seconds=180;correct=0;wrong=0;idx=0;show();tick();timer=setInterval(()=>{seconds--;tick();},1000);}
    function finish(){const blank=Math.max(0,preguntas.length-(correct+wrong));const n=esc_(usuario_()?.nombre||'hermano/a');const r=box.querySelector('#nv1-result');if(!r)return;box.querySelectorAll('.nv1-game-option').forEach(b=>b.disabled=true);box.querySelector('.nv1-game-footer')?.remove();r.style.display='block';let m=correct===8?`<strong>¡Felicidades, ${n}!</strong><p>Has respondido correctamente. <b>¡Sigue así!</b> Cada paso que das fortalece tu crecimiento.</p>`:correct>=6?`<strong>¡Muy bien, ${n}!</strong><p>Vas avanzando muy bien. Revisa lo que fallaste y continúa. <b>¡No te detengas!</b></p>`:`<strong>Ánimo, ${n}.</strong><p>Este resultado no te define. Vuelve a revisar el paso y prueba nuevamente. <b>¡Puedes seguir creciendo!</b></p>`;r.innerHTML=`<div class="nv1-score">${correct} / 8</div><p><strong>Correctas:</strong> ${correct} · <strong>Incorrectas:</strong> ${wrong} · <strong>Sin responder:</strong> ${blank}</p><div class="nv1-exam-message">${m}</div><button type="button" class="nv1-btn nv1-btn-primary" id="nv1-exam-retry">Volver a intentarlo</button>`;r.querySelector('#nv1-exam-retry').onclick=start;}
    show();timer=setInterval(()=>{seconds--;tick();},1000);
  }
  function beep_(freq){try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=freq;g.gain.value=.06;o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.15);}catch(_){}}
  function volverMenu_(wrap,view){detenerTodo_();view.remove();iniciarControlNV1_();window.scrollTo({top:0,behavior:'smooth'});}
  function detenerTodo_(){document.querySelectorAll('audio').forEach(a=>a.pause());if('speechSynthesis'in window)speechSynthesis.cancel();}
  function agregarAccesibilidad_(menu){const p=document.querySelector('.nv1-progress');if(!p||document.getElementById('nv1-accessibility-real'))return;const bar=document.createElement('div');bar.id='nv1-accessibility-real';bar.className='nv1-accessibility';bar.innerHTML='<span>🔎 Tamaño de texto</span><button type="button">A−</button><button type="button">A</button><button type="button">A+</button>';p.before(bar);const buttons=bar.querySelectorAll('button');buttons[0].onclick=()=>escala_(-.1);buttons[1].onclick=()=>escala_(0,true);buttons[2].onclick=()=>escala_(.1);}
  function escala_(delta,reset){const key='nv1_font_scale';let s=reset?1:Number(localStorage.getItem(key)||1);if(!reset)s=Math.max(.9,Math.min(1.3,s+delta));localStorage.setItem(key,s);document.documentElement.style.setProperty('--nv1-font-scale',s);}
})();
