// api/models/Skill.js

module.exports = {
  attributes: {
    // Nome da habilidade
    name: {
      type: 'string',
      required: true, // Campo obrigatório
    },
    // Referência ao voluntário associado à habilidade
    user: {
      model: 'user', // Relacionamento com o modelo Volunteer
      required: true, // Campo obrigatório
    },
  },
};
