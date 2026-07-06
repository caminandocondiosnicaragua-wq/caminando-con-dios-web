/************************************************
 * CAMINANDO CON DIOS
 * PARSER BÍBLICO
 * Versión 2.0
 ************************************************/


/************************************************
 * INTERPRETAR REFERENCIA
 *
 * Entrada:
 * "1 Crónicas 11-12"
 *
 * Salida:
 * [
 *   {
 *      libro:"1 Crónicas",
 *      codigo:"1CH",
 *      capitulo:11
 *   },
 *   {
 *      libro:"1 Crónicas",
 *      codigo:"1CH",
 *      capitulo:12
 *   }
 * ]
 ************************************************/

function interpretarReferencia(referencia){
    if(!referencia) return [];
    referencia = referencia.trim();
    const ultimoEspacio = referencia.lastIndexOf(" ");
    if(ultimoEspacio === -1){
        return [];
    }
    const libro = referencia.substring(0, ultimoEspacio).trim();
    const codigo = obtenerCodigoLibro(libro);
    if(!codigo){
        console.warn("Libro no reconocido:", libro);
        return [];
    }
    const textoCapitulos = referencia.substring(ultimoEspacio + 1).trim();
    let resultado = [];
    // Rango de capítulos

    if(textoCapitulos.includes("-")){
        const partes = textoCapitulos.split("-");
        const inicio = parseInt(partes[0]);
        const fin = parseInt(partes[1]);
        for(let capitulo=inicio; capitulo<=fin; capitulo++){
            resultado.push({
                libro,
                codigo,
                capitulo
            });
        }
    }

    // Un solo capítulo
    else{
        resultado.push({
            libro,
            codigo,
            capitulo:parseInt(textoCapitulos)
        });
    }
    return resultado;
}


/************************************************
 * OBTENER TODOS LOS CAPÍTULOS DEL DÍA
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

function obtenerCapituloAnterior(lista,indice){
    if(indice<=0){
        return null;
    }
    return lista[indice-1];
}
/************************************************
 * CAPÍTULO SIGUIENTE
 ************************************************/

function obtenerCapituloSiguiente(lista,indice){
    if(indice>=lista.length-1){
        return null;
    }
    return lista[indice+1];
}
/************************************************
 * BUSCAR CAPÍTULO
 ************************************************/

function buscarCapitulo(lista,libro,capitulo){
    return lista.find(item=>
        item.libro===libro &&
        item.capitulo===capitulo
    );
}
/************************************************
 * FORMATEAR REFERENCIA
 ************************************************/

function formatearReferencia(item){
    return `${item.libro} ${item.capitulo}`;
}
