const input = [4, 3, 9, 7, 2, 1]

const squareOrRoot = (input) => {
  return input.map((valor) => {
    return Number.isInteger(Math.sqrt(valor)) ? valor : valor * valor
  })
}

console.log(squareOrRoot(input))
