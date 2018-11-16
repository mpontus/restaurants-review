import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(resetDb);

describe('session refresh', () => {
  describe('when refresh token is valid', () => {
    const seed = require('../seed/regular-user');

    beforeEach(() => seed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/refresh`)
        .send({
          token: seed.refreshToken,
        })
        .expect(201);

      expect(response.body).toMatchSnapshot({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        user: expect.any(Object),
      });

      expect(response.body.user).toMatchSnapshot({
        id: expect.any(String),
      });
    });
  });

  describe('when refresh token is invalid', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/refresh`)
        .send({
          token: 'kvg4#MXl)(',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
