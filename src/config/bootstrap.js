module.exports.bootstrap = async function(cb) {

  // Verifica se já existem instituições cadastradas
  if (await Institution.count() > 0) {
    return cb();
  }

  // Cria algumas instituições
  await Institution.createEach([
    { name: 'Remo meu rumo', location: 'São Paulo', banner: 'https://www.gov.br/mds/pt-br/noticias-e-conteudos/esporte/noticias_esporte/com-suporte-da-lei-de-incentivo-remo-meu-rumo-promove-assistencia-inclusao-e-insercao-no-mercado-a-jovens-com-e-sem-deficiencia/17032021_remo_rumo_32.jpg/@@images/5bbed5dc-1ad8-4183-b938-7021f73524d2.jpeg' },
    { name: 'ABC aprendiz', location: 'São Paulo', banner: 'https://impactospositivos.com/storage/projeto/VEYUy9f022aXOzZNA2Yxi6mg5iN3hAy6omamz9bn.jpg' },
    { name: 'Agência do bem', location: 'Rio de Janeiro', banner: 'https://www.tupi.fm/wp-content/uploads/2023/08/WhatsApp-Image-2022-05-11-at-16.17.58-1-1-500x500-1.jpeg' },
    { name: 'Aldeias Infantis SOS', location: 'Amazonas', banner: 'https://www.aldeiasinfantis.org.br/getmedia/313628e7-8195-45f3-975a-21c072c4729f/Impacto-Social-2024_digital1_page-0001.jpg?width=397&height=561' },

  ]);

  return cb();
};