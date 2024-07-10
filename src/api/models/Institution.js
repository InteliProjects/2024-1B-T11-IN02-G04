// api/models/Institution.js

module.exports = {
  attributes: {
    // Nome da instituição
    name: {
      type: 'string',
      required: true // Campo obrigatório
    },
    // Localização da instituição
    location: {
      type: 'string',
      required: true // Campo obrigatório
    },
    // Caminho para o banner da instituição
    banner: {
      type: 'string'
    }
  }
};