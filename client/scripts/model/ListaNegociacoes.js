

class ListaNegociacoes{

    constructor(){

        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    //programação defensiva segundo a Alura
    // igual a gambiarra para evitar a alteração do objeto após a criação.
    get negociacoes(){
        return [].concat(this._negociacoes);
    }




}