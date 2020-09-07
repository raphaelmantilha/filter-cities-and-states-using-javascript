const fs=require('fs');

let cidades_do_estado;

const cidades=JSON.parse(fs.readFileSync('Cidades.json'));
const estados=JSON.parse(fs.readFileSync('Estados.json'));

function geraArquivosComListaCidadesPorEstado(){
    estados.forEach(estado => {
        cidades_do_estado=[];
        cidades_do_estado=cidades.filter(cidade=>{
            return estado.ID===cidade.Estado;
        });
        
        fs.writeFile(`arquivos/${estado.Nome}`,JSON.stringify(cidades_do_estado),function(err,data){
           if(err){
              return console.log(err);
           }
        });
    });
}

function quantidadesCidadesDoEstado(UF){
    cidades_do_estado=[];

    const estado_procurado=estados.find(estado=>{
        return estado.Sigla===UF;
    })

    cidades_do_estado=cidades.filter(cidade=>{
        return cidade.Estado===estado_procurado.ID;
    });
    return `Há ${cidades_do_estado.length} cidades em ${estado_procurado.Nome}`;
}

function geraListaQuantidadeCidadesPorUF(){
    let estado_qtdeCidades;
    let lista_estado_qtdeCidades=[];

    estados.forEach(estado => {
        cidades_do_estado=[];
        cidades_do_estado=cidades.filter(cidade=>{
            return estado.ID===cidade.Estado;
        });

    estado_qtdeCidades={UF: estado.Sigla, qtdeCidades: cidades_do_estado.length};
    lista_estado_qtdeCidades.push(estado_qtdeCidades);
    });

    return lista_estado_qtdeCidades;
}

function classificacaoEstadosPeloNumeroDeCidades(maisCidades){
    let resultado="";
    let listaEstadosComMaisCidades=geraListaQuantidadeCidadesPorUF().sort(function(a,b){
        if(maisCidades){
            if(a.qtdeCidades < b.qtdeCidades){
                return 1;
            }
    
            if(a.qtdeCidades > b.qtdeCidades){
                return -1;
            }
    
            return 0;
        }
        else{
            if(a.qtdeCidades > b.qtdeCidades){
                return 1;
            }
    
            if(a.qtdeCidades < b.qtdeCidades){
                return -1;
            }
    
            return 0;
        }
        
    });

        for(let i=0;i<5;i++){
            resultado=resultado+`["${listaEstadosComMaisCidades[i].UF}-${listaEstadosComMaisCidades[i].qtdeCidades}"]`
            if(i<4){
                resultado=resultado+',';
            }                
        }

        return resultado;
}

function classificacaoCidadesTamanhoDoNomePeloEstado(nomeMaior){
    let resultado="[";
    estados.forEach(estado => {
        cidades_do_estado=[];
        cidades_do_estado=cidades.filter(cidade=>{
            return estado.ID===cidade.Estado;
        }).sort(function(a,b){
            if(nomeMaior){
                if(a.Nome.length < b.Nome.length){
                    return 1;
                }
        
                if(a.Nome.length > b.Nome.length){
                    return -1;
                }
        
                return 0;
            }
            else{
                if(a.Nome.length > b.Nome.length){
                    return 1;
                }
        
                if(a.Nome.length < b.Nome.length){
                    return -1;
                }
        
                return 0;
            }
         
        });
        resultado=resultado+`"${cidades_do_estado[0].Nome}-${estado.Sigla}",`;
    });
    resultado=resultado.slice(0,-1)+"]";
    return resultado;
}

function classificacaoCidadePeloNomeBrasilInteiro(listaCidades,nomeMaior){
    listaCidades=listaCidades.slice(1,-1).split(',');
    listaCidades.sort(function(a,b){
            if(nomeMaior){
                if(a.length < b.length){
                    return 1;
                }
        
                if(a.length > b.length){
                    return -1;
                }
        
                return 0;
            }
            else{
                if(a.length > b.length){
                    return 1;
                }
        
                if(a.length < b.length){
                    return -1;
                }
        
                return 0;
            }
         
        });
        console.log(listaCidades);
        return procuraCidadesComQuantidadeEspecificaCaracteres(listaCidades);
}

function procuraCidadesComQuantidadeEspecificaCaracteres(listaCidades){
    let lista1=listaCidades.map(cidade=>cidade.slice(1,-1))
    let cidades=lista1.filter(cidade=>cidade.length===lista1[0].length);
    cidades.sort();
    return cidades[0];
}
  

geraArquivosComListaCidadesPorEstado();
console.log(quantidadesCidadesDoEstado("BA"));
console.log(classificacaoEstadosPeloNumeroDeCidades(true));
console.log(classificacaoEstadosPeloNumeroDeCidades(false));

let listaCidadeNomesDeMaiorTamanhoPeloEstado=classificacaoCidadesTamanhoDoNomePeloEstado(true);
console.log(listaCidadeNomesDeMaiorTamanhoPeloEstado);

let listaCidadeNomesDeMenorTamanhoPeloEstado=classificacaoCidadesTamanhoDoNomePeloEstado(false);
console.log(listaCidadeNomesDeMenorTamanhoPeloEstado);

console.log(classificacaoCidadePeloNomeBrasilInteiro(listaCidadeNomesDeMaiorTamanhoPeloEstado,true));
console.log(classificacaoCidadePeloNomeBrasilInteiro(listaCidadeNomesDeMenorTamanhoPeloEstado,false));






