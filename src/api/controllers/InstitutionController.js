// api/controllers/InstitutionController.js
module.exports = {
  // Função para encontrar e retornar todas as instituições
  find: async function (req, res) {
    try {
      // Obter todas as instituições do banco de dados
      const institutions = await Institution.find();
      // Retornar as instituições em formato JSON
      return res.json(institutions);
    } catch (err) {
      // Retornar erro de servidor em caso de falha
      return res.serverError(err);
    }
  },
};
