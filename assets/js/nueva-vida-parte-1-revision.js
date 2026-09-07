/* CAMINANDO CON DIOS · PARTE 1 · RONDA DE REVISIÓN
 * Experiencia de acompañamiento: menú de pasos, examen, audio, accesibilidad.
 */
(function(){
  const MENU_ID='nv1-step-menu';
  const STEP_COUNT=13;
  const FONT_KEY='nv1_font_scale';
  const EXAM=[
    {q:'Según Efesios 2:1, ¿cuál era nuestra condición antes de recibir la vida eterna?',o:['Éramos hijos maduros de Dios','Ya habíamos alcanzado la vida eterna','No teníamos ninguna necesidad espiritual','Estábamos muertos en delitos y pecados'],a:'D'},
    {q:'Según Romanos 3:23, ¿ha pecado toda persona?',o:['Sí','No','Solo quienes no asisten a una iglesia','Solo quienes no conocen la Biblia'],a:'A'},
    {q:'Según Efesios 2:4-5, ¿qué hizo Dios por nosotros?',o:['Nos pidió que primero hiciéramos suficientes obras','Nos dejó resolver solos nuestra condición','Nos dio vida juntamente con Cristo','Nos dio salvación por asistir a la iglesia'],a:'C'},
    {q:'Según Romanos 5:8, ¿cómo muestra Dios su amor?',o:['Nos dio riquezas materiales','Cristo murió por nosotros siendo aún pecadores','Nos evitó todas las dificultades','Nos permitió salvarnos por nuestros propios méritos'],a:'B'},
    {q:'Según Efesios 2:8-9, la salvación es por...',o:['Obras y asistencia religiosa','Conocimiento humano','Gracia por medio de la fe','Esfuerzo personal'],a:'C'},
    {q:'Según Gálatas 3:26, ¿en quién debemos tener fe para ser hijos de Dios?',o:['En nuestras buenas obras','En una tradición religiosa','En nuestra propia capacidad','En Cristo Jesús'],a:'D'},
    {q:'Según Juan 1:12, ¿qué recibe quien recibe a Cristo?',o:['El derecho de ser hijo de Dios','Una vida sin problemas','La obligación de salvarse por obras','Una promesa de riqueza'],a:'A'},
    {q:'Según 2 Corintios 5:17, quien está en Cristo es...',o:['La misma persona sin ningún cambio posible','Una persona sin necesidad de crecer','Una nueva criatura','Una persona que ya no necesita obedecer a Dios'],a:'C'}
  ];
  let examIndex=0, examSelected=null, examScore=0, examWrong=0, examBlank=0, examTimer=null, examSeconds=180, audioCtx=null;
  const userName=()=>{try{return (typeof obtenerUsuarioComunidad==='function'&&obtenerUsuarioComunidad()?.nombre)||'hermano/a';}catch(_){return 'hermano/a';}};
  const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(inicializarRevision_,0);
    const obs=new MutationObserver(()=>{
      if(document.getElementById('nv1-examen')){
        prepararExperiencia_();
        if(document.getElementById(MENU_ID)?.classList.contains('nv1-review-hidden')){
          const w=document.querySelector('.nv1-wrap'); if(w) abrirPaso1_(w);
        }
      }
    });
    obs.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),12000);
  });

  function inicializarRevision_(){
    const wrap=document.querySelector('.nv1-wrap'); if(!wrap)return;
    ['.nv1-progress','#nv1-wizard-nav','.nv1-section'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.classList.add('nv1-review-hidden')));
    crearMenu_(wrap);
    agregarAccesibilidad_();
    prepararExperiencia_();
  }

  function crearMenu_(wrap){
    if(document.getElementById(MENU_ID))return;
    const menu=document.createElement('section'); menu.id=MENU_ID; menu.className='nv1-step-menu';
    const cards=[];
    for(let i=1;i<=STEP_COUNT;i++){
      const unlocked=i===1;
      cards.push(`<button type="button" class="nv1-step-card ${unlocked?'available':'locked'}" data-step-card="${i}" ${unlocked?'':'disabled'}>
        <span class="nv1-step-number">${unlocked?'▶':'🔒'}</span>
        <span class="nv1-step-copy"><small>Parte 1 · Paso ${i}</small><strong>${i===1?'¡Salvo!':'Próximamente'}</strong><em>${i===1?'Comenzar este paso':'Este paso se habilitará al completar el anterior'}</em></span>
        <span class="nv1-step-state">${unlocked?'Comenzar':'Bloqueado'}</span>
      </button>`);
    }
    menu.innerHTML=`<div class="nv1-step-menu-head"><span class="nv1-badge">Tu recorrido</span><h2>Parte 1 · Nueva Vida en Cristo</h2><p>Vamos paso a paso. Completa cada etapa antes de continuar a la siguiente.</p></div><div class="nv1-step-grid">${cards.join('')}</div><div class="nv1-menu-companion"><span>🤝</span><div><strong>Estoy aquí contigo</strong><p>Tu recorrido es personal. Puedes avanzar a tu ritmo y volver cuando lo necesites.</p></div></div>`;
    const progress=document.querySelector('.nv1-progress'); if(progress)progress.before(menu); else wrap.appendChild(menu);
    menu.querySelector('[data-step-card="1"]').addEventListener('click',()=>abrirPaso1_(wrap));
  }

  function abrirPaso1_(wrap){
    const menu=document.getElementById(MENU_ID); menu?.classList.add('nv1-review-hidden');
    document.querySelector('.nv1-progress')?.classList.remove('nv1-review-hidden');
    const sections=Array.from(wrap.querySelectorAll('.nv1-section'));
    sections.forEach(s=>s.classList.remove('nv1-review-hidden'));
    const cierre=wrap.querySelector('.nv1-reflection[data-step="8"]'); if(cierre)cierre.classList.add('nv1-review-hidden');
    iniciarWizardPaso1_(sections);
  }

  function iniciarWizardPaso1_(sections){
    const nav=document.getElementById('nv1-wizard-nav'); if(!nav)return;
    const visibles=sections.filter(s=>!s.classList.contains('nv1-review-hidden'));
    let idx=0;
    function show(i){
      idx=Math.max(0,Math.min(i,visibles.length-1));
      visibles.forEach((s,n)=>s.classList.toggle('nv1-wizard-hidden',n!==idx));
      const title=idx===0?'¡Salvo!':(visibles[idx]?.dataset.wizardTitle||visibles[idx]?.querySelector('h2')?.textContent||'¡Salvo!');
      nav.classList.remove('nv1-review-hidden');
      nav.innerHTML=`<div class="nv1-wizard-top"><button type="button" class="nv1-nav-link" id="nv1-back-menu">⌂ Pasos</button><div class="nv1-wizard-title"><span>Parte 1 · Paso 1</span><strong>${esc(title)}</strong></div><span class="nv1-wizard-count">${idx+1} / ${visibles.length}</span></div><div class="nv1-wizard-actions"><button type="button" class="nv1-btn nv1-btn-secondary" id="nv1-prev" ${idx===0?'disabled':''}>← Atrás</button><span class="nv1-wizard-percent">${Math.round((idx/Math.max(1,visibles.length-1))*100)}%</span><button type="button" class="nv1-btn nv1-btn-primary" id="nv1-next">${idx===visibles.length-1?'✓ Terminar':'Siguiente →'}</button></div>`;
      nav.querySelector('#nv1-back-menu').onclick=()=>volverMenu_(visibles,nav);
      nav.querySelector('#nv1-prev').onclick=()=>show(idx-1);
      nav.querySelector('#nv1-next').onclick=()=>show(idx+1);
      if(title.toLowerCase().includes('reto de comprensión')) iniciarExamenRevisado_(); else detenerExamen_();
      actualizarProgresoVisual_(idx,visibles.length);
      window.scrollTo({top:Math.max(0,(document.querySelector('.nv1-progress')?.offsetTop||0)-90),behavior:'smooth'});
    }
    show(0);
  }

  function volverMenu_(visibles,nav){
    detenerExamen_();
    visibles.forEach(s=>s.classList.add('nv1-wizard-hidden'));
    nav.classList.add('nv1-review-hidden');
    document.getElementById(MENU_ID)?.classList.remove('nv1-review-hidden');
    document.querySelector('.nv1-progress')?.classList.add('nv1-review-hidden');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function actualizarProgresoVisual_(idx,total){const bar=document.getElementById('nv1-progress-bar'),txt=document.getElementById('nv1-progress-text');const p=Math.round((idx/Math.max(1,total-1))*100);if(bar)bar.style.width=p+'%';if(txt)txt.textContent=p+'%';}

  function prepararExperiencia_(){
    const vfTexts=['para ser salvo sólo necesito creer que dios existe.','el pecado causa una separación entre dios y el hombre.','soy salvo por asistir a la iglesia y hacer cosas buenas.'];
    document.querySelectorAll('.nv1-question').forEach(card=>{const t=card.querySelector('h3')?.textContent?.replace(/\s+/g,' ').trim().toLowerCase();if(t&&vfTexts.includes(t)&&!card.closest('.nv1-section[data-step="1"]'))card.remove();});
    document.querySelectorAll('.nv1-question').forEach(card=>{const h=card.querySelector('h3');if(!h)return;const t=h.textContent||'';if(t.includes('Somos salvos por')&&t.includes('por medio de la')&&!card.querySelector('.nv1-blank-input')){
      card.classList.add('nv1-fill-question'); const ref=card.querySelector('.nv1-ref')?.outerHTML||'';
      h.innerHTML='Somos salvos por <input class="nv1-blank-input" data-blank="gracia" aria-label="Primera respuesta"> por medio de la <input class="nv1-blank-input" data-blank="fe" aria-label="Segunda respuesta">.';
      card.querySelector('.nv1-answer')?.remove();
      if(ref&&!card.querySelector('.nv1-ref'))h.insertAdjacentHTML('afterend',ref);
      if(!card.querySelector('.nv1-fill-feedback')){const f=document.createElement('div');f.className='nv1-fill-feedback';card.appendChild(f);}
      card.querySelectorAll('.nv1-blank-input').forEach(inp=>inp.addEventListener('input',()=>evaluarCompletar_(card)));
    }});
    instalarAudioDelegado_(); instalarFecha_(); aplicarEscala_();
  }

  function evaluarCompletar_(card){const inputs=[...card.querySelectorAll('.nv1-blank-input')];const values=inputs.map(i=>i.value.trim().toLowerCase());const feedback=card.querySelector('.nv1-fill-feedback');if(!values.some(Boolean)){feedback.textContent='';return;}const ok=values[0]==='gracia'&&values[1]==='fe';const parcial=values[0]==='gracia'||values[1]==='fe';feedback.className='nv1-fill-feedback '+(ok?'correct':parcial?'partial':'wrong');feedback.textContent=ok?'✓ ¡Muy bien! Has completado correctamente la frase.':parcial?'Casi. Revisa ambas respuestas y vuelve a intentarlo.':'Revisa la frase y piensa en lo que enseña Efesios 2:8.';inputs.forEach(i=>i.classList.toggle('correct',ok));}

  function instalarFecha_(){document.querySelectorAll('.nv1-db-exercise').forEach(card=>{if(card.querySelector('.nv1-date-input'))return;if(/fecha\s*:/i.test(card.textContent||'')){const wrap=document.createElement('label');wrap.className='nv1-date-wrap';wrap.innerHTML='📅 <span>Fecha de mi compromiso</span><input class="nv1-date-input" type="date">';const action=card.querySelector('.nv1-exercise-action');action?action.before(wrap):card.appendChild(wrap);}});}

  function instalarAudioDelegado_(){
    if(window.__nv1AudioInstalled)return;window.__nv1AudioInstalled=true;
    document.addEventListener('click',e=>{const b=e.target.closest('.nv1-audio-control,.nv1-audio-placeholder');if(!b)return;e.preventDefault();e.stopPropagation();const card=b.closest('.nv1-section,.nv1-db-item,.nv1-question');if(!card)return;const clone=card.cloneNode(true);clone.querySelectorAll('button,input,textarea,.nv1-audio-control,.nv1-audio-placeholder,.nv1-actions,.nv1-wizard-nav').forEach(x=>x.remove());const text=(clone.innerText||'').replace(/\s+/g,' ').trim();reproducirAudio_(text,b);},true);
  }

  function reproducirAudio_(text,b){if(!('speechSynthesis'in window)){b.textContent='🔊 Audio no disponible';return;}window.speechSynthesis.cancel();let voices=window.speechSynthesis.getVoices();const hablar=()=>{voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>/^es(-|_)/i.test(v.lang))||voices.find(v=>/^es/i.test(v.lang));const u=new SpeechSynthesisUtterance(text);u.lang=voice?.lang||'es-ES';if(voice)u.voice=voice;u.rate=.9;u.pitch=1;u.volume=1;b.textContent='⏸ Detener';u.onend=()=>{b.textContent='🔊 Escuchar';};u.onerror=()=>{b.textContent='🔊 Reintentar';};window.speechSynthesis.speak(u);};hablar();setTimeout(()=>{if(!window.speechSynthesis.speaking&&b.textContent.includes('Detener')){try{window.speechSynthesis.cancel();hablar();}catch(_){b.textContent='🔊 Reintentar';}}},700);}

  function agregarAccesibilidad_(){if(document.getElementById('nv1-accessibility'))return;const p=document.querySelector('.nv1-progress');if(!p)return;const bar=document.createElement('div');bar.id='nv1-accessibility';bar.className='nv1-accessibility';bar.innerHTML='<span>🔎 Tamaño de texto</span><button type="button" data-font="minus">A−</button><button type="button" data-font="normal">A</button><button type="button" data-font="plus">A+</button>';p.after(bar);bar.querySelector('[data-font="minus"]').onclick=()=>setScale_(getScale_()-.1);bar.querySelector('[data-font="normal"]').onclick=()=>setScale_(1);bar.querySelector('[data-font="plus"]').onclick=()=>setScale_(getScale_()+.1);aplicarEscala_();}
  function getScale_(){return Number(localStorage.getItem(FONT_KEY)||'1');}function setScale_(n){localStorage.setItem(FONT_KEY,String(Math.max(.9,Math.min(1.3,n))));aplicarEscala_();}function aplicarEscala_(){document.documentElement.style.setProperty('--nv1-font-scale',getScale_());}

  function iniciarExamenRevisado_(){if(examTimer)return;examIndex=0;examSelected=null;examScore=0;examWrong=0;examBlank=0;examSeconds=180;renderExam_();iniciarCuenta_();}
  function detenerExamen_(){if(examTimer){clearInterval(examTimer);examTimer=null;}}
  function renderExam_(){const q=EXAM[examIndex],box=document.getElementById('nv1-game');if(!box)return;const options=q.o.map((label,i)=>({label,correct:String.fromCharCode(65+i)===q.a}));const targetPositions=[3,0,2,1,2,3,0,1],target=targetPositions[examIndex],correct=options.findIndex(x=>x.correct),rotated=options.map((_,i)=>options[(i-(target-correct)+4)%4]);box.innerHTML=`<div class="nv1-game-top"><div><strong>Pregunta ${examIndex+1} de ${EXAM.length}</strong><div class="nv1-game-note">Lee con calma. Tienes 3 minutos para completar el reto.</div></div><div id="nv1-timer" class="nv1-timer">03:00</div></div><div class="nv1-game-question">${esc(q.q)}</div><div id="nv1-game-options" class="nv1-game-options">${rotated.map((x,i)=>`<button type="button" class="nv1-game-option" data-answer="${x.correct?'1':'0'}">${String.fromCharCode(65+i)}. ${esc(x.label)}</button>`).join('')}</div><div class="nv1-game-footer"><span id="nv1-game-feedback" class="nv1-game-note">Selecciona una respuesta.</span><button type="button" id="nv1-game-next" class="nv1-btn nv1-btn-primary" disabled>Siguiente</button></div><div id="nv1-result" class="nv1-result" style="display:none"></div>`;box.querySelectorAll('.nv1-game-option').forEach(btn=>btn.addEventListener('click',()=>{box.querySelectorAll('.nv1-game-option').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');examSelected=btn.dataset.answer==='1';box.querySelector('#nv1-game-next').disabled=false;box.querySelector('#nv1-game-feedback').textContent='Respuesta seleccionada.';}));box.querySelector('#nv1-game-next').onclick=()=>{if(examSelected===null)return;if(examSelected)examScore++;else examWrong++;examIndex++;examSelected=null;if(examIndex>=EXAM.length)finalizarExamen_();else renderExam_();};}
  function iniciarCuenta_(){detenerExamen_();actualizarReloj_();examTimer=setInterval(()=>{examSeconds--;actualizarReloj_();if(examSeconds<=10&&examSeconds>0)beep_(examSeconds===10?520:700);if(examSeconds<=0){detenerExamen_();examBlank=EXAM.length-(examScore+examWrong);finalizarExamen_();}},1000);}
  function actualizarReloj_(){const t=document.getElementById('nv1-timer');if(!t)return;const m=Math.floor(examSeconds/60).toString().padStart(2,'0'),s=(examSeconds%60).toString().padStart(2,'0');t.textContent=`${m}:${s}`;if(examSeconds<=10)t.classList.add('nv1-timer-danger');}
  function beep_(freq){try{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=freq;o.type='sine';g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.08,audioCtx.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.18);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+.2);}catch(_){} }
  function finalizarExamen_(){detenerExamen_();const box=document.getElementById('nv1-game');if(!box)return;examBlank=Math.max(0,EXAM.length-(examScore+examWrong));const n=esc(userName());let msg;if(examScore===EXAM.length)msg=`<strong>¡Felicidades, ${n}!</strong><p>Has respondido correctamente todas las preguntas. <b>¡Sigue así!</b> Cada paso que das fortalece tu crecimiento.</p>`;else if(examScore>=6)msg=`<strong>¡Muy bien, ${n}!</strong><p>Vas avanzando muy bien. Revisa las respuestas que fallaste y continúa. <b>¡No te detengas!</b></p>`;else msg=`<strong>Ánimo, ${n}.</strong><p>Este resultado no define tu aprendizaje. Vuelve a revisar el paso y prueba nuevamente. <b>¡Puedes seguir creciendo!</b></p>`;box.querySelectorAll('.nv1-game-option').forEach(b=>b.disabled=true);box.querySelector('.nv1-game-footer')?.remove();const r=box.querySelector('#nv1-result');r.style.display='block';r.innerHTML=`<div class="nv1-score">${examScore} / ${EXAM.length}</div><p><strong>Correctas:</strong> ${examScore} · <strong>Incorrectas:</strong> ${examWrong} · <strong>Sin responder:</strong> ${examBlank}</p><div class="nv1-exam-message">${msg}</div><button type="button" class="nv1-btn nv1-btn-primary" id="nv1-exam-retry">Volver a intentarlo</button>`;r.querySelector('#nv1-exam-retry').onclick=()=>{examTimer=null;iniciarExamenRevisado_();};}
})();
