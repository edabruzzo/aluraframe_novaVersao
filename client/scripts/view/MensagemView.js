class MensagemView extends View {


    constructor(elemento){
        super(elemento);
    }
  
    //este método sobrescreve o mesmo método na classe pai herdada (View)
    //se ele não for implementado é lançado um erro no método da classe pai    
    template(model) {
  
      return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }


  
  }  