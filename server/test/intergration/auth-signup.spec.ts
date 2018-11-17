import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Signup', () => {
  describe('when details are valid', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: 'polo@peswop.dm',
          password: 'ngbA1CVl!H',
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

  describe('when name is empty', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: '',
          email: 'polo@peswop.dm',
          password: 'ngbA1CVl!H',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when email is empty', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: '',
          password: 'ngbA1CVl!H',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when email is invalid', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: '123456',
          password: 'ngbA1CVl!H',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when password is empty', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: 'polo@peswop.dm',
          password: '',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when password is too short', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: 'polo@peswop.dm',
          password: '123',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user with this email already exists', () => {
    const seed = require('../seed/regular-user');

    beforeEach(() => seed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/auth/signup`)
        .send({
          name: 'Lawrence Ford',
          email: seed.email,
          password: 'ngbA1CVl!H',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
