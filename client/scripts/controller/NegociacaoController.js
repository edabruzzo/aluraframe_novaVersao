class NegociacaoController {

 
    constructor(){

    }


    adicionaNegociacao(event) {
        event.preventDefault();
        console.log('Chamando uma ação no controller');


        let campos = [
            document.querySelector('#data'),
            document.querySelector('#valor'),
            document.querySelector('#quantidade')
        ];

        console.log(campos);

        let tbody = document.querySelector('table tbody');

        var tr = document.createElement('tr');

        campos.forEach(function (campo) {
            var td = document.createElement('td');
            td.textContent = campo.value;
            tr.appendChild(td);

        })

        //cria um novo campo dinamicamente
        var tdVolume = document.createElement('td');
        tdVolume.textContent = campos[1].value * campos[2].value;
        tr.appendChild(tdVolume);

        campos[0].value = '';
        campos[1].value = 1;
        campos[2].value = 0;

        campos[0].focus();

        tbody.appendChild(tr);



    }


    //Outra forma de se fazer a mesma coisa em adicionaNegociacao(event)
    adiciona(event) {
        event.preventDefault();

        //a função bind(document) amarra a variável $ ao documento por conta da perda de escopo
        let $ = document.querySelector.bind(document);
        let inputData = $('#data');
        let inputQuantidade =  $('#quantidade');
        let inputValor = $('#valor');

        console.log(inputData.value);
        console.log(inputQuantidade.value);
        console.log(inputValor.value);



}