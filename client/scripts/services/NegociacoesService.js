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



}