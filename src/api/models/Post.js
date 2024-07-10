// api/models/Post.js

module.exports = {
  attributes: {
    // Título da postagem
    title: {
      type: 'string',
      required: true, // Campo obrigatório
    },
    // Caminho da imagem associada à postagem
    image: {
      type: 'string',
    },
    // Referência ao voluntário que criou a postagem
    user: {
      model: 'user', // Relacionamento com o modelo Volunteer
      required: true, // Campo obrigatório
    },
    // ID da postagem, com auto incremento e valor único
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'id',
    },
    // Timestamp da criação da postagem
    timestamp: {
      type: 'ref',
      columnType: 'timestamp',
      required: true,
      columnName: 'timestamp'
    },
    // Descrição da postagem, com limite de 220 caracteres
    description: {
      type: 'string',
      maxLength: 220,
      columnName: 'description'
    },
    // Nome fictício do autor da postagem
    fantasyName: {
      type: 'string',
      required: true,
      columnName: 'fantasy_name'
    },
    // ID da foto de perfil associada à postagem (opcional)
    idPfp: {
      type: 'string',
      allowNull: true,
      columnName: 'id_pfp'
    },
    // Caminho da imagem da postagem (opcional)
    imagePath: {
      type: 'string',
      allowNull: true,
      columnName: 'image_path'
    },
  }
};
