const path = require('path');

module.exports = {
  feedpage: async function (req, res) {
    try {
      const posts = await Post.find();
      const username = req.username || 'Guest';
      return res.view('pages/feedpage', { posts, username });
    } catch (err) {
      return res.serverError(err);
    }
  },

  newpostpage: function (req, res) {
    return res.view('pages/newpostpage');
  },

  create: async function (req, res) {
    console.log('Iniciando upload de imagem...');
    
    req.file('image').upload({
      dirname: path.resolve(sails.config.appPath, 'assets/images')
    }, async function (err, uploadedFiles) {
      if (err) {

        console.error('Erro ao carregar a imagem:', err);
        return res.status(500).json({ error: 'Erro ao carregar a imagem' });
      }

      console.log('Imagem carregada com sucesso:', uploadedFiles);

      if (uploadedFiles.length === 0) {
        console.log('Nenhuma imagem foi carregada.');
        return res.status(400).json({ error: 'Nenhuma imagem foi carregada' });
      }

      try {
        const newPost = await Post.create({
          timestamp: new Date(),
          description: req.body.description,
          username: req.username,
          idPfp: req.body.idPfp,
          imagePath: path.basename(uploadedFiles[0].fd)
        }).fetch();

        return res.status(201).json(newPost);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar a postagem' });
      }
    });
  }
};