/************************************************
 * CAMINANDO CON DIOS
 * PARSER BÍBLICO
 ************************************************/


/************************************************
 * CONVIERTE UNA REFERENCIA EN UNA LISTA
 *
 * Ejemplo:
 * "1 Crónicas 11-12"
 *
 * Resultado:
 * [
 *   "1 Crónicas 11",
 *   "1 Crónicas 12"
 * ]
 ************************************************/

function interpretarReferencia(referencia){
    if(!referencia) return [];
    referencia = referencia.trim();
    const ultimoEspacio = referencia.lastIndexOf(" ");
    if(ultimoEspacio === -1){
        return [];

    }
    const libro = referencia.substring(0, ultimoEspacio);
    const capitulo = referencia.substring(ultimoEspacio + 1);

    if(capitulo.includes("-")){

        const partes = capitulo.split("-");
        const inicio = parseInt(partes[0]);
        const fin = parseInt(partes[1]);
        const resultado = [];
        for(let i = inicio; i <= fin; i++){
            resultado.push(`${libro} ${i}`);
        }
        return resultado;
    }
    return [
        `${libro} ${capitulo}`

    ];

}
/************************************************
 * DEVUELVE TODOS LOS CAPÍTULOS DEL DÍA
 ************************************************/

function obtenerCapitulosDelDia(devocional){
    let capitulos = [];
    if(devocional["TEXTO A.T."]){
        capitulos = capitulos.concat(
            interpretarReferencia(
                devocional["TEXTO A.T."]
            )
        );
    }
    if(devocional["TEXTO. N.T."]){
        capitulos = capitulos.concat(
            interpretarReferencia(
                devocional["TEXTO. N.T."]
            )
        );
    }
    return capitulos;

}
/************************************************
 * CAPÍTULO ANTERIOR
 ************************************************/

function capituloAnterior(lista,indice){
    if(indice<=0){
        return null;
    }
    return lista[indice-1];
}

/************************************************
 * CAPÍTULO SIGUIENTE
 ************************************************/

function capituloSiguiente(lista,indice){
    if(indice>=lista.length-1){
        return null;
    }
    return lista[indice+1];
}
