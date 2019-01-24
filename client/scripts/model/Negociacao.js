class Negociacao{
    
    //constructor() é equivalente a function Negociacao(){}
    
     constructor(data, quantidade, valor) {

      //gambiarra para tentar encapsular e torná-los imutáveis
      this._data = new Date(data.getTime());
      this._quantidade = quantidade;
      this._valor = valor;

      //evita que os campos sejam alterados após criação, congelando o objeto
      //primeira tentativa de encapsulamento
      //gambiarra para tentar encapsular e torná-los imutáveis
      Object.freeze(this);
      
        
    }

    
        get volume(){
            return this._quantidade * this._valor;
        }

    
    get data(){
        //gambiarra para tentar encapsular e torná-los imutáveis
        return new Date(this._data.getTime());
    }
        
    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

}
//https://medium.com/@thejasonfile/a-simple-intro-to-javascript-imports-and-exports-389dd53c3fac
//module.exports = Negociacao;