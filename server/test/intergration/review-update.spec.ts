import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Update review', () => {
  const seed = require('../seed/multiple-reviews');

  beforeEach(() => seed.run(nestApp));

  describe('when user is an admin', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should update rating', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/reviews/${seed.reviews[0].id}`)
        .send({
          rating: 2,
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    it('should update visit date', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/reviews/${seed.reviews[0].id}`)
        .send({
          dateVisitted: '1986-01-24',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    it('should update comment', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/reviews/${seed.reviews[0].id}`)
        .send({
          comment: 'Serious inside else memory if six.',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    it('should update reply', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/reviews/${seed.reviews[0].id}`)
        .send({
          reply: 'Serious inside else memory if six.',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when rating less than 1', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            rating: 0,
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            dateVisitted: '',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is in the future', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            dateVisitted: '2044-07-14',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is too far in the past', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            dateVisitted: '1044-07-14',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when visit date is invalid', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            dateVisitted: '4444-44-44',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when comment is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
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
          .patch(`/reviews/${seed.reviews[0].id}`)
          .send({
            comment: 'x'.repeat(9000),
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is not an admin', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/reviews/${seed.reviews[0].id}`)
        .send({
          comment: 'Have heart cover analysis carry.',
        })
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
