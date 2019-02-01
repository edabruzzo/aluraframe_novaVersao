class ContaCorrente extends Conta{


    constructor(saldo, taxa){
        super(saldo);
        this._taxa = taxa;
    }

    atualiza(){

       console.log(this._saldo += this._taxa);        
    }

}