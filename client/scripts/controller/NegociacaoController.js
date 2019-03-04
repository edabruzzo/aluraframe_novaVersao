class NegociacaoController {


    constructor() {

        //a função bind(document) amarra a variável $ ao documento por conta da perda de escopo
        let $ = document.querySelector.bind(document);
        this.inputData = $('#data');
        this.inputQuantidade = $('#quantidade');
        this.inputValor = $('#valor');
        //Então, o this de uma arrow function é léxico, 
        //enquanto o this de uma função padrão é dinâmico. Com esse ajuste, conseguimos deixar o nosso código mais sucinto.
        //lista de Negociações vai ser um Proxy para interceptar as modificações na lista
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, ['adiciona', 'esvazia']);
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto']);


    }



    adicionaNegociacao(event) {

        event.preventDefault();
        alert('Chamando adicionaNegociacao no controller');


        let campos = [
            this.inputData,
            this.inputQuantidade,
            this.inputValor
        ];

        console.log(campos);

        let tbody = document.querySelector('table tbody');

        var tr = document.createElement('tr');

        campos.forEach(function (campo) {
            var td = document.createElement('td');
            td.textContent = campo.value;
            tr.appendChild(td);

        })

        //cria um novo campo dinamicamente
        var tdVolume = document.createElement('td');
        tdVolume.textContent = campos[1].value * campos[2].value;
        tr.appendChild(tdVolume);

        this._limpaFormulario();

        tbody.appendChild(tr);



    }


    //Outra forma de se fazer a mesma coisa em adicionaNegociacao(event)
    adiciona(event) {

        event.preventDefault();
        alert('Entrou no método adiciona do controller');
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        // this._mensagemView.update(this._mensagem);  
        console.log(this._listaNegociacoes.negociacoes);
        //está sendo feito no construtor
        // this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();


    }


    //Aqui há um problema:
    /*
    Pyramid of Doom 

    Costumamos dar o nome de Pyramid of Doom 
    (traduzida para o português, significa pirâmide do destino) em situações que isto 
    ocorre e temos uma função aninhada dentro de outra. A pirâmide é um forte indício de
     que temos problemas de legibilidade do código, na verdade, é o sintoma de um problema maior,
      o Callback Hell. Ocorre quando temos requisições assíncronas executadas em determinada ordem,
       que chama vários callbacks seguidos.

    */
   importaNegociacoes() {

        let service = new NegociacaoService();
    
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
    
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
    
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
    
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                });
            });
        });
    }

    

    apagaNegociacoes(event) {

        this._listaNegociacoes.esvazia();
        //está sendo feito no construtor
        //this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        //this._mensagemView.update(this._mensagem);


    }



    _criaNegociacao() {

        console.log('Entrou em _criaNegociacao no NegociacaoController');


        return new Negociacao(
            DateHelper.textoParaData(this.inputData.value),
            this.inputQuantidade.value,
            this.inputValor.value);
    }



    _limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = 1;
        this.inputValor.value = 0.0

        this.inputData.focus();

    }



}