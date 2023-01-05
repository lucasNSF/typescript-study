import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Imprimivel[]) {
  objetos.forEach((n) => {
    console.log(n.toString());
  });
}
