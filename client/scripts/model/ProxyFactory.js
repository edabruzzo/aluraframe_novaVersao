class ProxyFactory {


static cria(objeto, props, acao){


return new Proxy( objeto, {
    //handler
    get(target, prop, value, receiver){

        if(['adiciona', 'esvazia'].includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

            return function(){
                console.log('AAAAAAAAAAAAAAAAAAAAAA');
               //console.log(`Valor anterior: ${target[prop]} interceptado. Novo valor: ${value}`);
               Reflect.apply(target[prop], target, arguments);
              
            }
            
        }
       
      // console.log(`Valor anterior: ${target[prop]} interceptado. Novo valor: ${value}`);
        
       return Reflect.get(target, prop, value, receiver);
    },  

    set(target, prop, value, receiver) {

        if(props.includes(prop)) {
            target[prop] = value;
            acao(target);
        }
    
        return Reflect.set(target, prop, value, receiver);    
    }

});




}




static _ehFuncao(funcao) {

    return typeof(funcao) == typeof(Function);

}





}