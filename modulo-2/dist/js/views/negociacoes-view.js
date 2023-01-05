import { View } from "./View.js";
export class NegociacoesView extends View {
    template(model) {
        return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
          ${model
            .lista()
            .map((n) => {
            return `
              <tr>
                <td>${this.formataData(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
              </tr>
            `;
        })
            .join("")}
        </tbody>
      </table>
    `;
    }
    formataData(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
