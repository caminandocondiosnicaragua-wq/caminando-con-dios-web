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
    const vfKeys=new Set([
      "Falso o Verdadero — Creo que Dios existe",
      "Falso o Verdadero — El pecado separa",
      "Falso o Verdadero — Iglesia y buenas obras"
    ]);
    const gruposDefinidos=[
      "Bienvenida a la Familia de Dios",
      "Ejercicios Espirituales",
      "Para decidir",
      "Para recibir a Cristo",
      "Para reflexionar",
      "La vida pasada",
      "La obra de Dios",
      "La nueva vida",
      "Resumamos",
      "Para crecer"
    ];
    const groups=[];
    gruposDefinidos.forEach(title=>{
      const items=rows.filter(r=>String(r.Seccion||'').trim()===title);
      if(items.length)groups.push({title,items});
    });
    sections=[
      {type:'vf',title:'Falso o Verdadero',intro:'Antes de continuar, responde las tres afirmaciones. Debes responder las tres: en cada una elige Verdadero o Falso.'},
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
    const acomp=(tipo,mensaje)=>typeof crearAcompanamientoAvatarNV_==='function'?crearAcompanamientoAvatarNV_(tipo,mensaje):'';
    if(s.type==='vf')return `<div class="nv1-wizard-heading"><span class="nv1-badge">Primero: descubre lo que ya sabes</span><h2>Falso o Verdadero</h2><p>${s.intro}</p></div><div id="wiz-vf"><div class="nv1-vf-item"><div><div class="nv1-vf-statement">Para ser salvo sólo necesito creer que Dios existe.</div><button class="nv1-bible-ref" type="button" data-ref="Efesios 2:8-9">📖 Efesios 2:8-9 · apoyo bíblico</button></div><div class="nv1-vf-actions"><button class="nv1-vf-button" data-v="V">V<span>Verdadero</span></button><button class="nv1-vf-button" data-v="F">F<span>Falso</span></button></div></div><div class="nv1-vf-item"><div><div class="nv1-vf-statement">El pecado causa una separación entre Dios y el hombre.</div><button class="nv1-bible-ref" type="button" data-ref="Romanos 6:23">📖 Romanos 6:23 · apoyo bíblico</button></div><div class="nv1-vf-actions"><button class="nv1-vf-button" data-v="V">V<span>Verdadero</span></button><button class="nv1-vf-button" data-v="F">F<span>Falso</span></button></div></div><div class="nv1-vf-item"><div><div class="nv1-vf-statement">Soy salvo por asistir a la iglesia y hacer cosas buenas.</div><button class="nv1-bible-ref" type="button" data-ref="Efesios 2:8-9">📖 Efesios 2:8-9 · apoyo bíblico</button></div><div class="nv1-vf-actions"><button class="nv1-vf-button" data-v="V">V<span>Verdadero</span></button><button class="nv1-vf-button" data-v="F">F<span>Falso</span></button></div></div></div>${acomp("Falso o Verdadero","Las tres afirmaciones deben responderse. La cita bíblica es una ayuda para estudiar; primero elige Verdadero o Falso en cada una.")}`;
    if(s.type==='exam')return `<div class="nv1-wizard-heading"><span class="nv1-badge">Desafío final · modo juego</span><h2>Reto de comprensión</h2><p>${s.intro}</p></div><div class="nv1-exam-wiz" id="wiz-exam"></div>${acomp("Reto de comprensión","Llegaste al reto. Recuerda lo que aprendiste y, si una pregunta te cuesta, vuelve a la Palabra.")}`;
    return `<div class="nv1-wizard-heading"><span class="nv1-badge">Momento de tu recorrido</span><h2>${esc(s.title)}</h2><p>Tómate tu tiempo. Lee, piensa y avanza cuando estés listo.</p></div><div>${s.items.map(crearItem).join('')}</div>${acomp(s.title,"Estoy aquí contigo. Lee con calma y piensa cómo esta enseñanza se relaciona con tu caminar con Dios.")}`;
  }


