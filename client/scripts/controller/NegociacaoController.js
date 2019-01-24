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



}