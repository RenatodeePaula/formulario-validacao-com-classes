class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });         
    };  
    
    temSequencia(cpfLimpo) {
        const sequencia = cpfLimpo[0].repeat(cpfLimpo.length);
        return sequencia === cpfLimpo;
    }; 

    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);

        let regressivo = cpfArray.length  + 1;
        
        const total = cpfArray.reduce((acumulador, valorAtual) => {
            acumulador += (regressivo * (+valorAtual));
            regressivo --;
            return acumulador;
        }, 0);
        
        let digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);          
    };
    
    validar() {
        let trueFalse;
        if(typeof this.cpfLimpo === 'undefined') trueFalse = false;
        if(this.cpfLimpo.length !== 11) trueFalse =  false;
        
        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const digito1 = this.criaDigito(cpfParcial); 
        const digito2 = this.criaDigito(cpfParcial + digito1);
        const novoCPF = cpfParcial +  digito1 + digito2;
        if(novoCPF === this.cpfLimpo) trueFalse = true;
        if(this.temSequencia(this.cpfLimpo)) trueFalse = false;
        
        trueFalse ? trueFalse = true: trueFalse = false;
        return trueFalse;
    };    
   
};

const criaCPFValido = new ValidaCPF('058.51.126-50');

    