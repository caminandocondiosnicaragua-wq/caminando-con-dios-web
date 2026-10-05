document.addEventListener("DOMContentLoaded", iniciarSelectorPasosNV1_);

const NV_STEPS_TOTAL = 13;
const NV_STEP_INFO = [
  {icon:"🌱", title:"Paso 1", subtitle:"¡Salvo!", url:"nueva-vida-parte-1-paso-1.html"},
  {icon:"📖", title:"Paso 2", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-2.html"},
  {icon:"✝️", title:"Paso 3", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-3.html"},
  {icon:"❤️", title:"Paso 4", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-4.html"},
  {icon:"🕊️", title:"Paso 5", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-5.html"},
  {icon:"🙏", title:"Paso 6", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-6.html"},
  {icon:"📜", title:"Paso 7", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-7.html"},
  {icon:"💡", title:"Paso 8", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-8.html"},
  {icon:"🛡️", title:"Paso 9", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-9.html"},
  {icon:"🌿", title:"Paso 10", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-10.html"},
  {icon:"🧭", title:"Paso 11", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-11.html"},
  {icon:"🔥", title:"Paso 12", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-12.html"},
  {icon:"👑", title:"Paso 13", subtitle:"Próximamente", url:"nueva-vida-parte-1-paso-13.html"}
];

function obtenerEstadoSelectorNV1_(){
  const usuario=typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null;
  if(!usuario)return null;
  const key="caminando_con_dios_nv1_"+(usuario.idUsuario||usuario.correo);
  try{return JSON.parse(localStorage.getItem(key)||"{}");}catch(_){return {};}
}

function iniciarSelectorPasosNV1_(){
  const usuario=typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null;
  if(!usuario){window.location.href="comunidad.html";return;}
  const app=document.getElementById("app");
  if(!app)return;
  const nombre=escaparSelectorNV1_(usuario.nombre||"hermano/a");
  const correo=escaparSelectorNV1_(usuario.correo||"");
  const avatar=typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null;
  const avatarHtml=avatar
    ? '<img src="'+escaparSelectorNV1_(avatar.imagen)+'" alt="'+escaparSelectorNV1_(avatar.nombre||"Mi avatar")+'">'
    : '<span>👋</span>';
  const avatarGrande=avatar
    ? '<div class="nvsteps-avatar"><img src="'+escaparSelectorNV1_(avatar.imagen)+'" alt="'+escaparSelectorNV1_(avatar.nombre||"Mi avatar")+'"></div>'
    : '<div class="nvsteps-avatar"><span>🌱</span></div>';

  app.innerHTML=
    crearHeader()+
    '<div class="nvsteps-page"><div class="nvsteps-wrap">'+
      '<div class="nvsteps-user">'+
        '<div class="nvsteps-user-avatar">'+avatarHtml+'</div>'+
        '<div class="nvsteps-user-info"><strong>Hola, '+nombre+'</strong><span>'+correo+' · Tu recorrido de discipulado es personal.</span></div>'+
        '<button class="nvsteps-logout" type="button" onclick="salirSelectorNV1_()">Cerrar sesión</button>'+
      '</div>'+
      '<section class="nvsteps-hero">'+
        '<div class="nvsteps-hero-copy">'+
          '<div class="nvsteps-kicker">Nueva Vida en Cristo · Parte 1</div>'+
          '<h1>Un paso a la vez</h1>'+
          '<p>Esta parte tiene 13 pasos. Avanza en orden, aprende, responde y deja que cada paso te prepare para el siguiente.</p>'+
          '<div class="nvsteps-companion">'+
            avatarGrande+
            '<div class="nvsteps-bubble"><strong id="nvsteps-avatar-title">Estoy aquí contigo</strong><p id="nvsteps-avatar-text">Comencemos por el Paso 1. Cuando completes un paso, se habilitará el siguiente.</p></div>'+
          '</div>'+
        '</div>'+
        '<div class="nvsteps-hero-art"><img src="assets/img/hero.png" alt="Caminar con Dios"></div>'+
      '</section>'+
      '<section class="nvsteps-menu">'+
        '<div class="nvsteps-menu-head"><h2>Los 13 pasos de esta parte</h2><p>Solo tendrás disponible el paso que corresponde a tu avance.</p></div>'+
        '<div class="nvsteps-progress"><div class="nvsteps-progress-row"><span>Tu avance en Parte 1</span><strong id="nvsteps-progress-text">0%</strong></div><div class="nvsteps-track"><div id="nvsteps-progress-bar" class="nvsteps-bar"></div></div></div>'+
        '<div id="nvsteps-grid" class="nvsteps-grid"></div>'+
        '<div id="nvsteps-message" class="nvsteps-message" role="status"></div>'+
        '<p class="nvsteps-note">Los pasos bloqueados se habilitarán conforme completes tu recorrido.</p>'+
      '</section>'+
    '</div></div>'+
    crearFooter();

  app.style.display="block";
  iniciarHeader();
  iniciarFooter();
  renderizarPasosNV1_();
}

function renderizarPasosNV1_(){
  const estado=obtenerEstadoSelectorNV1_()||{};
  const paso1Completado=estado.completado===true;
  const usuario=typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null;
  let paso2Completado=false;
  if(usuario){try{paso2Completado=JSON.parse(localStorage.getItem("caminando_con_dios_nv1_paso_2_"+(usuario.idUsuario||usuario.correo))||"{}").completado===true}catch(_){}
  }
  const maxDisponible=paso2Completado?3:(paso1Completado?2:1);
  const grid=document.getElementById("nvsteps-grid");
  if(!grid)return;
  grid.innerHTML=NV_STEP_INFO.map((step,index)=>{
    const numero=index+1;
    const disponible=numero<=maxDisponible;
    const completado=numero===1&&paso1Completado;
    const estadoTexto=completado?"✓ Completado":(disponible?"▶ Comenzar":"🔒 Bloqueado");
    return '<button type="button" class="nvsteps-card '+(disponible?"available":"locked")+' '+(completado?"done":"")+'" '+(disponible?'onclick="abrirPasoNV1_('+numero+')"':'disabled aria-disabled="true"')+'>'+
      '<span class="nvsteps-lock">'+(disponible?"":"🔒")+'</span>'+
      '<span class="nvsteps-icon">'+step.icon+'</span>'+
      '<strong>'+step.title+'</strong><small>'+step.subtitle+'</small><span class="nvsteps-state">'+estadoTexto+'</span>'+
    '</button>';
  }).join("");
  const porcentaje=paso1Completado?Math.round((2/NV_STEPS_TOTAL)*100):0;
  const bar=document.getElementById("nvsteps-progress-bar"),txt=document.getElementById("nvsteps-progress-text");
  if(bar)bar.style.width=porcentaje+"%";
  if(txt)txt.textContent=porcentaje+"%";
}

function paso2CompletadoSelectorNV1_(){const usuario=typeof obtenerUsuarioComunidad==="function"?obtenerUsuarioComunidad():null;if(!usuario)return false;try{return JSON.parse(localStorage.getItem("caminando_con_dios_nv1_paso_2_"+(usuario.idUsuario||usuario.correo))||"{}").completado===true}catch(_){return false}}

function abrirPasoNV1_(numero){
  const estado=obtenerEstadoSelectorNV1_()||{};
  if(numero===1){window.location.href=NV_STEP_INFO[0].url;return;}
  if(numero===2 && estado.completado===true){ window.location.href="nueva-vida-parte-1-paso-2.html"; return; }
  if(numero===3 && paso2CompletadoSelectorNV1_()){ const msg=document.getElementById("nvsteps-message"); if(msg){msg.textContent="El Paso 3 ya está habilitado. Su contenido se incorporará cuando lo construyamos.";msg.classList.add("show");} return; }
}

function salirSelectorNV1_(){
  if(typeof cerrarSesionComunidad==="function"){cerrarSesionComunidad();return;}
  try{localStorage.removeItem("usuarioComunidad");}catch(_){}
  window.location.href="comunidad.html";
}

function escaparSelectorNV1_(texto){
  return String(texto??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
