class NegociacoesService {

    //no curso da Alura o instrutor fala em isolar este comportamento numa classe HttpService
    //Eu não entendo necessário. O isolamento num  método no próprio NegociacoesService é suficiente.
    fazerRequisicaoGETAssíncrono(url) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            /* configurações */
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // this._mensagem.texto = 'Negociações importadas com sucesso.';
                    console.log(xhr.responseText);

                    resolve(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    reject('Não foi possível obter as negociações da semana', null);
                    console.log(xhr.responseText);
                }
            };

            xhr.send();
        });
    }



    fazerRequisicaoPOSTAssincrono(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }

    

    obterNegociacoesSemana() {

        let url = 'negociacoes/semana';

       return fazerRequisicaoGETAssíncrono(url);
    }



    obterNegociacoesDaSemanaAnterior() {

        url = 'negociacoes/anterior';

       return fazerRequisicaoGETAssíncrono(url);

    }




    obterNegociacoesDaSemanaRetrasada() {

        let url = 'negociacoes/retrasada';

        return fazerRequisicaoGETAssíncrono(url);

    }


    obterNegociacoes(){



         /*
        Creates a Promise that is resolved with an array of results when all 
        of the provided Promises resolve, or rejected when any Promise is rejected.
        */
       /*
       Recebe como parametro um array de Promises
       */
      Promise.all([
        //recebe uma lista de Promises
        service.obterNegociacoesDaSemana(),
        service.obterNegociacoesDaSemanaAnterior(),
        service.obterNegociacoesDaSemanaRetrasada() ]
    )
        //resolve
        .then(periodos => {
           
            let negociacoes = periodos
            //antes de iterar pelo forEach, temos que usar o reduce para extrair os elementos da lista
            //pois temos um array de array, através de flatten no array, com a função reduce
            .reduce((dados, periodo) => dados.concat(periodo), []);
            
            return negociacaoes;
        })
        //reject
        .catch(erro => 
            {
                throw new Error(erro);
 
            });

    }


}