class DateHelper{

    constructor(){
        throw new Error('Esta classe não é para ser instanciada. Os métodos da classe são estáticos');
    }


    static dataParaTexto(data) {
        //uso de template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }
    
    static textoParaData(texto) {
        //uso de regex
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error('Deve estar no formato aaaa-mm-dd');
             //uso de ... (spread operator para extração dos elementos do array)
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

}


