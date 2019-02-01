class View {

    constructor(elemento) {

          this._elemento = elemento;
    }

    
    template(model){
        /*
        Este erro é uma forma de forçar o desenvolvedor a seguir o contrato da classe View
        Não existem classes abstratas em Javascript para forçarmos esta implementação
        */
        throw new Error('O método template deve ser implementado');
    }

    update(model) {

        this._elemento.innerHTML = this.template(model);
    }
}