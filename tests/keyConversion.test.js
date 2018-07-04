const convertCase = require('./../lib/utils/key-conversion.util');

const data = [
  {
    snake: 'lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_in_vitae_urna_erat_fusce_ut_facilisis_libero_lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_phasellus_finibus_diam_eget_lorem_tristique_eget_ultrices_nulla_malesuada_fusce_ullamcorper_lacus_id_justo_convallis_ut_vulputate_massa_hendrerit',
    kebab: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-in-vitae-urna-erat-fusce-ut-facilisis-libero-lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-phasellus-finibus-diam-eget-lorem-tristique-eget-ultrices-nulla-malesuada-fusce-ullamcorper-lacus-id-justo-convallis-ut-vulputate-massa-hendrerit',
    camel: 'loremIpsumDolorSitAmetConsecteturAdipiscingElitInVitaeUrnaEratFusceUtFacilisisLiberoLoremIpsumDolorSitAmetConsecteturAdipiscingElitPhasellusFinibusDiamEgetLoremTristiqueEgetUltricesNullaMalesuadaFusceUllamcorperLacusIdJustoConvallisUtVulputateMassaHendrerit',
  },
  {
    snake: 'lorem_ipsum_dolor',
    kebab: 'lorem-ipsum-dolor',
    camel: 'loremIpsumDolor',
  },
  {
    snake: 'lorem_ipsum_dolor',
    kebab: 'lorem-ipsum-dolor',
    camel: 'loremIpsumDolor',
  },
  {
    snake: 'lorem_ipsum_dolor',
    kebab: 'lorem-ipsum-dolor',
    camel: 'loremIpsumDolor',
  },
];

describe('ConverCase camelCase', () => {
  test('Should convert snake_case to camelCase', () => {
    data.map(d => expect(convertCase(d.snake, 'camelCase')).toEqual(d.camel));
  });
  test('Should convert kebab-case to camelCase', () => {
    data.map(d => expect(convertCase(d.kebab, 'camelCase')).toEqual(d.camel));
  });
  test('Should convert camelCase to camelCase', () => {
    data.map(d => expect(convertCase(d.camel, 'camelCase')).toEqual(d.camel));
  });
});

describe('ConverCase snake_case', () => {
  test('Should convert camelCase to camelCase', () => {
    data.map(d => expect(convertCase(d.camel, 'snake_case')).toEqual(d.snake));
  });
  test('Should convert kebab-case to camelCase', () => {
    data.map(d => expect(convertCase(d.kebab, 'snake_case')).toEqual(d.snake));
  });
  test('Should convert snake_case to snake_case', () => {
    data.map(d => expect(convertCase(d.snake, 'snake_case')).toEqual(d.snake));
  });
});

describe('ConverCase kebab-case', () => {
  test('Should convert camelCase to kebab-case', () => {
    data.map(d => expect(convertCase(d.camel, 'kebab-case')).toEqual(d.kebab));
  });
  test('Should convert kebab-case to kebab-case', () => {
    data.map(d => expect(convertCase(d.kebab, 'kebab-case')).toEqual(d.kebab));
  });
  test('Should convert snake_case to kebab-case', () => {
    data.map(d => expect(convertCase(d.snake, 'kebab-case')).toEqual(d.kebab));
  });
});
