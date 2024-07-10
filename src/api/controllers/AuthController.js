const bcrypt = require('bcrypt');

module.exports = {
  showLogin: function (req, res) {
    return res.view('pages/login', { title: 'Login' });
  },

  showRegister: function (req, res) {
    return res.view('pages/register', { title: 'Register' });
  },

  showLanding: function (req, res) {
    const username = req.username || 'Guest';
    return res.view('pages/landing', { title: 'Landing Page', username });
  },

  showRankingVoluntarios: function (req, res) {
    return res.view('pages/rankingVoluntarios', { title: 'Ranking' });
  },

  showVmatch: function (req, res) {
    return res.view('layouts/vmatch', { title: 'vmatch page' });
  },

  showRanking: function (req, res) {
    return res.view('pages/ranking', { title: 'ranking' });
  },

  login: async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.view('pages/login', { title: 'Login', error: 'Username and password are required' });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.view('pages/login', { title: 'Login', error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.view('pages/login', { title: 'Login', error: 'Invalid credentials' });
      }

      req.session.userId = user.id;

      res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });

      return res.redirect('/profile');
    } catch (err) {
      console.error('Error during login:', err);
      return res.view('pages/login', { title: 'Login', error: 'An error occurred while logging in' });
    }
  },

  logout: function (req, res) {
    req.session.userId = null;
    res.clearCookie('username');
    return res.redirect('/');
  },

  register: async function (req, res) {
    const { username, email, cpf, password } = req.body;

    if (!username || !email || !cpf || !password) {
      return res.view('pages/register', { title: 'Register', error: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.view('pages/register', { title: 'Register', error: 'Invalid email format' });
    }

    if (!validateCPF(cpf)) {
      return res.view('pages/register', { title: 'Register', error: 'Invalid CPF format' });
    }

    try {
      const existingUser = await User.findOne({ or: [{ username }, { email }, { cpf }] });

      if (existingUser) {
        return res.view('pages/register', { title: 'Register', error: 'Username, email, or CPF already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        cpf,
        password: hashedPassword,
      }).fetch();

      req.session.userId = newUser.id;
      res.cookie('username', newUser.username, { maxAge: 900000, httpOnly: true });

      return res.redirect('/landing');
    } catch (err) {
      console.error('Error during registration:', err);
      return res.view('pages/register', { title: 'Register', error: 'An error occurred while creating the user. ' + err.message });
    }
  },

  profile: async function (req, res) {
      
        try {
      // Leia o cookie 'username'
      const username = req.cookies.username;

      // Adicione um log para verificar o valor do cookie
      console.log('Cookie username:', username);

      // Verifique se o cookie 'username' está presente
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      // Busque o usuário pelo username
      const user = await User.findOne({ username })
        .populate('posts')
        .populate('skills')
        .populate('categories')
        .populate('achievements');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Adicione um log para verificar os dados do usuário
      console.log('User data:', user);

      // Renderize a view 'profileCard' com os dados do usuário
      return res.view('pages/profileCard', {
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
  }
};

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateCPF(cpf) {
  const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return re.test(cpf);
}
