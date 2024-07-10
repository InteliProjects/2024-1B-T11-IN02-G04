module.exports = {
  attributes: {
    // Referência ao usuário que realizou a interação
    user: {
      model: 'User', // Relacionamento com o modelo User
      required: true // Campo obrigatório
    },
    // Referência à instituição com a qual o usuário interagiu
    institution: {
      model: 'Institution', // Relacionamento com o modelo Institution
      required: true // Campo obrigatório
    },
    // Indica se o usuário curtiu (true) ou não curtiu (false) a instituição
    liked: {
      type: 'boolean',
      required: true // Campo obrigatório
    }
  }
};
