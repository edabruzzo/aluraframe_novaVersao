
/*

https://cursos.alura.com.br/course/javascript-es6-orientacao-a-objetos-parte-3/task/20277

Aplicamos o Module Pattern, com o qual transformamos todo o script em um módulo - 
o código está todo confinado. E depois, definimos qual parte queremos exportar 
para o mundo externo usando o return. 
A ConnectionFactory é acessada, mas todo o restante não. 
Com isto, resolvemos o problema de utilizarmos uma única conexão.




//AQUI AS VARIÁVEIS GLOBAIS FICAM CONFINADAS NO MÓDULO NA FUNÇÃO ANÔNIMA
    var stores = ['negociacoes'];
    var version = 7;
    var dbName = 'aluraframe';
    var connection = null;
    
    //SÓ É RETORNADA NA FUNÇÃO ANÔNIMA A PARTE QUE QUEREMOS EXPOR
    return    class ConnectionFactory {

//(...)

})();




*/

var ConnectionFactory = (function(){


    var stores = ['negociacoes'];
var version = 7;
var dbName = 'aluraframe';
var connection = null;

//EXPONDO APENAS A CLASSE
return class ConnectionFactory {


    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }



    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                //chamado direto pois é um método estático
                ConnectionFactory._createStores(e.target.result);

            };

            openRequest.onsuccess = e => {

                //testa se a conexão (var connection) está nula
                if(!connection) connection = e.target.result;
                resolve(connection);
            };
            
            openRequest.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }






    static _createStores(connection) {

        // criando nossos stores!
    
        stores.forEach(store => {

            //deleta pra criar de novo Alura ???
            //if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            
            //se não contém a store ele cria
            if(!connection.objectStoreNames.contains(store)) 
                    connection.createObjectStore(store, { autoIncrement: true });
        });
    }
    




}


})();