module.exports.routes = {
  '/': 'AuthController.showLanding',
  'GET /register': 'AuthController.showRegister',
  'GET /landing': 'AuthController.showLanding',
  'GET /ranking': 'RankingController.showRanking', // Nova rota para a página de ranking
  'GET /login': 'AuthController.showLogin',
  'GET /api/institutions': 'InstitutionController.getInstitutions',
  'GET /vmatch': 'VmatchController.showVmatch',
  'GET /vmatch-1': 'VmatchController.vmatch',
  
  'POST /vmatch/like': 'VmatchController.like',
  'POST /vmatch/dislike': 'VmatchController.dislike',
  'POST /login': 'AuthController.login',
  'POST /logout': 'AuthController.logout',
  'POST /register': 'AuthController.register',
  
  'GET /api/institution': 'InstitutionController.find',

  'POST /api/vmatch/like': 'VmatchController.like',
  'POST /api/vmatch/dislike': 'VmatchController.dislike',
  'GET /api/vmatch/interactions': 'VmatchController.getInteractions',
  'GET /api/vmatch/institutions': 'VmatchController.getInstitutions',
  
  'GET /feed': 'FeedController.feedpage',
  'GET /feed/new': 'FeedController.newpostpage',
  'POST /feed/create': 'FeedController.create',
  
  'GET /jobs': 'JobFeedController.jobFeedPage',
  'GET /jobs/new': 'JobFeedController.newJobPostPage',
  'POST /jobs/create': 'JobFeedController.createJobPost',

  // Corrigir a rota para exibir o perfil de usuário usando o controlador apropriado
  'GET /profileCard': 'UserController.profile',

  // Corrigir as rotas para corresponder às ações do controlador
  'GET /user/:id/profile': 'UserController.profile',
  'GET /user/:id': 'UserController.getUser',
  'GET /user/:id/posts': 'UserController.getUserPosts',
  'GET /user/:id/skills': 'UserController.getUserSkills',
  'GET /user/:id/categories': 'UserController.getUserCategories',
  'GET /user/:id/achievements': 'UserController.getUserAchievements',

  // Nova rota para perfil de voluntário com base no username
  'GET /volunteer/profile': 'UserController.profileByUsername',

  // Nova rota para atualizar o perfil do usuário
  'POST /user/updateProfile': 'UserController.updateProfile'

};
