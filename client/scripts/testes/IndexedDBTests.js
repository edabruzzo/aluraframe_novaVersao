//Para consultar se o ES6 é suportado no browser
//https://kangax.github.io/compat-table/es6/


function testaSuporteIndexedDB(){

    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB || 
    window.webkitIndexedDB || window.msIndexedDB;
    
    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || 
    window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
    window.msIDBKeyRange
    
    if (!window.indexedDB) {
       window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }


}



var connection;
var openRequest = window.indexedDB.open("aluraframe", 6);
        //console.log(openRequest);

        openRequest.onsuccess = (e) => {

            console.log('Conexão obtida com sucesso');

            // e.target.result é uma instância de IDBDatabase
            //SEGUNDO A ALURA
//          let  minhaConnection = e.target.result;
  
            //SEGUNDO TUTORIALSPOINT
            //https://www.tutorialspoint.com/html5/html5_indexeddb.htm
            connection = openRequest.result;

            //https://cursos.alura.com.br/forum/topico-transaction-of-undefined-27007
            //adiciona();
            listaTodos();

        }



        openRequest.onerror = (e) => console.log(e.target.error);


        openRequest.onupgradeneeded = (e) => {

            console.log('Cria ou altera um banco já existente');
            var connection = e.target.result;
            console.log('Obtendo minhaConnection e criando ObjectStore: ');
            console.log(connection);


            if (!connection.objectStoreNames.contains('negociacoes')) {
                //https://stackoverflow.com/questions/36016862/indexeddb-dataerror-data-provided-to-an-operation-does-not-meet-requirements
                //https://www.tutorialspoint.com/html5/html5_indexeddb.htm
                //connection.createObjectStore('negociacoes', {keyPath: 'id', autoIncrement: true });
                connection.createObjectStore('negociacoes', {autoIncrement: true });
            }

        }

        function adiciona() {

            console.log('Iniciando operação de escrita em banco');

            let transaction = connection.transaction(['negociacoes'], 'readwrite');
            let store = transaction.objectStore('negociacoes');

            let negociacao = new Negociacao(new Date(), 200, 2);
            let request = store.add(negociacao);

            request.onsuccess = e => {

                console.log('Negociação incluída com sucesso');
            };

            request.onerror = e => {

                console.log('Não foi possível incluir a negociação');
            };

        }



        function deletaObjectStore() {

            console.log('Deletando ObjectStore');
            connection.deleteObjectStore('negociacoes');

        }


        function listaTodos() {

            let transaction = connection.transaction(['negociacoes'], 'readonly');
            let store = transaction.objectStore('negociacoes');
            let negociacoes = [];

            let cursor = store.openCursor();

            cursor.onsuccess = e => {

                let atual = e.target.result;
                //aqui estou iterando num bloco if, mas com jeitão de while
                if (atual) {

                    negociacoes.push(new Negociacao(atual.value._data, atual.value._quantidade, atual.value._valor));
                    atual.continue();

                } else {

                    // quando não há mais objects em nossa store.
                    // Isso significa que já terminados de popular negociacoes
                    alert('Listando negociacoes no console: ');
                    console.log(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log('Error:' + e.target.error.name);
            };
        }



        testaSuporteIndexedDB();
        //adiciona();
        listaTodos();

       // deletaObjectStore();
