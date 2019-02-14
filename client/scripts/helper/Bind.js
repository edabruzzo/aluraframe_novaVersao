class Bind {

    constructor(model, view, props) {

      //o método cria é estático para não termos que instanciar o ProxyFactory
       let proxy = ProxyFactory.cria(model, props, model => {
           view.update(model);
       });

       view.update(model);
       return proxy;
    }
}