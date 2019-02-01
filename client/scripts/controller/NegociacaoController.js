class NegociacaoController {

 
    constructor(){

          //a função bind(document) amarra a variável $ ao documento por conta da perda de escopo
          let $ = document.querySelector.bind(document);
          this.inputData = $('#data');
          this.inputQuantidade =  $('#quantidade');
          this.inputValor = $('#valor');
          this._listaNegociacoes = new ListaNegociacoes();
          this._negociacoesView = new NegociacoesView($('#negociacoesView'));
          this._negociacoesView.update(this._listaNegociacoes);
          this._mensagem = new Mensagem();
          this._mensagemView = new MensagemView($('#mensagemView'));
          this._mensagemView.update(this._mensagem);

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
        this._mensagemView.update(this._mensagem);  
        console.log(this._listaNegociacoes.negociacoes);
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();
       

    }


    _criaNegociacao(){

        console.log('Entrou em _criaNegociacao no NegociacaoController');
      
    return new Negociacao(
        DateHelper.textoParaData(this.inputData.value),
        this.inputQuantidade.value,
        this.inputValor.value );

    }     

    _limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = 1;
        this.inputValor.value = 0.0

        this.inputData.focus();

    }



}