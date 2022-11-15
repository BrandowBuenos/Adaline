var Adaline3 = /** @class */ (function () {
  class Adaline3 {
    constructor() {
      this.weight = [0, 0, 0];
      this.bias = 0;
      this.eta = 0.1;
      this.soma = 0;
      this.y = 0;
      this.ganho = 100;
      this.t = [];
      this.x = [
        [-1, -1, -1],
        [-1, -1, +1],
        [-1, +1, -1],
        [-1, +1, +1],
        [+1, -1, -1],
        [+1, -1, +1],
        [+1, +1, -1],
        [+1, +1, +1],
      ];
    }
    criaTreinamento(lista) {
      for (var i = 0; i < 8; i++) this.t[i] = lista[i];
    }
    f(arg) {
      const result = Math.tanh(arg * this.ganho);
      return result;
    }
    propaga(index) {
      var soma = 0;
      for (var j = 0; j < 3; j++) soma += this.x[index][j] * this.weight[j];
      return soma + this.bias;
    }
    propaga2(x1, x2, x3) {
      var soma = 0;
      soma = x1 * this.weight[0] + x2 * this.weight[1] + x3 * this.weight[2];
      return soma + this.bias;
    }
    atualizaPesos(index, y_res) {
      for (var j = 0; j < 3; j++) {
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
        for (var i = 0; i < 8; i++) {
          y_interm = this.propaga(i);
          this.y = this.f(y_interm);
          this.atualizaPesos(i, y_interm);
          if (this.y == this.t[i]) {
            hits += 1;
          } else this.atualizaBias(i, y_interm);
        }
        if (hits == 8) {
          console.log("Aprendizado concluído com " + k + " iteracoes");
          break;
        }
      }
    }
    apresentaResultado() {
      for (var l = 0; l < 8; l++)
        console.log(
          "x[0]= " +
            this.x[l][0] +
            ", x[1]= " +
            this.x[l][1] +
            ", x[2]= " +
            this.x[l][2] +
            ", resultado: " +
            this.f(this.propaga(l))
        );
    }
  }
  return Adaline3;
})();

var OR3 = [-1, 1, 1, -1, 1, -1, -1, 1];
var AND3 = [-1, -1, -1, -1, -1, -1, -1, 1];
var XOR3 = [-1, 1, 1, -1, 1, -1, -1, 1];

var adaline = new Adaline3();
adaline.criaTreinamento(XOR3);
adaline.treinamento(1500);
adaline.apresentaResultado();
