import { NegociacoesService } from "./../services/negociacoes-service.js";
import { domInject } from "../decorators/dom-inject.js";
import { inspect } from "../decorators/inspecionar.js";
import { logarTempoExecucao } from "../decorators/logar-tempo-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInject("#data")
  private inputData: HTMLInputElement;

  @domInject("#quantidade")
  private inputQuantidade: HTMLInputElement;

  @domInject("#valor")
  private inputValor: HTMLInputElement;

  private negociacoes = new Negociacoes();
  private servico = new NegociacoesService();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoExecucao(true)
  @inspect
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );

    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
      return;
    }

    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
    imprimir(this.negociacoes, negociacao);
  }

  public importaDados(): void {
    this.servico
      .obterNegociacoes()
      .then((negociacoesHoje) => {
        return negociacoesHoje.filter((n) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.isEqual(n));
        });
      })
      .then((negociacoesHoje: Negociacao[]) => {
        for (let negociacao of negociacoesHoje) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private ehDiaUtil(data: Date) {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
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
    this.mensagemView.update("Negociação adicionada com sucesso");
  }
}
