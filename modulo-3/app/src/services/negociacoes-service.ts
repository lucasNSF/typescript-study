import { Negociacao } from "./../models/negociacao.js";
import { NegociacoesDoDia } from "../interfaces/negociacoes-do-dia.js";

export class NegociacoesService {
  public obterNegociacoes(): Promise<Negociacao[]> {
    const url = "http://localhost:8080/dados";
    return fetch(url)
      .then((res) => res.json())
      .then((data: NegociacoesDoDia[]) => {
        return data.map((d) => new Negociacao(new Date(), d.montante, d.vezes));
      });
  }
}
