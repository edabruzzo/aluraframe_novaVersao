class NegociacoesView extends View{


    constructor(elemento){
        super(elemento);
    }


    //o template só saberá que é uma lista de negociações em tempo de execução
    _template(model) {
        console.log('Model.negociacoes : '+model.negociacoes);        
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.negociacoes.map(n => {

                    console.log('n: '+ n);
            return `
        <tr>
            <td>${DateHelper.dataParaTexto(n.data)}</td>
            <td>${n.quantidade}</td>
            <td>${n.valor}</td>
            <td>${n.volume}</td>
        </tr>
                    `
        }).join('')}
            </tbody>
           
            <tfoot>
                <td colspan="3"></td>
                <td>
                
                ${//este código faz exatamente a mesma coisa que aquele que usa o reduce logo abaixo
                    (function() {
            
                        let total = 0;
                        model.negociacoes.forEach(n => total+= n.volume);
                        return total;
                  })()
                 }
                
                
                </td>
                
                
                
                <td>
                
                ${//usando reduce
                    model.negociacoes.reduce(function (total, n) {
                        return total + n.volume;
                    }, 0.0)
                }
                
                </td>
                <td>
                
                ${//usando arrow function
                    model.negociacoes.reduce((total, n) => total + n.volume, 0.0)
                }
                
                </td>

            </tfoot>
     </table>
            `;
    }


}