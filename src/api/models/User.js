const bcrypt = require('bcrypt');

// api/models/User.js
module.exports = {
  attributes: {
    // Nome de usuário do voluntário, deve ser único
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    // Nome do usuário
    name: {
      type: 'string',
      maxLength: 14
    },
    // Senha do usuário
    password: {
      type: 'string',
      required: true
    },
    // Email do usuário, deve ser único e um email válido
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    // CPF do usuário, deve ser único
    cpf: {
      type: 'string',
      required: true,
      unique: true
    },
    // Chave estrangeira para a foto de perfil
    id_pfp: {
      type: 'string'
    },
    // Permissão do usuário
    id_permission: {
      type: 'number',
      defaultsTo: 2
    },
    // Chave estrangeira para as ações
    id_actions: {
      type: 'number'
    },
    // Número de horas registradas pelo usuário
    work_hours: {
      type: 'number',
      defaultsTo: 0
    },
    // Descrição do usuário
    description: {
      type: 'string',
      maxLength: 220
    },
    // Chave estrangeira para as postagens
    id_posts: {
      type: 'number',
      defaultsTo: 0
    },
    // Data de registro
    registered_when: {
      type: 'ref',
      columnType: 'timestamp',
      defaultsTo: new Date()
    },
    // Tags do usuário
    tags: {
      type: 'string',
    },

    // Associações
    posts: {
      collection: 'post',
      via: 'user'
    },
    skills: {
      collection: 'skill',
      via: 'user'
    },
    categories: {
      collection: 'category',
      via: 'user'
    },
    achievements: {
      collection: 'achievement',
      via: 'user'
    }
  },

  // Lifecycle callback para hashear a senha antes de criar um novo usuário
  beforeCreate: async function (user, proceed) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      return proceed();
    } catch (err) {
      return proceed(err);
    }
  }
};