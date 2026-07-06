/************************************************
 * CAMINANDO CON DIOS
 * UTILIDADES DE FECHAS
 ************************************************/


/************************************************
 * FORMATEAR FECHA
 ************************************************/

function formatearFecha(fecha){

    if(!fecha) return "";

    const f = new Date(fecha + "T00:00:00");

    return f.toLocaleDateString("es-ES",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}


/************************************************
 * OBTENER FECHA DE HOY
 ************************************************/

function obtenerFechaHoy(){

    const hoy = new Date();

    return hoy.toISOString().split("T")[0];

}


/************************************************
 * COMPARAR FECHAS
 ************************************************/

function compararFechas(fecha1,fecha2){

    return fecha1===fecha2;

}


/************************************************
 * ES FECHA FUTURA
 ************************************************/

function esFechaFutura(fecha){

    const hoy = obtenerFechaHoy();

    return fecha>hoy;

}


/************************************************
 * ES FECHA PASADA
 ************************************************/

function esFechaPasada(fecha){

    const hoy = obtenerFechaHoy();

    return fecha<hoy;

}


/************************************************
 * ES EL DÍA DE HOY
 ************************************************/

function esHoy(fecha){

    return compararFechas(

        fecha,

        obtenerFechaHoy()

    );

}


/************************************************
 * SUMAR DÍAS
 ************************************************/

function sumarDias(fecha,dias){

    const f=new Date(fecha+"T00:00:00");

    f.setDate(

        f.getDate()+dias

    );

    return f.toISOString().split("T")[0];

}


/************************************************
 * RESTAR DÍAS
 ************************************************/

function restarDias(fecha,dias){

    return sumarDias(

        fecha,

        -dias

    );

}


/************************************************
 * NOMBRE DEL MES
 ************************************************/

function obtenerMes(fecha){

    const f=new Date(fecha+"T00:00:00");

    return f.toLocaleDateString(

        "es-ES",

        {

            month:"long"

        }

    );

}


/************************************************
 * AÑO
 ************************************************/

function obtenerAnio(fecha){

    const f=new Date(fecha+"T00:00:00");

    return f.getFullYear();

}


/************************************************
 * DÍA DEL MES
 ************************************************/

function obtenerDia(fecha){

    const f=new Date(fecha+"T00:00:00");

    return f.getDate();

}
