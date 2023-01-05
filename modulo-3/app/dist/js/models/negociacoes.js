export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
    toString() {
        return `
        ${JSON.stringify(this.negociacoes)}
    `;
    }
    isEqual(objeto) {
        return JSON.stringify(this.negociacoes) === JSON.stringify(objeto);
    }
}
//# sourceMappingURL=negociacoes.js.map