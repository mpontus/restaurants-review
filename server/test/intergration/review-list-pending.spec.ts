import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('List pending reviews', () => {
  describe('when user is owner', () => {
    const authSeed = require('../seed/owner-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/reviews/pending`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when limit is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?take=1`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?skip=1`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?take=foo`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?take=-1`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is too large', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?take=9000`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?skip=foo`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/reviews/pending?skip=-1`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is not an owner', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/reviews/pending`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
