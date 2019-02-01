

class ListaNegociacoes{

    constructor(contexto, armadilha){

        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        //Ferramenta de reflection do javascript
        //executa a armadilha no contexto especificado
        Reflect.apply(this._armadilha, this._contexto, (this));
    
    }

    //programação defensiva segundo a Alura
    // igual a gambiarra para evitar a alteração do objeto após a criação.
    get negociacoes(){
        return [].concat(this._negociacoes);
      
    }


    esvazia()   {

        this._negociacoes = [];
        //Ferramenta de reflection do javascript
        //executa a armadilha no contexto especificado
        Reflect.apply(this._armadilha, this._contexto, (this));    
   
    }


}