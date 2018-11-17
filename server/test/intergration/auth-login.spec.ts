import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Login', () => {
  const seed = require('../seed/regular-user');

  beforeEach(() => seed.run(nestApp));

  describe('when credentials are correct', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/login`)
        .send({
          email: seed.email,
          password: seed.password,
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

  describe('when password is invalid', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/login`)
        .send({
          email: seed.email,
          password: 'ngbA1CVl!H',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when email is invalid', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/login`)
        .send({
          email: 'na@oku.tr',
          password: seed.password,
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
