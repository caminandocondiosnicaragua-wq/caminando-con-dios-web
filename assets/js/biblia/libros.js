/************************************************
 * CAMINANDO CON DIOS
 * LIBROS DE LA BIBLIA
 *
 * Conversión entre nombres en español
 * y códigos utilizados por las APIs bíblicas.
 ************************************************/

const LIBROS_BIBLIA = {

    // PENTATEUCO

    "Génesis":"GEN",
    "Éxodo":"EXO",
    "Levítico":"LEV",
    "Números":"NUM",
    "Deuteronomio":"DEU",

    // HISTÓRICOS

    "Josué":"JOS",
    "Jueces":"JDG",
    "Rut":"RUT",
    "1 Samuel":"1SA",
    "2 Samuel":"2SA",
    "1 Reyes":"1KI",
    "2 Reyes":"2KI",
    "1 Crónicas":"1CH",
    "2 Crónicas":"2CH",
    "Esdras":"EZR",
    "Nehemías":"NEH",
    "Ester":"EST",

    // POÉTICOS

    "Job":"JOB",
    "Salmos":"PSA",
    "Proverbios":"PRO",
    "Eclesiastés":"ECC",
    "Cantares":"SNG",

    // PROFETAS MAYORES

    "Isaías":"ISA",
    "Jeremías":"JER",
    "Lamentaciones":"LAM",
    "Ezequiel":"EZK",
    "Daniel":"DAN",

    // PROFETAS MENORES

    "Oseas":"HOS",
    "Joel":"JOL",
    "Amós":"AMO",
    "Abdías":"OBA",
    "Jonás":"JON",
    "Miqueas":"MIC",
    "Nahúm":"NAM",
    "Habacuc":"HAB",
    "Sofonías":"ZEP",
    "Hageo":"HAG",
    "Zacarías":"ZEC",
    "Malaquías":"MAL",

    // EVANGELIOS

    "Mateo":"MAT",
    "Marcos":"MRK",
    "Lucas":"LUK",
    "Juan":"JHN",

    // HISTÓRICO NT

    "Hechos":"ACT",

    // CARTAS DE PABLO

    "Romanos":"ROM",
    "1 Corintios":"1CO",
    "2 Corintios":"2CO",
    "Gálatas":"GAL",
    "Efesios":"EPH",
    "Filipenses":"PHP",
    "Colosenses":"COL",
    "1 Tesalonicenses":"1TH",
    "2 Tesalonicenses":"2TH",
    "1 Timoteo":"1TI",
    "2 Timoteo":"2TI",
    "Tito":"TIT",
    "Filemón":"PHM",

    // CARTAS GENERALES

    "Hebreos":"HEB",
    "Santiago":"JAS",
    "1 Pedro":"1PE",
    "2 Pedro":"2PE",
    "1 Juan":"1JN",
    "2 Juan":"2JN",
    "3 Juan":"3JN",
    "Judas":"JUD",

    // APOCALIPSIS

    "Apocalipsis":"REV"

};
/************************************************
 * OBTENER CÓDIGO
 ************************************************/

function obtenerCodigoLibro(nombre){
    return LIBROS_BIBLIA[nombre] || null;
}

/************************************************
 * EXISTE EL LIBRO
 ************************************************/

function existeLibro(nombre){
    return nombre in LIBROS_BIBLIA;
}

/************************************************
 * LISTA DE LIBROS
 ************************************************/

function obtenerLibros(){
    return Object.keys(LIBROS_BIBLIA);
}
