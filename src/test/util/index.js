const sinon = require("sinon");

// Função para criar um stub assíncrono de um módulo de um modelo
const mockAsync = (model, module, result) => {
  return sinon.stub(model, module).resolves(result);
};

// Objeto de resposta mockado com métodos json, status e view
const RESPONSE = {
  json: function (data) {
    return data;
  },
  status: function (data) {
    return data;
  },
  view: function (data) {
    return data;
  },
};

// Objeto representando um usuário de teste
const USER = {
  username: "TestUser",
  email: "Test@user.com",
  password: "123456",
  cpf: "123.456.789-00",
  hours: 100,
};

// Exporta as funções e objetos para serem utilizados em outros módulos
module.exports = {
  mockAsync,
  RESPONSE,
  USER
};
