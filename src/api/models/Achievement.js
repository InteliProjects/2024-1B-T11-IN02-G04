// api/models/Achievement.js

module.exports = {
  attributes: {
    // Nome da conquista
    name: {
      type: 'string',
      required: true, // Campo obrigatório
    },
    // Caminho da imagem da conquista
    img: {
      type: 'string',
    },
    // Referência ao voluntário que recebeu a conquista
    user: {
      model: 'user', // Relacionamento com o modelo Volunteer
      required: true, // Campo obrigatório
    },
  },
};
