class Negociacao{
    
    //constructor() é equivalente a function Negociacao(){}
    
     constructor(data, quantidade, valor) {
        
      this.data = data;
      this.quantidade = quantidade;
      this.valor = valor;
      
        
    }

    
        obtemVolume(){
            return this.quantidade * this.valor;
        }

    
    getData(){
        return this.data;
    }
        
    getQuantidade(){
        return this.quantidade;
    }

    getValor(){
        return this.valor;
    }
}