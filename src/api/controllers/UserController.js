// UserController.js
const fs = require('fs');
const path = require('path');
module.exports = {
// api/controllers/UserController.js
  profile: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await User.findOne({ id: userId })
        .populate('posts')
        .populate('skills')
        .populate('categories')
        .populate('achievements');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log(user);

      return res.view('pages/profileCard', {
        profileImage: user.profileImage || 'default-profile-image',
        username: user.username,
        name: user.name,
        title: user.title,
        about: user.description,
        phone: user.phone,
        email: user.email,
        city: user.city,
        workedHours: user.work_hours,
        skills: user.skills.map(skill => skill.name),
        categories: user.categories.map(category => category.name),
        achievements: user.achievements.map(achievement => ({ img: achievement.img })),
        posts: user.posts.map(post => ({ image: post.image, title: post.title, description: post.description }))
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  updateProfile: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updatedData = {
        name: req.body.name,
        description: req.body.description
      };

      // Validação no backend para garantir que os dados são válidos
      if (updatedData.name.length > 14) {
        return res.status(400).json({ error: 'Name cannot be longer than 14 characters' });
      }

      req.file('profileImage').upload({
        dirname: path.resolve(sails.config.appPath, 'assets/images'),
        maxTimeToBuffer: 10000 // Aumenta o tempo de buffer para 10 segundos
      }, async function (err, uploadedFiles) {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }
        if (uploadedFiles.length > 0) {
          updatedData.id_pfp = path.basename(uploadedFiles[0].fd);
        }

        try {
          await User.updateOne({ id: userId }).set(updatedData);
          return res.status(200).json({ message: 'Profile updated successfully' });
        } catch (updateErr) {
          console.error('Error updating user profile:', updateErr);
          return res.status(500).json({ error: 'Error updating profile' });
        }
      });

    } catch (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  profileByUsername: async function (req, res) {
    try {
      const username = req.cookies.username;
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await User.findOne({ username })
        .populate('posts')
        .populate('skills')
        .populate('categories')
        .populate('achievements');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.view('pages/profileCard', {
        profileImage: user.profileImage || 'default-profile-image',
        username: user.username,
        name: user.name,
        title: user.title,
        about: user.description,
        phone: user.phone,
        email: user.email,
        city: user.city,
        workedHours: user.work_hours,
        skills: user.skills.map(skill => skill.name),
        categories: user.categories.map(category => category.name),
        achievements: user.achievements.map(achievement => ({ img: achievement.img })),
        posts: user.posts.map(post => ({ image: post.image, title: post.title, description: post.description }))
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Outras ações do controlador permanecem as mesmas

  getUser: async function (req, res) {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  getUserPosts: async function (req, res) {
    try {
      const posts = await Post.find({ user: req.params.id });
      return res.json(posts);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  getUserSkills: async function (req, res) {
    try {
      const skills = await Skill.find({ user: req.params.id });
      return res.json(skills);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  getUserCategories: async function (req, res) {
    try {
      const categories = await Category.find({ user: req.params.id });
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  },

  getUserAchievements: async function (req, res) {
    try {
      const achievements = await Achievement.find({ user: req.params.id });
      return res.json(achievements);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  }
};