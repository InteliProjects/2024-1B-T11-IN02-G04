/**
 * JobPost.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // ID da postagem de vaga, com auto incremento e valor único
    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
      columnName: 'id',
    },
    // Timestamp da criação da postagem de vaga
    timestamp: {
      type: 'ref',
      columnType: 'timestamp',
      required: true,
      columnName: 'timestamp'
    },
    // Descrição da postagem de vaga, com limite de 220 caracteres
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
    // Tag associada à postagem de vaga
    tag: {
      type: 'string',
      required: true,
      columnName: 'tag'
    }
  }
};
