import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Replying to review', () => {
  const authSeed = require('../seed/owner-user');

  beforeEach(() => authSeed.run(nestApp));

  describe('when user is place owner', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .put(`/reviews/${authSeed.reviews[0].id}/reply`)
        .send({
          comment: 'Or candidate trouble listen ok.',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when review does not exist', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .put(`/reviews/foo/reply`)
          .send({
            comment: 'Or candidate trouble listen ok.',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(404);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when comment is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .put(`/reviews/${authSeed.reviews[0].id}/reply`)
          .send({
            comment: '',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is not place owner', () => {
    const seed = require('../seed/multiple-reviews');

    beforeEach(() => seed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .put(`/reviews/${seed.reviews[0].id}/reply`)
        .send({
          comment: 'Or candidate trouble listen ok.',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
