/*
 * UI DE TARJETAS BIBLIA
 *
 * Mantiene los códigos internos de API.Bible y cambia solamente
 * la presentación de testamentos, grupos y libros según la Biblia
 * seleccionada. Esto evita depender de los nombres españoles.
 */

const BIBLIA_UI_CODIGOS = [
  "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
  "MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"
];

const BIBLIA_UI_NOMBRES = {
  es:["Génesis","Éxodo","Levítico","Números","Deuteronomio","Josué","Jueces","Rut","1 Samuel","2 Samuel","1 Reyes","2 Reyes","1 Crónicas","2 Crónicas","Esdras","Nehemías","Ester","Job","Salmos","Proverbios","Eclesiastés","Cantares","Isaías","Jeremías","Lamentaciones","Ezequiel","Daniel","Oseas","Joel","Amós","Abdías","Jonás","Miqueas","Nahúm","Habacuc","Sofonías","Hageo","Zacarías","Malaquías","Mateo","Marcos","Lucas","Juan","Hechos","Romanos","1 Corintios","2 Corintios","Gálatas","Efesios","Filipenses","Colosenses","1 Tesalonicenses","2 Tesalonicenses","1 Timoteo","2 Timoteo","Tito","Filemón","Hebreos","Santiago","1 Pedro","2 Pedro","1 Juan","2 Juan","3 Juan","Judas","Apocalipsis"],
  en:["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"],
  pt:["Gênesis","Êxodo","Levítico","Números","Deuteronômio","Josué","Juízes","Rute","1 Samuel","2 Samuel","1 Reis","2 Reis","1 Crônicas","2 Crônicas","Esdras","Neemias","Ester","Jó","Salmos","Provérbios","Eclesiastes","Cânticos","Isaías","Jeremias","Lamentações","Ezequiel","Daniel","Oseias","Joel","Amós","Obadias","Jonas","Miqueias","Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias","Mateus","Marcos","Lucas","João","Atos","Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses","Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo","Tito","Filemom","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"],
  fr:["Genèse","Exode","Lévitique","Nombres","Deutéronome","Josué","Juges","Ruth","1 Samuel","2 Samuel","1 Rois","2 Rois","1 Chroniques","2 Chroniques","Esdras","Néhémie","Esther","Job","Psaumes","Proverbes","Ecclésiaste","Cantique des cantiques","Ésaïe","Jérémie","Lamentations","Ézéchiel","Daniel","Osée","Joël","Amos","Abdias","Jonas","Michée","Nahum","Habacuc","Sophonie","Aggée","Zacharie","Malachie","Matthieu","Marc","Luc","Jean","Actes","Romains","1 Corinthiens","2 Corinthiens","Galates","Éphésiens","Philippiens","Colossiens","1 Thessaloniciens","2 Thessaloniciens","1 Timothée","2 Timothée","Tite","Philémon","Hébreux","Jacques","1 Pierre","2 Pierre","1 Jean","2 Jean","3 Jean","Jude","Apocalypse"],
  de:["1. Mose","2. Mose","3. Mose","4. Mose","5. Mose","Josua","Richter","Rut","1. Samuel","2. Samuel","1. Könige","2. Könige","1. Chronik","2. Chronik","Esra","Nehemia","Ester","Hiob","Psalmen","Sprüche","Prediger","Hoheslied","Jesaja","Jeremia","Klagelieder","Hesekiel","Daniel","Hosea","Joel","Amos","Obadja","Jona","Micha","Nahum","Habakuk","Zefanja","Haggai","Sacharja","Maleachi","Matthäus","Markus","Lukas","Johannes","Apostelgeschichte","Römer","1. Korinther","2. Korinther","Galater","Epheser","Philipper","Kolosser","1. Thessalonicher","2. Thessalonicher","1. Timotheus","2. Timotheus","Titus","Philemon","Hebräer","Jakobus","1. Petrus","2. Petrus","1. Johannes","2. Johannes","3. Johannes","Judas","Offenbarung"],
  nl:["Genesis","Exodus","Leviticus","Numeri","Deuteronomium","Jozua","Rechters","Ruth","1 Samuël","2 Samuël","1 Koningen","2 Koningen","1 Kronieken","2 Kronieken","Ezra","Nehemia","Esther","Job","Psalmen","Spreuken","Prediker","Hooglied","Jesaja","Jeremia","Klaagliederen","Ezechiël","Daniël","Hosea","Joël","Amos","Obadja","Jona","Micha","Nahum","Habakuk","Sefanja","Haggai","Zacharia","Maleachi","Mattheüs","Marcus","Lucas","Johannes","Handelingen","Romeinen","1 Korintiërs","2 Korintiërs","Galaten","Efeziërs","Filippenzen","Kolossenzen","1 Thessalonicenzen","2 Thessalonicenzen","1 Timotheüs","2 Timotheüs","Titus","Filemon","Hebreeën","Jakobus","1 Petrus","2 Petrus","1 Johannes","2 Johannes","3 Johannes","Judas","Openbaring"],
  ro:["Geneza","Exodul","Leviticul","Numeri","Deuteronomul","Iosua","Judecători","Rut","1 Samuel","2 Samuel","1 Împărați","2 Împărați","1 Cronici","2 Cronici","Ezra","Neemia","Estera","Iov","Psalmii","Proverbele","Eclesiastul","Cântarea Cântărilor","Isaia","Ieremia","Plângerile","Ezechiel","Daniel","Osea","Ioel","Amos","Obadia","Iona","Mica","Naum","Habacuc","Țefania","Hagai","Zaharia","Maleahi","Matei","Marcu","Luca","Ioan","Faptele Apostolilor","Romani","1 Corinteni","2 Corinteni","Galateni","Efeseni","Filipeni","Coloseni","1 Tesaloniceni","2 Tesaloniceni","1 Timotei","2 Timotei","Tit","Filimon","Evrei","Iacov","1 Petru","2 Petru","1 Ioan","2 Ioan","3 Ioan","Iuda","Apocalipsa"],
  ru:["Бытие","Исход","Левит","Числа","Второзаконие","Иисус Навин","Судьи","Руфь","1 Царств","2 Царств","3 Царств","4 Царств","1 Паралипоменон","2 Паралипоменон","Ездра","Неемия","Есфирь","Иов","Псалтирь","Притчи","Екклесиаст","Песня Песней","Исаия","Иеремия","Плач Иеремии","Иезекииль","Даниил","Осия","Иоиль","Амос","Авдий","Иона","Михей","Наум","Аввакум","Софония","Аггей","Захария","Малахия","Матфей","Марка","Луки","Иоанна","Деяния","Римлянам","1 Коринфянам","2 Коринфянам","Галатам","Ефесянам","Филиппийцам","Колоссянам","1 Фессалоникийцам","2 Фессалоникийцам","1 Тимофею","2 Тимофею","Титу","Филимону","Евреям","Иакова","1 Петра","2 Петра","1 Иоанна","2 Иоанна","3 Иоанна","Иуды","Откровение"],
  sv:["Första Moseboken","Andra Moseboken","Tredje Moseboken","Fjärde Moseboken","Femte Moseboken","Josua","Domarboken","Rut","Första Samuelsboken","Andra Samuelsboken","Första Kungaboken","Andra Kungaboken","Första Krönikeboken","Andra Krönikeboken","Esra","Nehemja","Ester","Job","Psaltaren","Ordspråksboken","Predikaren","Höga Visan","Jesaja","Jeremia","Klagovisorna","Hesekiel","Daniel","Hosea","Joel","Amos","Obadja","Jona","Mika","Nahum","Habackuk","Sefanja","Haggai","Sakarja","Malaki","Matteusevangeliet","Markusevangeliet","Lukasevangeliet","Johannesevangeliet","Apostlagärningarna","Romarbrevet","Första Korinthierbrevet","Andra Korinthierbrevet","Galaterbrevet","Efesierbrevet","Filipperbrevet","Kolosserbrevet","Första Thessalonikerbrevet","Andra Thessalonikerbrevet","Första Timotheosbrevet","Andra Timotheosbrevet","Titusbrevet","Filemonbrevet","Hebreerbrevet","Jakobsbrevet","Första Petrusbrevet","Andra Petrusbrevet","Första Johannesbrevet","Andra Johannesbrevet","Tredje Johannesbrevet","Judasbrevet","Uppenbarelseboken"],
  da:["Første Mosebog","Anden Mosebog","Tredje Mosebog","Fjerde Mosebog","Femte Mosebog","Josvabogen","Dommerbogen","Ruths Bog","Første Samuelsbog","Anden Samuelsbog","Første Kongebog","Anden Kongebog","Første Krønikebog","Anden Krønikebog","Ezras Bog","Nehemias' Bog","Esters Bog","Jobs Bog","Salmernes Bog","Ordsprogenes Bog","Prædikerens Bog","Højsangen","Esajas' Bog","Jeremias' Bog","Klagesangene","Ezekiels Bog","Daniels Bog","Hoseas' Bog","Joels Bog","Amos' Bog","Obadias' Bog","Jonas' Bog","Mikas Bog","Nahums Bog","Habakkuks Bog","Sefanias' Bog","Haggajs Bog","Zakarias' Bog","Malakias' Bog","Matthæusevangeliet","Markusevangeliet","Lukasevangeliet","Johannesevangeliet","Apostlenes Gerninger","Romerbrevet","Første Korintherbrev","Andet Korintherbrev","Galaterbrevet","Efeserbrevet","Filipperbrevet","Kolossenserbrevet","Første Thessalonikerbrev","Andet Thessalonikerbrev","Første Timotheusbrev","Andet Timotheusbrev","Titusbrevet","Filemonbrevet","Hebræerbrevet","Jakobsbrevet","Første Petersbrev","Andet Petersbrev","Første Johannesbrev","Andet Johannesbrev","Tredje Johannesbrev","Judas' Brev","Johannes' Åbenbaring"],
  ja:["創世記","出エジプト記","レビ記","民数記","申命記","ヨシュア記","士師記","ルツ記","サムエル記第一","サムエル記第二","列王記第一","列王記第二","歴代誌第一","歴代誌第二","エズラ記","ネヘミヤ記","エステル記","ヨブ記","詩篇","箴言","伝道者の書","雅歌","イザヤ書","エレミヤ書","哀歌","エゼキエル書","ダニエル書","ホセア書","ヨエル書","アモス書","オバデヤ書","ヨナ書","ミカ書","ナホム書","ハバクク書","ゼパニヤ書","ハガイ書","ゼカリヤ書","マラキ書","マタイの福音書","マルコの福音書","ルカの福音書","ヨハネの福音書","使徒の働き","ローマ人への手紙","コリント人への手紙第一","コリント人への手紙第二","ガラテヤ人への手紙","エペソ人への手紙","ピリピ人への手紙","コロサイ人への手紙","テサロニケ人への手紙第一","テサロニケ人への手紙第二","テモテへの手紙第一","テモテへの手紙第二","テトスへの手紙","ピレモンへの手紙","ヘブル人への手紙","ヤコブの手紙","ペテロの手紙第一","ペテロの手紙第二","ヨハネの手紙第一","ヨハネの手紙第二","ヨハネの手紙第三","ユダの手紙","ヨハネの黙示録"],
  ko:["창세기","출애굽기","레위기","민수기","신명기","여호수아","사사기","룻기","사무엘상","사무엘하","열왕기상","열왕기하","역대상","역대하","에스라","느헤미야","에스더","욥기","시편","잠언","전도서","아가","이사야","예레미야","예레미야애가","에스겔","다니엘","호세아","요엘","아모스","오바댜","요나","미가","나훔","하박국","스바냐","학개","스가랴","말라기","마태복음","마가복음","누가복음","요한복음","사도행전","로마서","고린도전서","고린도후서","갈라디아서","에베소서","빌립보서","골로새서","데살로니가전서","데살로니가후서","디모데전서","디모데후서","디도서","빌레몬서","히브리서","야고보서","베드로전서","베드로후서","요한일서","요한이서","요한삼서","유다서","요한계시록"]
};

