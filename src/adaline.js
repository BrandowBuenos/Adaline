var Adaline = /** @class */ (function () {
  class Adaline {
    constructor() {
      this.weight = [0, 0];
      this.bias = 0;
      this.eta = 0.01;
      this.soma = 0;
      this.y = 0;
      this.ganho = 100;
      this.t = [];
      this.x = [
        [-1, -1],
        [-1, +1],
        [+1, -1],
        [+1, +1],
      ];
    }
    criaTreinamento(lista) {
      for (var i = 0; i < 4; i++) this.t[i] = lista[i];
    }
    f(arg) {
      return Math.tan(arg * this.ganho);
    }
    propaga(index) {
      var soma = 0;
      for (var j = 0; j < 2; j++) soma += this.x[index][j] * this.weight[j];
      return soma + this.bias;
    }
    propaga2(x1, x2) {
      var soma = 0;
      soma = x1 * this.weight[0] + x2 * this.weight[1];
      return soma + this.bias;
    }
    atualizaPesos(index, y_res) {
      for (var j = 0; j < 2; j++) {
        this.weight[j] += this.eta * (this.t[index] - y_res) * this.x[index][j];
      }
    }
    atualizaBias(index, y_res) {
      this.bias += (this.t[index] - y_res) * this.eta;
    }
    treinamento(maxInteracoes) {
      var y_interm;
      for (var k = 1; k < maxInteracoes; k++) {
        var hits = 0;
        for (var i = 0; i < 4; i++) {
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
      for (var l = 0; l < 4; l++)
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
  return Adaline;
})();
var AND = [-1, 1, -1, -1];
var OR = [-1, 1, 1, 1];
var XOR = [-1, -1, 1, 1];
var adaline = new Adaline();
adaline.criaTreinamento(OR);
adaline.treinamento(1500);
// adaline.apresentaResultado();
console.log("P3\n300 300\n255");
for (var x1 = -1.5; x1 < 1.5; x1 += 0.01) {
  for (var x2 = -1.5; x2 < 1.5; x2 += 0.01) {
    if (
      Math.abs(Math.abs(x1) - 1.0) < 0.2 &&
      Math.abs(Math.abs(x2) - 1.0) < 0.2
    ) {
      console.log("255 0 0 ");
    } else if (adaline.propaga2(x1, x2) < 0) {
      console.log("255 255 0 ");
    } else console.log("0 255 255 ");
  }
  console.log("\n");
}
