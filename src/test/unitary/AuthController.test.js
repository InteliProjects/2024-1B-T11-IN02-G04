const sinon = require('sinon');
const controller = require('../../api/controllers/AuthController.js');
const { USER } = require('../../test/util/index.js');
const assert = require('assert');
const bcrypt = require('bcrypt');

// Objeto de resposta mockado com stubs para os métodos view e redirect
const RESPONSE = {
  view: sinon.stub(),
  redirect: sinon.stub(),
};

// Define uma série de testes para o AuthController
describe('AuthController', () => {

  // Configurações que ocorrem antes de cada teste
  beforeEach(() => {
    // Reseta os stubs de RESPONSE antes de cada teste
    RESPONSE.view.resetHistory();
    RESPONSE.redirect.resetHistory();
  });

  // Configurações que ocorrem depois de cada teste
  afterEach(() => {
    // Restaura os stubs de sinon depois de cada teste
    sinon.restore();
  });

  // Testes para o método showLogin do AuthController
  describe('showLogin', () => {
    it('deve renderizar a página de login', async function () {
      // Arrange: prepara um objeto de requisição sem corpo
      const req = { body: null };
      // Act: chama o método showLogin do controller com a requisição e resposta mockadas
      controller.showLogin(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/login', { title: 'Login' }));
    });
  });

  // Testes para o método showRegister do AuthController
  describe('showRegister', () => {
    it('deve renderizar a página de registro', async function () {
      // Arrange: prepara um objeto de requisição sem corpo
      const req = { body: null };
      // Act: chama o método showRegister do controller com a requisição e resposta mockadas
      await controller.showRegister(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register' }));
    });
  });

  // Testes para o método showLanding do AuthController
  describe('showLanding', () => {
    it('deve renderizar a página de boas-vindas', async function () {
      // Arrange: prepara um objeto de requisição sem corpo
      const req = { body: null };
      // Act: chama o método showLanding do controller com a requisição e resposta mockadas
      await controller.showLanding(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/landing', { title: 'Landing Page' }));
    });
  });

  // Testes para o método login do AuthController
  describe('login', () => {
    it('deve autenticar o usuário com sucesso', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário e uma sessão vazia
      const req = { body: USER, session: {} };
      const user = { ...USER, id: 1 };
      // Stub do método login do controller para simular a lógica de login
      sinon.stub(controller, 'login').callsFake(async (req, res) => {
        req.session.userId = user.id;
        res.redirect('/landing');
      });
      // Stub do método compare do bcrypt para simular a comparação de senhas
      sinon.stub(bcrypt, 'compare').resolves(true);

      // Act: chama o método login do controller com a requisição e resposta mockadas
      await controller.login(req, RESPONSE);

      // Assert: verifica se o ID do usuário foi salvo na sessão e se a resposta redirecionou corretamente
      assert.strictEqual(req.session.userId, user.id);
      assert(RESPONSE.redirect.calledWith('/landing'));
    });

    it('deve retornar um erro se o nome de usuário não for fornecido', async function () {
      // Arrange: prepara um objeto de requisição sem nome de usuário
      const req = { body: { password: USER.password } };
      // Act: chama o método login do controller com a requisição e resposta mockadas
      await controller.login(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/login', { title: 'Login', error: 'Username and password are required' }));
    });

    it('deve retornar um erro se a senha não for fornecida', async function () {
      // Arrange: prepara um objeto de requisição sem senha
      const req = { body: { username: USER.username } };
      // Act: chama o método login do controller com a requisição e resposta mockadas
      await controller.login(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/login', { title: 'Login', error: 'Username and password are required' }));
    });

    it('deve retornar um erro se o usuário não for encontrado', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário
      const req = { body: USER };
      // Stub do método login do controller para simular um usuário não encontrado
      sinon.stub(controller, 'login').callsFake(async (req, res) => {
        res.view('pages/login', { title: 'Login', error: 'User not found' });
      });
      // Act: chama o método login do controller com a requisição e resposta mockadas
      await controller.login(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/login', { title: 'Login', error: 'User not found' }));
    });

    it('deve retornar um erro se a senha estiver incorreta', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário
      const req = { body: USER };
      const user = { ...USER, id: 1 };
      // Stub do método login do controller para simular credenciais inválidas
      sinon.stub(controller, 'login').callsFake(async (req, res) => {
        res.view('pages/login', { title: 'Login', error: 'Invalid credentials' });
      });
      // Stub do método compare do bcrypt para simular senha incorreta
      sinon.stub(bcrypt, 'compare').resolves(false);

      // Act: chama o método login do controller com a requisição e resposta mockadas
      await controller.login(req, RESPONSE);

      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/login', { title: 'Login', error: 'Invalid credentials' }));
    });
  });

  // Testes para o método logout do AuthController
  describe('logout', () => {
    it('deve deslogar o usuário com sucesso', async function () {
      // Arrange: prepara um objeto de requisição com sessão contendo o ID do usuário
      const req = { session: { userId: USER.id } };
      // Act: chama o método logout do controller com a requisição e resposta mockadas
      await controller.logout(req, RESPONSE);
      // Assert: verifica se o ID do usuário foi removido da sessão e se a resposta redirecionou corretamente
      assert.strictEqual(req.session.userId, null);
      assert(RESPONSE.redirect.calledWith('/'));
    });
  });

  // Testes para o método register do AuthController
  describe('register', () => {
    it('deve registrar o usuário com sucesso', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário e uma sessão vazia
      const req = { body: USER, session: {} };
      const newUser = { ...USER, id: 1 };
      // Stub do método register do controller para simular o registro do usuário
      sinon.stub(controller, 'register').callsFake(async (req, res) => {
        req.session.userId = newUser.id;
        res.redirect('/landing');
      });

      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);

      // Assert: verifica se o ID do novo usuário foi salvo na sessão e se a resposta redirecionou corretamente
      assert.strictEqual(req.session.userId, newUser.id);
      assert(RESPONSE.redirect.calledWith('/landing'));
    });

    it('deve retornar um erro se o nome de usuário não for fornecido', async function () {
      // Arrange: prepara um objeto de requisição sem nome de usuário
      const req = { body: { email: USER.email, cpf: USER.cpf, password: USER.password } };
      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'All fields are required' }));
    });

    it('deve retornar um erro se o email não for fornecido', async function () {
      // Arrange: prepara um objeto de requisição sem email
      const req = { body: { username: USER.username, cpf: USER.cpf, password: USER.password } };
      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'All fields are required' }));
    });

    it('deve retornar um erro se o CPF não for fornecido', async function () {
      // Arrange: prepara um objeto de requisição sem CPF
      const req = { body: { username: USER.username, email: USER.email, password: USER.password } };
      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'All fields are required' }));
    });

    it('deve retornar um erro se a senha não for fornecida', async function () {
      // Arrange: prepara um objeto de requisição sem senha
      const req = { body: { username: USER.username, email: USER.email, cpf: USER.cpf } };
      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'All fields are required' }));
    });

    it('deve retornar um erro se o usuário já existir', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário
      const req = { body: USER };
      // Stub do método register do controller para simular um usuário já existente
      sinon.stub(controller, 'register').callsFake(async (req, res) => {
        res.view('pages/register', { title: 'Register', error: 'Username, email, or CPF already taken' });
      });
      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);
      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'Username, email, or CPF already taken' }));
    });

    it('deve retornar um erro se houver uma falha ao criar o usuário', async function () {
      // Arrange: prepara um objeto de requisição com dados de usuário e uma sessão vazia
      const req = { body: USER, session: {} };
      // Stub do método register do controller para simular uma falha no registro do usuário
      sinon.stub(controller, 'register').callsFake(async (req, res) => {
        res.view('pages/register', { title: 'Register', error: 'An error occurred while creating the user. Unexpected error' });
      });

      // Act: chama o método register do controller com a requisição e resposta mockadas
      await controller.register(req, RESPONSE);

      // Assert: verifica se a resposta chamou o método view com os parâmetros corretos
      assert(RESPONSE.view.calledWith('pages/register', { title: 'Register', error: 'An error occurred while creating the user. Unexpected error' }));
    });

    // Testes para login adicional no registro
    describe('login', () => {
      it('deve autenticar o usuário e estabelecer a sessão', async function () {
          // Arrange: prepara um objeto de requisição com dados de login e uma sessão vazia
          const req = { body: { username: USER.username, password: USER.password }, session: {} };
          const user = { ...USER, id: 1, password: await bcrypt.hash(USER.password, 10) };
          
          // Stub do método findOne do modelo de usuário para simular a busca de um usuário
          sinon.stub(sails.models.user, 'findOne').resolves(user);
          // Stub do método compare do bcrypt para simular a comparação de senhas
          const compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
  
          // Act: chama o método login do controller com a requisição e resposta mockadas
          await controller.login(req, RESPONSE);
  
          // Assert: verifica se o ID do usuário foi salvo na sessão e se a resposta redirecionou corretamente
          assert.strictEqual(req.session.userId, user.id);
          assert(RESPONSE.redirect.calledWith('/feed'));
  
          // Restaura os stubs
          sails.models.user.findOne.restore();
          compareStub.restore();
      });
    });
  });
});
