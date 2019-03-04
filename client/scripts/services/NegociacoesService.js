class NegociacoesService {


    fazerRequisicaoGET(url) {

        let xhr = new XMLHttpRequest();
        /* configurações */
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // this._mensagem.texto = 'Negociações importadas com sucesso.';
                console.log(xhr.responseText);

                callback(null, JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

            } else {
                callback('Não foi possível obter as negociações da semana', null);
                console.log(xhr.responseText);
            }
        };

        xhr.send();
    }



    obterNegociacoesSemana(callback) {

        let url = 'negociacoes/semana';

        fazerRequisicaoGET(url);
    }



    obterNegociacoesDaSemanaAnterior(callback) {

        url = 'negociacoes/anterior';

        fazerRequisicaoGET(url);

    }




    obterNegociacoesDaSemanaRetrasada(callback) {

        let url = 'negociacoes/retrasada';

        fazerRequisicaoGET(url);

    }



}