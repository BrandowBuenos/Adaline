// Algoritmo

class Adaline {
  weight = [0, 0];

  bias = 0;
  eta = 0.01;
  soma = 0;
  y = 0;
  ganho = 100;

  t: any[] = [];

  x = [
    [-1, -1],
    [-1, +1],
    [+1, -1],
    [+1, +1],
  ];

  criaTreinamento(lista: Array<number>) {
    for (let i = 0; i < 4; i++) this.t[i] = lista[i];
  }

  f(arg: number) {
    return Math.tanh(arg * this.ganho);
  }

  propaga(index: number) {
    let soma = 0;
    for (let j = 0; j < 2; j++) soma += this.x[index][j] * this.weight[j];
    return soma + this.bias;
  }

  propaga2(x1: number, x2: number) {
    let soma = 0;
    soma = x1 * this.weight[0] + x2 * this.weight[1];
    return soma + this.bias;
  }

  atualizaPesos(index: number, y_res: number) {
    for (let j = 0; j < 2; j++) {
      this.weight[j] += this.eta * (this.t[index] - y_res) * this.x[index][j];
    }
  }

  atualizaBias(index: number, y_res: number) {
    this.bias += (this.t[index] - y_res) * this.eta;
  }

  treinamento(maxInteracoes: number) {
    let y_interm: number;

    for (let k = 1; k < maxInteracoes; k++) {
      let hits = 0;

      for (let i = 0; i < 4; i++) {
        y_interm = this.propaga(i);

        this.y = this.f(y_interm);

        this.atualizaPesos(i, y_interm);

        if (this.y == this.t[i]) hits += 1;
        else this.atualizaBias(i, y_interm);
      }
      if (hits == 4) {
        console.log("Aprendizado concluído com " + k + " iteracoes");
        break;
      }
    }
  }

  apresentaResultado() {
    for (let l = 0; l < 4; l++)
      console.log(
        "x[0]= " +
          this.x[l][0] +
          ", x[1]= " +
          this.x[l][1] +
          ", resultado: " +
          this.f(this.propaga(l))
      );
  }
}

const AND = [-1, 1, -1, -1];
const OR = [-1, 1, 1, 1];
const XOR = [-1, -1, 1, 1];

const adaline = new Adaline();

adaline.criaTreinamento(OR);
adaline.treinamento(1500);
adaline.apresentaResultado();

// console.log("P3\n301 301\n255");
// for (let x1 = -1.5; x1 < 1.5; x1 += 0.01) {
//   for (let x2 = -1.5; x2 < 1.5; x2 += 0.01) {
//     if (
//       Math.abs(Math.abs(x1) - 1.0) < 0.2 &&
//       Math.abs(Math.abs(x2) - 1.0) < 0.2
//     ) {
//       console.log("255 0 0 ");
//     } else if (adaline.propaga2(x1, x2) < 0) {
//       console.log("255 255 0 ");
//     } else console.log("0 255 255 ");
//   }
//   console.log("\n");
// }
