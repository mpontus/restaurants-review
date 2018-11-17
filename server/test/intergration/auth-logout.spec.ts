import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Logout', () => {
  const seed = require('../seed/regular-user');

  beforeEach(() => seed.run(nestApp));

  describe('when user is authenticated', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/logout`)
        .send({
          email: seed.email,
          password: seed.password,
        })
        .set('Authorization', `Bearer ${seed.accessToken}`)
        .expect(204);

      expect(response.body).toMatchSnapshot();
    });
  });
});