const BIBLIA_UI_TESTAMENTOS = {
  es:["Antiguo Testamento","Nuevo Testamento"], en:["Old Testament","New Testament"], pt:["Antigo Testamento","Novo Testamento"], fr:["Ancien Testament","Nouveau Testament"], de:["Altes Testament","Neues Testament"], nl:["Oude Testament","Nieuwe Testament"], ro:["Vechiul Testament","Noul Testament"], ru:["Ветхий Завет","Новый Завет"], sv:["Gamla testamentet","Nya testamentet"], da:["Det Gamle Testamente","Det Nye Testamente"], ja:["旧約聖書","新約聖書"], ko:["구약성경","신약성경"]
};

const BIBLIA_UI_GRUPOS = {
  es:["Pentateuco","Históricos","Poéticos y Sapienciales","Profetas Mayores","Profetas Menores","Evangelios","Historia","Cartas de Pablo","Cartas Generales","Profecía"],
  en:["Pentateuch","Historical Books","Poetry and Wisdom","Major Prophets","Minor Prophets","Gospels","History","Paul's Letters","General Letters","Prophecy"],
  pt:["Pentateuco","Históricos","Poéticos e Sapienciais","Profetas Maiores","Profetas Menores","Evangelhos","História","Cartas de Paulo","Cartas Gerais","Profecia"],
  fr:["Pentateuque","Livres historiques","Poésie et sagesse","Grands prophètes","Petits prophètes","Évangiles","Histoire","Lettres de Paul","Lettres générales","Prophétie"],
  de:["Pentateuch","Geschichtsbücher","Poetische und Weisheitsbücher","Große Propheten","Kleine Propheten","Evangelien","Geschichte","Paulusbriefe","Allgemeine Briefe","Prophetie"],
  nl:["Pentateuch","Historische boeken","Poëtische en wijsheidsboeken","Grote profeten","Kleine profeten","Evangeliën","Geschiedenis","Brieven van Paulus","Algemene brieven","Profetie"],
  ro:["Pentateuh","Cărți istorice","Poezie și înțelepciune","Profeți mari","Profeți mici","Evanghelii","Istorie","Epistolele lui Pavel","Epistole generale","Profeție"],
  ru:["Пятикнижие","Исторические книги","Поэзия и мудрость","Великие пророки","Малые пророки","Евангелия","История","Послания Павла","Общие послания","Пророчество"],
  sv:["Moseböckerna","Historiska böcker","Poetiska och vishetsböcker","Stora profeterna","Små profeterna","Evangelierna","Historia","Paulus brev","Allmänna brev","Profetia"],
  da:["Mosebøgerne","Historiske bøger","Poetiske og visdomsbøger","De store profeter","De små profeter","Evangelierne","Historie","Paulus' breve","De almindelige breve","Profeti"],
  ja:["モーセ五書","歴史書","詩歌・知恵文学","大預言書","小預言書","福音書","歴史書","パウロの手紙","公同書簡","預言"],
  ko:["모세오경","역사서","시가서","대선지서","소선지서","복음서","역사서","바울서신","공동서신","예언서"]
};

