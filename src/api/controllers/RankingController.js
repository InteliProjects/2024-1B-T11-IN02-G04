module.exports = {
  // Função para mostrar o ranking dos usuários
  showRanking: async function (req, res) {
    try {
      // Busca os usuários no banco de dados e ordena pelo campo 'work_hours' de forma decrescente
      // Limita a exibição aos top 10 usuários
      const users = await User.find().sort('work_hours DESC').limit(10);

      // Renderiza a página de ranking com os dados dos usuários
      return res.view('pages/ranking', { title: 'Ranking', users });
    } catch (err) {
      // Log de erro em caso de falha na busca dos dados de ranking
      console.error('Error fetching ranking data:', err);

      // Renderiza a página de ranking com uma mensagem de erro
      return res.view('pages/ranking', { title: 'Ranking', error: 'An error occurred while fetching ranking data.' });
    }
  }
};