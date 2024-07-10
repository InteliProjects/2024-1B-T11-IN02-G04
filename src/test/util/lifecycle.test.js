var sails = require("sails");

// Função executada antes de todos os testes
before(function (done) {
  // Define um tempo limite de 10 segundos para esta operação
  this.timeout(20000);

  // Levanta a aplicação Sails com configurações específicas
  sails.lift(
    {
      // Desabilita os hooks de grunt e csrf para os testes
      hooks: { grunt: false, csrf: false },
      // Define o nível de log como "warn" para reduzir a verbosidade
      log: { level: "warn" },
    },
    function (err) {
      // Verifica se houve um erro ao levantar a aplicação
      if (err) {
        return done(err); // Finaliza com o erro
      }

      return done(); // Finaliza com sucesso
    }
  );
});

// Função executada após todos os testes
after(function (done) {
  // Baixa a aplicação Sails
  sails.lower(done);
});
