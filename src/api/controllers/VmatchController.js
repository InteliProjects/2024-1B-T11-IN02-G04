/**
 * VmatchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    showVmatch: async function(req, res) {
        return res.view('pages/vmatch', { title: 'Vmatch' });
    },

    vmatch: async function(req, res) {
        try {
          const voluntariados = await Voluntariado.find();
          return res.view('pages/vmatch', { voluntariados });
        } catch (err) {
          return res.serverError(err);
        }
      },

    like: async function (req, res) {
        try {
            const voluntariadoId = req.body.voluntariadoId;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            let user = await User.findOne({ id: userId });
            if(!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            user.likes = user.likes.includes(voluntariadoId) ? user.likes : [...user.likes, voluntariadoId];

            await User.updateOne({ id: userId }).set({ likes: user.likes });

            return res.status(200).json({ message: 'Voluntariado curtido com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao curtir voluntariado' });
        }
    },

    dislike: async function (req, res) {
        try {
            const voluntariadoId = req.body.voluntariadoId;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            let user = await User.findOne({ id: userId });
            if(!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            user.dislikes = user.dislikes.includes(voluntariadoId) ? user.dislikes : [...user.dislikes, voluntariadoId];

            await User.updateOne({ id: userId }).set({ dislikes: user.dislikes });

            return res.status(200).json({ message: 'Voluntariado descurtido com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao descurtir voluntariado' });
        }
    }

};

