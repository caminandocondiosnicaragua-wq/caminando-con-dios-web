/************************************************
 * CAMINANDO CON DIOS
 * PARSER BÍBLICO
 * Versión 2.1
 ************************************************/


/************************************************
 * INTERPRETAR REFERENCIA
 *
 * Acepta referencias de uno o varios libros.
 *
 * Ejemplos:
 * "1 Crónicas 11-12"
 * "Eclesiastés 11-12 - Salmo 40"
 * "Génesis 1-2 - Mateo 5"
 *
 * Devuelve una entrada por cada capítulo.
 ************************************************/

function interpretarReferencia(referencia){
    if(!referencia) return [];

    referencia = referencia
        .replace(/–/g,"-")
        .replace(/—/g,"-")
        .replace(/\s+/g," ")
        .trim();

    if(!referencia) return [];

    /*
     * Buscamos los nombres de libros conocidos dentro de la referencia.
     * Se ordenan por longitud para reconocer primero nombres compuestos,
     * por ejemplo "1 Crónicas" antes que "Crónicas".
     */
    const nombresLibros = Object.keys(LIBROS_BIBLIA)
        .sort((a,b) => b.length - a.length);

    const coincidencias = [];

    nombresLibros.forEach(function(nombre){
        let posicion = referencia.indexOf(nombre);

        while(posicion !== -1){
            const caracterAntes = posicion > 0
                ? referencia.charAt(posicion - 1)
                : "";

            const caracterDespues = referencia.charAt(
                posicion + nombre.length
            );

            /*
             * Evitar encontrar un libro dentro de otra palabra.
             */
            const limiteAntes = !caracterAntes || /\s|-|,|;/.test(caracterAntes);
            const limiteDespues = !caracterDespues || /\s|\d/.test(caracterDespues);

            if(limiteAntes && limiteDespues){
                coincidencias.push({
                    inicio: posicion,
                    fin: posicion + nombre.length,
                    libro: nombre,
                    codigo: obtenerCodigoLibro(nombre)
                });
            }

            posicion = referencia.indexOf(nombre, posicion + 1);
        }
    });

    /*
     * Ordenar y eliminar coincidencias contenidas dentro de nombres
     * compuestos ya reconocidos.
     */
    coincidencias.sort(function(a,b){
        if(a.inicio !== b.inicio) return a.inicio - b.inicio;
        return (b.fin - b.inicio) - (a.fin - a.inicio);
    });

    const librosEncontrados = [];

    coincidencias.forEach(function(coincidencia){
        const ultima = librosEncontrados[librosEncontrados.length - 1];

        if(
            !ultima ||
            coincidencia.inicio >= ultima.fin
        ){
            librosEncontrados.push(coincidencia);
        }
    });

    if(librosEncontrados.length === 0){
        console.warn("Libro no reconocido en referencia:", referencia);
        return [];
    }

    const resultado = [];

    librosEncontrados.forEach(function(actual, indice){
        const siguiente = librosEncontrados[indice + 1];

        /*
         * Todo lo que está después del nombre del libro y antes del
         * siguiente libro corresponde a sus capítulos.
         */
        const finTexto = siguiente
            ? siguiente.inicio
            : referencia.length;

        let textoCapitulos = referencia
            .substring(actual.fin, finTexto)
            .trim();

        /*
         * Los guiones que separan libros no forman parte del rango.
         * Para un caso como:
         * Eclesiastés 11-12 - Salmo 40
         *
         * el texto de Eclesiastés queda:
         * 11-12
         */
        textoCapitulos = textoCapitulos
            .replace(/^[\s\-–—,;]+/, "")
            .replace(/[\s\-–—,;]+$/, "")
            .trim();

        /*
         * En este lector las referencias son por capítulos.
         * Admitimos:
         *   11
         *   11-12
         *
         * Si hubiera más separadores, se procesan también como
         * referencias de capítulos individuales.
         */
        const partes = textoCapitulos
            .split(/[;,]+/)
            .map(parte => parte.trim())
            .filter(Boolean);

        partes.forEach(function(parte){
            const rango = parte.match(/^(\d+)\s*-\s*(\d+)$/);

            if(rango){
                const inicio = parseInt(rango[1],10);
                const fin = parseInt(rango[2],10);

                if(
                    Number.isInteger(inicio) &&
                    Number.isInteger(fin) &&
                    inicio > 0 &&
                    fin >= inicio
                ){
                    for(
                        let capitulo=inicio;
                        capitulo<=fin;
                        capitulo++
                    ){
                        resultado.push({
                            libro: actual.libro,
                            codigo: actual.codigo,
                            capitulo
                        });
                    }
                }

                return;
            }

            const unico = parte.match(/^(\d+)$/);

            if(unico){
                const capitulo = parseInt(unico[1],10);

                if(Number.isInteger(capitulo) && capitulo > 0){
                    resultado.push({
                        libro: actual.libro,
                        codigo: actual.codigo,
                        capitulo
                    });
                }
            }
        });
    });

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