const BIBLIA_UI_GRUPOS_CODIGOS = {
  antiguo:[
    {titulo:0,codigos:["GEN","EXO","LEV","NUM","DEU"]},
    {titulo:1,codigos:["JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST"]},
    {titulo:2,codigos:["JOB","PSA","PRO","ECC","SNG"]},
    {titulo:3,codigos:["ISA","JER","LAM","EZK","DAN"]},
    {titulo:4,codigos:["HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL"]}
  ],
  nuevo:[
    {titulo:5,codigos:["MAT","MRK","LUK","JHN"]},
    {titulo:6,codigos:["ACT"]},
    {titulo:7,codigos:["ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM"]},
    {titulo:8,codigos:["HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD"]},
    {titulo:9,codigos:["REV"]}
  ]
};

function bibliaUIIdioma(){
  const b = typeof obtenerBibliaSeleccionada === "function" ? obtenerBibliaSeleccionada() : null;
  return b && BIBLIA_UI_NOMBRES[b.idioma] ? b.idioma : "es";
}

function bibliaUIIndice(codigo){ return BIBLIA_UI_CODIGOS.indexOf(codigo); }

function bibliaUINombre(codigo){
  const i = bibliaUIIndice(codigo), idioma = bibliaUIIdioma();
  return (BIBLIA_UI_NOMBRES[idioma] || BIBLIA_UI_NOMBRES.es)[i] || BIBLIA_UI_NOMBRES.es[i] || codigo;
}

