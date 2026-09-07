/* CAMINANDO CON DIOS · PARTE 1 · CONTROL UNIFICADO
 * Un solo controlador para el recorrido. No depende de control.js ni wizard.js.
 */
(function(){
  let wrap=null, menu=null, view=null, sections=[], current=0, user=null;

  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,350));

  function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
  function getUser(){return typeof obtenerUsuarioComunidad==='function'?obtenerUsuarioComunidad():null;}

  function init(){
    wrap=document.querySelector('.nv1-wrap');
    user=getUser();
    if(!wrap||!user)return;

    document.querySelectorAll('.nv1-progress,.nv1-section,#nv1-wizard-nav').forEach(e=>e.classList.add('nv1-control-hidden'));
    crearMenu();
  }

  function crearMenu(){
    menu=document.createElement('section');
    menu.id='nv1-menu-unificado';
    menu.className='nv1-step-menu-real';
    menu.innerHTML=`
      <div class="nv1-step-menu-head-real">
        <span class="nv1-badge">Tu recorrido</span>
        <h2>Parte 1 · Nueva Vida en Cristo</h2>
        <p>Esta parte tiene <strong>13 pasos</strong>. Comenzaremos por <strong>¡Salvo!</strong> y avanzaremos juntos, uno a uno.</p>
      </div>
      <div class="nv1-step-grid-real">${Array.from({length:13},(_,i)=>{
        const n=i+1, active=n===1;
        return `<button type="button" class="nv1-step-card-real ${active?'available':'locked'}" data-step="${n}" ${active?'':'disabled'}>
          ${active?'<img class="nv1-step-card-image-real" src="assets/img/hero.png" alt="">':'<span class="nv1-step-number-real">🔒</span>'}
          <span class="nv1-step-copy-real"><small>PARTE 1 · PASO ${n}</small><strong>${active?'¡Salvo!':'Próximamente'}</strong><em>${active?'Comenzar este paso':'Se habilitará al completar el paso anterior'}</em></span>
          <span class="nv1-step-state-real">${active?'Comenzar':'Bloqueado'}</span>
        </button>`;
      }).join('')}</div>
      <div class="nv1-menu-companion-real"><span>🤝</span><div><strong>No estás solo en este camino</strong><p>Vamos paso a paso. Puedes volver a repasar cuando lo necesites.</p></div></div>`;
    wrap.appendChild(menu);
    menu.querySelector('[data-step="1"]').onclick=abrirPaso1;
  }

  async function abrirPaso1(){
    menu?.remove();
    view=document.createElement('section');
    view.className='nv1-wizard-review';
    view.innerHTML='<div class="nv1-wiz-loading"><div class="nv1-wiz-spinner"></div><strong>Preparando tu recorrido...</strong><p>Estoy cargando el contenido de este paso para ti.</p></div>';
    wrap.appendChild(view);

    try{
      const r=await fetch(CONFIG.API.url+'?coleccion=contenidoNuevaVida',{method:'GET'});
      if(!r.ok)throw new Error('La API respondió con HTTP '+r.status+'.');
      const data=await r.json();
      if(!Array.isArray(data))throw new Error('La API no devolvió una lista de contenido.');
      const rows=data.filter(x=>String(x.Parte||'').trim()==='Parte 1'&&Number(x.Paso)===1).sort((a,b)=>Number(a.Orden||0)-Number(b.Orden||0));
      if(!rows.length)throw new Error('No se encontró contenido para Parte 1 · Paso 1.');
      construirSecciones(rows);
      current=0;
      render();
    }catch(e){
      view.innerHTML=`<div class="nv1-wiz-error"><strong>No pudimos cargar Paso 1.</strong><p>${esc(e.message)}</p><button class="nv1-wiz-btn nv1-wiz-btn-primary" id="nv1-retry">Reintentar</button></div>`;
      view.querySelector('#nv1-retry').onclick=abrirPaso1;
    }
  }

  function construirSecciones(rows){
    const groups=[];
    const map=Object.create(null);
    rows.forEach(r=>{
      const key=String(r.Seccion||'Contenido').trim()||'Contenido';
      if(!map[key]){
        const group={title:key,items:[]};
        map[key]=group;
        groups.push(group);
      }
      map[key].items.push(r);
    });
    sections=[
      {type:'vf',title:'Antes de comenzar'},
      ...groups.map(g=>({type:'content',title:g.title,items:g.items})),
      {type:'exam',title:'Reto de comprensión'}
    ];
  }

  function render(){
    const s=sections[current];
    view.innerHTML=`
      <div class="nv1-wizard-toolbar"><button type="button" class="nv1-wiz-btn" id="nv1-home">⌂ Inicio</button><div class="nv1-wiz-center"><small>PARTE 1 · PASO 1</small><strong>¡Salvo!</strong></div><span class="nv1-wiz-status">${current===sections.length-1?'Reto final':'En progreso'}</span></div>
      <div class="nv1-wizard-progress"><div class="nv1-wizard-progress-track"><div class="nv1-wizard-progress-bar" style="width:${Math.round((current/Math.max(1,sections.length-1))*100)}%"></div></div><span class="nv1-wizard-count">Sección ${current+1} de ${sections.length}</span></div>
      <div class="nv1-wizard-screen">${renderSection(s)}</div>
      <div class="nv1-wizard-nav"><button type="button" class="nv1-wiz-btn" id="nv1-back" ${current===0?'disabled':''}>← Atrás</button><div class="nv1-wizard-dots">${sections.map((_,i)=>`<button type="button" class="nv1-wizard-dot ${i===current?'active':''} ${i<current?'done':''}" data-i="${i}">${i+1}</button>`).join('')}</div><button type="button" class="nv1-wiz-btn nv1-wiz-btn-primary" id="nv1-next">${current===sections.length-1?'Terminar':'Siguiente →'}</button></div>`;

    view.querySelector('#nv1-home').onclick=volverMenu;
    view.querySelector('#nv1-back').onclick=()=>{if(current>0){current--;render();}};
    view.querySelector('#nv1-next').onclick=()=>{if(current<sections.length-1){current++;render();window.scrollTo({top:view.offsetTop-80,behavior:'smooth'});}else volverMenu();};
    view.querySelectorAll('.nv1-wizard-dot').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.i);if(i<=current){current=i;render();}});
    instalarInteracciones(view);
  }

  function renderSection(s){
    if(s.type==='vf')return `<div class="nv1-wizard-heading"><span class="nv1-badge">Primero: descubre lo que ya sabes</span><h2>Haz una pausa y piensa</h2><p>Responde con sinceridad. No buscamos perfección; vamos a aprender juntos.</p></div><div id="nv1-vf-unico">${vf('Para ser salvo sólo necesito creer que Dios existe.')}${vf('El pecado causa una separación entre Dios y el hombre.')}${vf('Soy salvo por asistir a la iglesia y hacer cosas buenas.')}</div><div class="nv1-wiz-companion"><span>🌱</span><div><strong>Este es tu punto de partida</strong><p>No importa si alguna respuesta no la conoces todavía.</p></div></div>`;
    if(s.type==='exam')return `<div class="nv1-wizard-heading"><span class="nv1-badge">Desafío final</span><h2>Reto de comprensión</h2><p>Esta parte del recorrido tendrá el examen de 8 preguntas y 3 minutos.</p></div><div class="nv1-wiz-card"><strong>Prepararemos aquí el reto final.</strong><p>Tu respuesta y resultado se integrarán al progreso personal.</p></div><div class="nv1-wiz-companion"><span>💬</span><div><strong>Ánimo, ${esc(user.nombre||'hermano/a')}</strong><p>Esto no es una competencia. Es una oportunidad para comprobar lo aprendido.</p></div></div>`;
    return `<div class="nv1-wizard-heading"><span class="nv1-badge">Momento de tu recorrido</span><h2>${esc(s.title)}</h2><p>Tómate tu tiempo. Lee, piensa y avanza cuando estés listo.</p></div><div>${s.items.map(item).join('')}</div><div class="nv1-wiz-companion"><span>💬</span><div><strong>Estoy aquí contigo</strong><p>Avanza a tu ritmo. Puedes volver atrás para repasar.</p></div></div>`;
  }

  function vf(text){return `<article class="nv1-vf-item"><div class="nv1-vf-statement">${esc(text)}</div><div class="nv1-vf-actions"><button type="button" class="nv1-vf-button" data-v="V">V</button><button type="button" class="nv1-vf-button" data-v="F">F</button></div></article>`;}

  function item(r){
    const t=String(r.Tipo||'').trim().toLowerCase(), text=String(r.Texto||'').trim(), ref=String(r['Cita Bíblica']||'').trim(), num=r.Número==null?'':String(r.Número).trim();
    const refBtn=ref?`<button type="button" class="nv1-bible-ref" data-ref="${esc(ref)}">📖 ${esc(ref)}</button>`:'';
    if(t==='versiculo')return `<article class="nv1-wiz-card"><div class="nv1-wiz-label">📖 Palabra de Dios</div><p>${esc(text)}</p>${refBtn}<button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
    if(t==='pregunta'&&/Somos salvos por/i.test(text))return `<article class="nv1-wizard-question nv1-wiz-card nv1-fill-question"><div class="nv1-wiz-label">✍️ Completa la enseñanza</div><div class="nv1-fill-line">Somos salvos por <input class="nv1-blank-input" data-answer="gracia" aria-label="gracia"> por medio de la <input class="nv1-blank-input" data-answer="fe" aria-label="fe">.</div>${refBtn}<div class="nv1-fill-feedback"></div><button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
    if(t==='pregunta')return `<article class="nv1-wizard-question nv1-wiz-card"><div class="nv1-wiz-label">✍️ Pregunta ${esc(num)}</div><h3 class="nv1-wiz-q-title">${esc(text)}</h3>${refBtn}<textarea class="nv1-wiz-answer" data-q="${esc(num)}" placeholder="Escribe aquí lo que piensas..."></textarea><button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
    const label=t==='bienvenida'?'🌱 Bienvenida':t==='enseñanza'?'💡 Enseñanza':t==='ejercicio'?'🎯 Ejercicio':t==='reflexion'?'💭 Reflexión':'✨ Contenido';
    return `<article class="nv1-wiz-card"><div class="nv1-wiz-label">${label}</div><p>${esc(text)}</p>${refBtn}${/fecha\s*:/i.test(text)?'<label class="nv1-date-wiz">📅 Fecha de mi compromiso <input type="date"></label>':''}<button type="button" class="nv1-audio-control">🔊 Escuchar</button></article>`;
  }

  function instalarInteracciones(r){
    r.querySelectorAll('.nv1-vf-item').forEach(item=>item.querySelectorAll('.nv1-vf-button').forEach(btn=>btn.onclick=()=>{item.querySelectorAll('.nv1-vf-button').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');}));
    r.querySelectorAll('.nv1-fill-question').forEach(card=>card.querySelectorAll('.nv1-blank-input').forEach(input=>input.oninput=()=>{const vals=[...card.querySelectorAll('.nv1-blank-input')].map(x=>x.value.trim().toLowerCase());const ok=vals[0]==='gracia'&&vals[1]==='fe';const partial=vals.some(Boolean);const f=card.querySelector('.nv1-fill-feedback');f.className='nv1-fill-feedback '+(ok?'correct':partial?'partial':'wrong');f.textContent=ok?'✓ ¡Muy bien! Has completado correctamente la frase.':partial?'Casi. Revisa las dos respuestas.':'Completa los dos espacios.';}));
    r.querySelectorAll('.nv1-bible-ref').forEach(b=>b.onclick=()=>typeof abrirBibliaNV1_==='function'&&abrirBibliaNV1_(b.dataset.ref));
    r.querySelectorAll('.nv1-audio-control').forEach(b=>b.onclick=()=>{const card=b.closest('article');const c=card.cloneNode(true);c.querySelectorAll('button,input,textarea').forEach(x=>x.remove());const text=(c.innerText||'').replace(/\s+/g,' ').trim();if(!window.speechSynthesis){b.textContent='🔊 Audio no disponible';return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='es-ES';u.rate=.9;u.volume=1;const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>/^es(-|_)/i.test(v.lang));if(voice)u.voice=voice;u.onend=()=>b.textContent='🔊 Escuchar';u.onerror=()=>b.textContent='🔊 Reintentar';b.textContent='⏸ Detener';window.speechSynthesis.speak(u);});
    r.querySelectorAll('input[type=date]').forEach(i=>i.value=localStorage.getItem('nv1_date_'+(user.idUsuario||user.correo))||'');
  }

  function volverMenu(){view?.remove();crearMenu();window.scrollTo({top:0,behavior:'smooth'});}
})();
