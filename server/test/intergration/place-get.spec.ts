import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Get Place', () => {
  const seed = require('../seed/multiple-places');

  beforeEach(() => seed.run(nestApp));

  it('should succeed', async () => {
    const response = await supertest(nestApp.getHttpServer())
      .get(`/places/${seed.places[0].id}`)
      .expect(200);

    expect(response.body).toMatchSnapshot();
  });
});
