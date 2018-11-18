import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Create review', () => {
  const seed = require('../seed/multiple-places');

  beforeEach(() => seed.run(nestApp));

  describe('when user is authenticated', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/places/${seed.places[0].id}/reviews`)
        .send({
          rating: 4,
          dateVisitted: '1985-06-05',
          comment: 'Have heart cover analysis carry.',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(201);

      expect(response.body).toMatchSnapshot();
    });

    describe('when rating less than 1', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 0,
            dateVisitted: '1985-06-05',
            comment: 'Have heart cover analysis carry.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '',
            comment: 'Have heart cover analysis carry.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is in the future', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '2044-07-14',
            comment: 'Have heart cover analysis carry.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is too far in the past', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '1044-07-14',
            comment: 'Have heart cover analysis carry.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is invalid', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '4444-44-44',
            comment: 'Have heart cover analysis carry.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when comment is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '1985-06-05',
            comment: '',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when comment is too long', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places/${seed.places[0].id}/reviews`)
          .send({
            rating: 4,
            dateVisitted: '1985-06-05',
            comment: 'x'.repeat(9000),
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is unauthenticated', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/places/${seed.places[0].id}/reviews`)
        .send({
          rating: 4,
          dateVisitted: '1985-06-05',
          comment: 'Have heart cover analysis carry.',
        })
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
