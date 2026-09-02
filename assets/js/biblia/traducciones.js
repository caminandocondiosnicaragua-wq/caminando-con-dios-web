/************************************************
 * CAMINANDO CON DIOS
 * CATÁLOGO DE BIBLIAS PARA biblia.html
 * Independiente de DEVOCIONAL y ESTUDIO.
 ************************************************/

const BIBLIAS_PAGINA = [
    {id:"01c25b8715dbb632-01",idioma:"es",idiomaNombre:"Español",nombre:"Nueva Versión Internacional",anio:"2025",titular:"Biblica, Inc."},
    {id:"2f416c6f03dd8090-02",idioma:"es",idiomaNombre:"Español",nombre:"Nueva Versión Internacional (Castilian)",anio:"",titular:"Biblica, Inc."},
    {id:"abc55ec4a92a291d-01",idioma:"es",idiomaNombre:"Español",nombre:"Nueva Versión Internacional",anio:"2015",titular:"Biblica, Inc."},
    {id:"8676091b758f0d8d8-01",idioma:"ja",idiomaNombre:"日本語 · Japonés",nombre:"Japanese Contemporary Bible",anio:"",titular:"Biblica, Inc."},
    {id:"e959e47176271f18-01",idioma:"ko",idiomaNombre:"한국어 · Coreano",nombre:"Korean Living Bible",anio:"1985",titular:"Biblica, Inc."},
    {id:"35b94e98b2e3a01a-01",idioma:"pt",idiomaNombre:"Português · Portugués",nombre:"Nova Versão Internacional",anio:"",titular:"Biblica, Inc."},
    {id:"a47cbe7792801aa8-01",idioma:"pt",idiomaNombre:"Português · Portugués",nombre:"Nova Versão Internacional",anio:"2024",titular:"Biblica, Inc."},
    {id:"aee9474b4a88eefb-01",idioma:"pt",idiomaNombre:"Português · Portugués",nombre:"O Livro",anio:"",titular:"Biblica, Inc."},
    {id:"6f26e199139ea7f1-01",idioma:"fr",idiomaNombre:"Français · Francés",nombre:"La Bible du Semeur",anio:"",titular:"Biblica, Inc."},
    {id:"da0947e25c9636bb-01",idioma:"de",idiomaNombre:"Deutsch · Alemán",nombre:"Hoffnung für Alle",anio:"",titular:"Biblica, Inc."},
    {id:"fdb480d858e14ced-01",idioma:"nl",idiomaNombre:"Nederlands · Neerlandés",nombre:"Het Boek",anio:"2007",titular:"Biblica, Inc."},
    {id:"fdb480d858e14ced-02",idioma:"nl",idiomaNombre:"Nederlands · Neerlandés",nombre:"Het Boek",anio:"",titular:"Biblica, Inc."},
    {id:"b373795061a36482-01",idioma:"ro",idiomaNombre:"Română · Rumano",nombre:"New Romanian Translation",anio:"2021",titular:"Biblica, Inc."},
    {id:"fd1da25634593297-01",idioma:"ru",idiomaNombre:"Русский · Ruso",nombre:"New Russian Translation",anio:"2023",titular:"Biblica, Inc."},
    {id:"d16ede2395debe86-01",idioma:"ru",idiomaNombre:"Русский · Ruso",nombre:"Central Asian Russian Scriptures",anio:"2023",titular:"Biblica, Inc."},
    {id:"8b5beb01e227434e-01",idioma:"ru",idiomaNombre:"Русский · Ruso",nombre:"Central Asian Russian Scriptures 2023 (CARS-A)",anio:"2023",titular:"Biblica, Inc."},
    {id:"50999ebfe23c23f7-01",idioma:"ru",idiomaNombre:"Русский · Ruso",nombre:"Central Asian Russian Scriptures 2023 (Tajikistani edition)",anio:"2023",titular:"Biblica, Inc."},
    {id:"699b9e6b33aa2329-01",idioma:"sv",idiomaNombre:"Svenska · Sueco",nombre:"Swedish Contemporary Bible",anio:"2015",titular:"Biblica, Inc."},
    {id:"20c3695eb7339cca-01",idioma:"da",idiomaNombre:"Dansk · Danés",nombre:"Bibelen på Hverdagsdansk",anio:"",titular:"Biblica, Inc."},
    {id:"64211ac8a2f1f429-01",idioma:"am",idiomaNombre:"አማርኛ · Amárico",nombre:"New Amharic Standard Version",anio:"2024",titular:"Biblica, Inc."},
    {id:"cc2acf567a368d9b-01",idioma:"so",idiomaNombre:"Soomaali · Somalí",nombre:"Somali Contemporary Bible",anio:"2024",titular:"Biblica, Inc."},
    {id:"e0803411baeba3d5-01",idioma:"lo",idiomaNombre:"ລາວ · Lao",nombre:"Lao Contemporary Version",anio:"2025",titular:"Biblica, Inc."},
    {id:"3f67e6d09c94c02e-01",idioma:"tl",idiomaNombre:"Tagalog",nombre:"Tagalog Contemporary Bible",anio:"",titular:"Biblica, Inc."},
    {id:"171b5ad9d72f0055-01",idioma:"si",idiomaNombre:"සිංහල · Cingalés",nombre:"Sinhala Contemporary Version",anio:"2025",titular:"Biblica, Inc."},
    {id:"c44eaf15822ba392-01",idioma:"ta",idiomaNombre:"தமிழ் · Tamil",nombre:"Tamil Reader’s Version",anio:"",titular:"Biblica, Inc."},
    {id:"c44eaf15822ba392-02",idioma:"ta",idiomaNombre:"தமிழ் · Tamil",nombre:"Tamil Reader’s Version",anio:"",titular:"Biblica, Inc."},
    {id:"74a986a9a183ae1c-01",idioma:"sl",idiomaNombre:"Slovenščina · Esloveno",nombre:"Slovenian Living New Testament",anio:"",titular:"Biblica, Inc.",alcance:"Nuevo Testamento"},
    {id:"7f996672a9b6d67a-01",idioma:"qu",idiomaNombre:"Quichua",nombre:"Quichua-Chimborazo New Testament",anio:"2016",titular:"Biblica, Inc.",alcance:"Nuevo Testamento"},
    {id:"c6229c708b3d1407-01",idioma:"",idiomaNombre:"Bette",nombre:"Bette Contemporary Bible",anio:"2025",titular:"Biblica, Inc."},
    {id:"e1592fe262f26754-01",idioma:"es",idiomaNombre:"Español",nombre:"New Living Bible",anio:"",titular:"Biblica, Inc."},
    {id:"cf5534eebe2d744f-01",idioma:"",idiomaNombre:"Sumi",nombre:"Sumi New Generation Bible",anio:"",titular:"Biblica, Inc."}
];

const BIBLIA_TRADUCCION_POR_DEFECTO = "01c25b8715dbb632-01";
const CLAVE_TRADUCCION_BIBLIA = "caminandoBibliaTraduccion";

function obtenerBibliaPorId(id){
    return BIBLIAS_PAGINA.find(biblia => biblia.id === id) || null;
}

function obtenerBibliaSeleccionada(){
    let id = BIBLIA_TRADUCCION_POR_DEFECTO;
    try{id = localStorage.getItem(CLAVE_TRADUCCION_BIBLIA) || id;}catch(error){}
    return obtenerBibliaPorId(id) || obtenerBibliaPorId(BIBLIA_TRADUCCION_POR_DEFECTO);
}

function guardarBibliaSeleccionada(id){
    try{localStorage.setItem(CLAVE_TRADUCCION_BIBLIA,id);}catch(error){}
}

function obtenerEtiquetaBiblia(biblia){
    if(!biblia) return "Biblia";
    const anio = biblia.anio ? ` ${biblia.anio}` : "";
    const alcance = biblia.alcance ? ` · ${biblia.alcance}` : "";
    return `${biblia.nombre}${anio}${alcance}`;
}
