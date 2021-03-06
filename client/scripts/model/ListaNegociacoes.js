

class ListaNegociacoes{

    constructor(){

        this._negociacoes = [];
        
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        //Ferramenta de reflection do javascript
        //executa a armadilha no contexto especificado
    
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
   
    }

     // novo método
     get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }


     ordena(criterio){
         return this._negociacoes.sort(criterio);
     }

     inverteOrdem(){
         return this._negociacoes.reverse();
     }


}