function bibliaUICodigo(nombre){
  const idioma = bibliaUIIdioma();
  const lista = BIBLIA_UI_NOMBRES[idioma] || BIBLIA_UI_NOMBRES.es;
  const normal = normalizarTextoBiblia(nombre);
  let i = lista.findIndex(n => normalizarTextoBiblia(n) === normal);
  if(i < 0) i = BIBLIA_UI_NOMBRES.es.findIndex(n => normalizarTextoBiblia(n) === normal);
  return i >= 0 ? BIBLIA_UI_CODIGOS[i] : null;
}

/* Sobrescribimos el conversor original para que acepte nombres localizados. */
function obtenerCodigoLibro(nombre){ return bibliaUICodigo(nombre); }
function obtenerLibros(){
  const idioma = bibliaUIIdioma();
  return BIBLIA_UI_NOMBRES[idioma] || BIBLIA_UI_NOMBRES.es;
}
function obtenerAbreviaturaLibro(libro){
  const codigo = bibliaUICodigo(libro) || "";
  return codigo;
}

function crearSelectorTestamentos(){
  const b = obtenerBibliaSeleccionada();
  const soloNT = b && b.alcance === "Nuevo Testamento";
  const t = BIBLIA_UI_TESTAMENTOS[bibliaUIIdioma()] || BIBLIA_UI_TESTAMENTOS.es;
  const antiguo = soloNT ? "" : `<button class="testamento activo" data-testamento="antiguo"><span>📜</span><strong>${t[0]}</strong><small>39 libros</small></button>`;
  const nuevoClase = soloNT ? "testamento activo" : "testamento";
  return `<div class="testamentos">${antiguo}<button class="${nuevoClase}" data-testamento="nuevo"><span>✝️</span><strong>${t[1]}</strong><small>${soloNT ? "Nuevo Testamento" : "27 libros"}</small></button></div><div id="clasificacionesBiblia">${crearClasificaciones(soloNT ? "nuevo" : "antiguo")}</div>`;
}

