import { MensagemView } from "./../views/mensagem-view.js";
import { NegociacoesView } from "./../views/negociacoes-view.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
    }
    ehDiaUtil(data) {
        return (data.getDay() === DiasDaSemana.DOMINGO ||
            data.getDay() === DiasDaSemana.SABADO);
    }
    adiciona() {
        const negociacao = this.criaNegociacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            negociacao.data.setDate(12);
            this.negociacoes.adiciona(negociacao);
            console.log(this.negociacoes.lista());
            this.limparFormulario();
            this.atualizaView();
        }
        else {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas!");
        }
    }
    criaNegociacao() {
        return Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
    }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
}
