import { MensagemView } from "./../views/mensagem-view.js";
import { NegociacoesView } from "./../views/negociacoes-view.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView", true);
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector("#data");
    this.inputQuantidade = document.querySelector(
      "#quantidade"
    ) as HTMLInputElement;
    this.inputValor = document.querySelector("#valor") as HTMLInputElement;
  }

  private ehDiaUtil(data: Date): boolean {
    return (
      data.getDay() === DiasDaSemana.DOMINGO ||
      data.getDay() === DiasDaSemana.SABADO
    );
  }

  public adiciona(): void {
    const negociacao = this.criaNegociacao();

    if (!this.ehDiaUtil(negociacao.data)) {
      negociacao.data.setDate(12);
      this.negociacoes.adiciona(negociacao);
      console.log(this.negociacoes.lista());
      this.limparFormulario();
      this.atualizaView();
    } else {
      this.mensagemView.update("Apenas negociações em dias úteis são aceitas!");
    }
  }

  private criaNegociacao(): Negociacao {
    return Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
