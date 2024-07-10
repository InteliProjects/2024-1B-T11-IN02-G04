/**
 * JobFeedController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');

module.exports = {
  // Renderizar a página do feed com as postagens de vagas
  jobFeedPage: async function (req, res) {
    try {
      // Obter todas as postagens de vagas do banco de dados
      const jobPosts = await JobPost.find();
      // Renderizar a página do feed com as postagens de vagas obtidas
      return res.view('pages/jobFeedPage', { jobPosts });
    } catch (err) {
      // Log de erro em caso de falha na busca das postagens de vagas
      console.error('Erro ao buscar postagens de vagas:', err);
      // Retornar erro de servidor
      return res.serverError(err);
    }
  },

  // Renderizar a página para criar uma nova postagem de vaga
  newJobPostPage: function (req, res) {
    // Renderizar a página de criação de nova postagem de vaga
    return res.view('pages/newJobPostPage');
  },

  // Função para criar uma nova postagem de vaga
  createJobPost: async function (req, res) {
    // Log de recebimento de solicitação para criar nova postagem de vaga
    console.log('Recebendo solicitação para criar nova postagem de vaga');

    req.file('image').upload({
      // Definir o diretório onde as imagens serão salvas
      dirname: path.resolve(sails.config.appPath, 'assets/images')
    }, async function (err, uploadedFiles) {
      if (err) {
        // Log e retorno de erro se ocorrer um problema ao carregar a imagem
        console.error('Erro ao carregar a imagem:', err);
        return res.status(500).json({ error: 'Erro ao carregar a imagem' });
      }

      if (uploadedFiles.length === 0) {
        // Log e retorno de erro se nenhuma imagem for carregada
        console.error('Nenhuma imagem foi carregada');
        return res.status(400).json({ error: 'Nenhuma imagem foi carregada' });
      }

      // Coletar todos os campos do formulário, exceto arquivos
      const fields = req.allParams();
      console.log('Dados recebidos:', fields);

      if (!fields.tag) {
        // Log e retorno de erro se o campo tag estiver faltando
        console.error('Campo tag está faltando');
        return res.status(400).json({ error: 'Campo tag está faltando' });
      }

      if (!fields.description || !fields.fantasyName) {
        // Log e retorno de erro se os campos obrigatórios estiverem faltando
        console.error('Campos obrigatórios estão faltando');
        return res.status(400).json({ error: 'Campos obrigatórios estão faltando' });
      }

      try {
        // Criar uma nova postagem de vaga com os dados fornecidos
        const newJobPost = await JobPost.create({
          timestamp: new Date(), // Timestamp da criação da postagem de vaga
          description: fields.description, // Descrição da vaga
          fantasyName: fields.fantasyName, // Nome fictício do autor
          idPfp: fields.idPfp, // Chave estrangeira para a foto de perfil
          tag: fields.tag, // Tag da postagem de vaga
          imagePath: path.basename(uploadedFiles[0].fd) // Caminho da imagem da postagem
        }).fetch();

        // Log de sucesso e retorno da nova postagem de vaga criada
        console.log('Postagem de vaga criada com sucesso:', newJobPost);
        return res.status(201).json(newJobPost);
      } catch (error) {
        // Log e retorno de erro se ocorrer um problema ao criar a postagem de vaga
        console.error('Erro ao criar a postagem de vaga:', error);
        return res.status(500).json({ error: 'Erro ao criar a postagem de vaga' });
      }
    });
  }
};
