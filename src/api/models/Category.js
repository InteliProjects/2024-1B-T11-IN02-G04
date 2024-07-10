// api/models/Category.js

module.exports = {
  attributes: {
    // Nome da categoria
    name: {
      type: 'string',
      required: true, // Campo obrigatório
    },
    // Referência ao voluntário associado à categoria
    user: {
      model: 'user', // Relacionamento com o modelo Volunteer
      required: true, // Campo obrigatório
    },
    User: {
      model: 'User',
      required: true,
      via: 'categories'
      
    }
  },
};
