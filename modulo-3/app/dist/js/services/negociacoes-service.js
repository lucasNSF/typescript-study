import { Negociacao } from "./../models/negociacao.js";
export class NegociacoesService {
    obterNegociacoes() {
        const url = "http://localhost:8080/dados";
        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
            return data.map((d) => new Negociacao(new Date(), d.montante, d.vezes));
        });
    }
}
//# sourceMappingURL=negociacoes-service.js.map