function crearClasificaciones(testamento){
  const idioma = bibliaUIIdioma();
  const grupos = BIBLIA_UI_GRUPOS_CODIGOS[testamento] || [];
  const titulos = BIBLIA_UI_GRUPOS[idioma] || BIBLIA_UI_GRUPOS.es;
  return grupos.map(grupo => `<section class="grupo-biblia"><h3>${titulos[grupo.titulo]}</h3><div class="libros-grid">${grupo.codigos.map(codigo => `<button class="libro-card" data-libro="${bibliaUINombre(codigo)}"><span class="libro-lomo">${codigo}</span><span class="libro-nombre">${bibliaUINombre(codigo)}</span></button>`).join("")}</div></section>`).join("");
}

function seleccionarTestamento(testamento){
  document.querySelectorAll(".testamento").forEach(b => b.classList.toggle("activo", b.dataset.testamento === testamento));
  const zona = document.getElementById("clasificacionesBiblia");
  if(zona) zona.innerHTML = crearClasificaciones(testamento);
}

function cambiarTraduccionBiblia(evento){
  const biblia = obtenerBibliaPorId(evento.target.value);
  if(!biblia) return;
  guardarBibliaSeleccionada(biblia.id);
  const datos = document.querySelector(".datos-traduccion-biblia");
  if(datos) datos.innerHTML = `<span><strong>Idioma:</strong> ${biblia.idiomaNombre}</span><span><strong>Traducción:</strong> ${obtenerEtiquetaBiblia(biblia)}</span><span><strong>Titular:</strong> ${biblia.titular}</span>`;
  const contenido = document.getElementById("bibliaContenido");
  if(contenido) contenido.innerHTML = crearSelectorTestamentos();
}

