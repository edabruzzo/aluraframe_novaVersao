class Codigo{


    constructor(texto){

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Não foi possível instanciar o objeto');
        else{
            this._texto = texto;
        }

    }


    _valida(texto) {

        return /\D{3}-\D{2}-\d{2}/.test(texto);
    }

    get texto() {

        return this._texto;
    }
}


