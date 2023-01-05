import { escaparTexto } from "../decorators/escapar-texto.js";
import { View } from "./view.js";

export class MensagemView extends View<string> {
  @escaparTexto()
  protected template(model: string): string {
    return `
            <p class="alert alert-info">${model}</p>
            <script>alert("oi")</script>
        `;
  }
}
