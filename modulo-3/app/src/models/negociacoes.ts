import { Negociacao } from "./negociacao.js";
import { Modelo } from "../interfaces/modelo.js";

export class Negociacoes implements Modelo<Negociacoes> {
  private negociacoes: Negociacao[] = [];

  public adiciona(negociacao: Negociacao) {
    this.negociacoes.push(negociacao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }

  public toString(): string {
    return `
        ${JSON.stringify(this.negociacoes)}
    `;
  }

  public isEqual(objeto: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) === JSON.stringify(objeto);
  }
}
