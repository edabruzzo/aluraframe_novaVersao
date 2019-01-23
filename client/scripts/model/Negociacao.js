class Negociacao{
    
    //constructor() é equivalente a function Negociacao(){}
    
     constructor(data, quantidade, valor) {
        
      this._data = data;
      this._quantidade = quantidade;
      this._valor = valor;

      //evita que os campos sejam alterados após criação, congelando o objeto
      //primeira tentativa de encapsulamento
      Object.freeze(this);
      
        
    }

    
        get volume(){
            return this._quantidade * this._valor;
        }

    
    get data(){
        return this._data;
    }
        
    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}