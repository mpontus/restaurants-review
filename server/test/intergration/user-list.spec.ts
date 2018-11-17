import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('List Users', () => {
  const seed = require('../seed/multiple-users');

  beforeEach(() => seed.run(nestApp));

  describe('when user is admin', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/users`)
        .set('Authorization', `Bearer ${seed.authSeed}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when limit is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?take=2`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?skip=3`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?take=foo`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?take=-1`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is too large', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?take=9000`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?skip=foo`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/users?skip=-1`)
          .set('Authorization', `Bearer ${seed.authSeed}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe.skip('when user is not an admin', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/users?skip=9000`)
        .set('Authorization', `Bearer ${seed.authSeed}`)
        .expect(401);

      expect(response.body).toMatchSnapshot();
    });
  });
});
