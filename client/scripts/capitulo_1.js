
var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
];

console.log(campos);

var tbody = document.querySelector('table tbody');



document.querySelector('.form').addEventListener('submit', function (event) {

    //para evitar o recarregamento da página após submissão do formulário
    event.preventDefault();

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



});


//************************************************************* */

let codigo = 'GWZ-JJ-12';

function validaCodigo(codigo) {

    // cria a expressão regular. Poderíamos ter usado 
    // a sintaxe new RegExp(/\D{3}-\D{2}-\d{2}/)
    // \D é qualquer coisa não dígito
    // \D{3} é qualquer coisa não dígito que forme um grupo de 3 caracteres
    // \d é qualquer dígito.
    let expressao = /\D{3}-\D{2}-\d{2}/; 

    // toda expressão regular possui o método test 
    // que recebe o alvo do teste, retornando true
    // se passou, e false se falhou
    if(expressao.test(codigo)) {
          alert(`${codigo} : Código válido!`);
      } else {
          alert(`${codigo} :Código inválido!`);
      }

}

validaCodigo('GWZ-JJ-12'); // válido
validaCodigo('1X1-JJ-12'); // inválido