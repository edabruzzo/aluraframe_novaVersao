class NegociacaoController {

 
    constructor(){

          //a função bind(document) amarra a variável $ ao documento por conta da perda de escopo
          let $ = document.querySelector.bind(document);
          this.inputData = $('#data');
          this.inputQuantidade =  $('#quantidade');
          this.inputValor = $('#valor');
          this._listaNegociacoes = new ListaNegociacoes();
          this._negociacoesView = new NegociacoesView($('#negociacoesView'));
          //this._negociacoesView.update();

    }



    adicionaNegociacao(event) {
        event.preventDefault();
        console.log('Chamando uma ação no controller');


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
        console.log(this._listaNegociacoes.negociacoes);
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();
       

    }


    _criaNegociacao(){

    return 
    new Negociacao(
        DateHelper.textoParaData(this._inputData.value),
        this._inputQuantidade.value,
        this._inputValor.value
    );

    }     

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();

    }



}