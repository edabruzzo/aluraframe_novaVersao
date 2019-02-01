class ContaPoupanca extends Conta{


    constructor(saldo, taxa){
        super(saldo);
        this._taxa = taxa;
    }

    atualiza(){
        console.log(this._saldo += 2* this._taxa);        
    }

}