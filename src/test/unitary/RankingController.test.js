const sinon = require('sinon');
const assert = require('assert');
const RankingController = require('../../api/controllers/RankingController.js');
const { USER, mockAsync } = require('../../test/util/index.js');

const RESPONSE = {
    view: sinon.stub(),
    redirect: sinon.stub(),
  };

describe('RankingController', () => {

  beforeEach(() => {
    // Reseta os stubs antes de cada teste
    RESPONSE.view.resetHistory();
  });

  afterEach(() => {
    // Restaura os stubs depois de cada teste
    sinon.restore();
  });

  describe('index', () => {
      it('should render the ranking page', async () => {
        // Chama a função index do controller
        await RankingController.showRanking({}, RESPONSE);
        // Verifica se a função view foi chamada
        assert(RESPONSE.view.called);
      });
      it('Error fetching ranking data:', async () => {
        // Cria um stub para a função find do modelo User baseada nas funções mockAsync e USER
        const findStub = mockAsync(User, "find", USER);
        // Chama a função index do controller
        await RankingController.showRanking({}, RESPONSE);
        // Verifica se a função find foi chamada
        assert(findStub.called);
      });
    });
  });