function mostrarCapitulosBiblia(libro, capituloInicial=null, versiculoInicio=null, versiculoFin=null){
  const codigo = obtenerCodigoLibro(libro);
  if(!codigo) return;
  const cantidad = obtenerCantidadCapitulos(codigo);
  const nombre = bibliaUINombre(codigo);
  const botones = Array.from({length:cantidad},(_,i)=>`<button class="capitulo-biblia" data-libro="${nombre}" data-capitulo="${i+1}">${i+1}</button>`).join("");
  const zona = document.getElementById("bibliaContenido");
  if(!zona) return;
  zona.innerHTML = `<div class="ruta-biblia"><button id="volverBiblia">← Libros</button><h2>${nombre}</h2><p>Selecciona un capítulo</p></div><div class="capitulos-grid">${botones}</div>`;
  document.getElementById("volverBiblia").addEventListener("click",()=>{ zona.innerHTML=crearSelectorTestamentos(); });
  document.querySelectorAll(".capitulo-biblia").forEach(b=>b.addEventListener("click",()=>leerCapituloBiblia(b.dataset.libro,Number(b.dataset.capitulo))));
  if(capituloInicial) leerCapituloBiblia(nombre,capituloInicial,versiculoInicio,versiculoFin);
}

function interpretarBusquedaBiblia(referencia){
  if(!referencia) return null;
  const texto=referencia.trim().replace(/\s+/g," ");
  const m=texto.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
  if(!m){ const libro=buscarLibroBibliaFlexible(texto); return libro?{libro,codigo:obtenerCodigoLibro(libro)}:null; }
  const libro=buscarLibroBibliaFlexible(m[1]);
  if(!libro) return null;
  const inicio=m[3]?Number(m[3]):null;
  return {libro,codigo:obtenerCodigoLibro(libro),capitulo:Number(m[2]),versiculoInicio:inicio,versiculoFin:m[4]?Number(m[4]):inicio};
}

/* Si una Biblia tiene libros localizados, el lector sigue enviando el código API real. */
async function leerCapituloBiblia(libro,capitulo,versiculoInicio=null,versiculoFin=null){
  const codigo=obtenerCodigoLibro(libro);
  const contenido=document.getElementById("bibliaContenido");
  if(!codigo){ if(contenido) contenido.innerHTML=`<div class="error-biblia"><h3>No se pudo identificar el libro</h3><p>La Biblia seleccionada no tiene este libro en el catálogo local.</p></div>`; return; }
  if(contenido) contenido.innerHTML=`<div class="cargando-biblia">Cargando ${bibliaUINombre(codigo)} ${capitulo}…</div>`;
  try{
    const biblia=obtenerBibliaSeleccionada();
    const datos=await obtenerCapituloBiblia(codigo,capitulo,biblia.id);
    contenido.innerHTML=crearLectorBiblia(datos,bibliaUINombre(codigo),capitulo,versiculoInicio,versiculoFin);
    activarControlesLector(bibliaUINombre(codigo),capitulo);
    if(versiculoInicio) solicitarEnfoqueVersiculo(versiculoInicio);
  }catch(error){
    contenido.innerHTML=`<div class="error-biblia"><h3>No se pudo cargar el capítulo</h3><p>${error.message}</p><button id="volverCapitulos">Volver a capítulos</button></div>`;
    document.getElementById("volverCapitulos").addEventListener("click",()=>mostrarCapitulosBiblia(bibliaUINombre(codigo)));
  }
}
