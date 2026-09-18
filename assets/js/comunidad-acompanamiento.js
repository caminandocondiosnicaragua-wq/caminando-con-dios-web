/* CAMINANDO CON DIOS · ACOMPAÑAMIENTO VISUAL DE COMUNIDAD */
(function(){
  const MENSAJES={
    "Antes de comenzar":"Haz una pausa. No tienes que saberlo todo antes de empezar. Vamos a descubrirlo juntos.",
    "Bienvenida":"Qué bueno que estás aquí. Lee con calma; este recorrido es para crecer paso a paso.",
    "Enseñanza":"Pensemos en esto juntos. La Palabra no solo se lee: también transforma nuestra manera de vivir.",
    "Reflexión":"Tómate un momento. ¿Qué está diciéndote Dios a través de lo que acabas de leer?",
    "Ejercicio":"Ahora llévalo a la práctica. Un pequeño paso también forma parte de tu crecimiento.",
    "Pregunta":"Busca en la Palabra y responde con tus propias palabras. No tengas prisa.",
    "Versículo":"Lee este pasaje despacio. ¿Qué verdad quieres guardar hoy en tu corazón?",
    "Reto de comprensión":"Has llegado al reto. Recuerda lo que aprendiste y vuelve a la Palabra cuando lo necesites."
  };
  window.crearAcompanamientoAvatarNV_=function(tipo,mensaje){
    const avatar=typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null;
    if(!avatar)return "";
    const texto=mensaje||MENSAJES[tipo]||MENSAJES["Enseñanza"];
    return `<aside class="nv-acompanamiento" aria-label="Acompañamiento de ${avatar.nombre}">
      <div class="nv-acompanamiento-personaje"><img src="${avatar.imagen}" alt="${avatar.nombre}" loading="lazy"></div>
      <div class="nv-acompanamiento-pensamiento"><span class="nv-acompanamiento-nombre">${avatar.nombre}</span><p>${esc_(texto)}</p></div>
    </aside>`;
  };
  window.crearPensamientoBiblicoNV_=function(referencia){
    const avatar=typeof obtenerAvatarComunidad==="function"?obtenerAvatarComunidad():null;
    if(!avatar)return "";
    const ref=String(referencia||"").trim();
    const texto=ref?`Leamos ${ref} con calma. ¿Qué verdad de este pasaje quieres llevar contigo?`:MENSAJES["Versículo"];
    return `<div class="nv-acompanamiento-biblia">
      <div class="nv-acompanamiento-biblia-avatar"><img src="${avatar.imagen}" alt="${avatar.nombre}" loading="lazy"></div>
      <div class="nv-acompanamiento-biblia-burbuja"><span>${avatar.nombre} piensa...</span><p>${esc_(texto)}</p></div>
    </div>`;
  };
  function esc_(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}
})();