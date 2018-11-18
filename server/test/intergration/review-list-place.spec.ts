import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('List place reviews', () => {
  describe('when place exists', () => {
    const seed = require('../seed/multiple-reviews');

    beforeEach(() => seed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places/${seed.place.id}/reviews`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when place does not exist', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places/25bd64b1-c768-5fa1-b4f5-3bacc700f3b9/reviews`)
        .expect(404);

      expect(response.body).toMatchSnapshot();
    });
  });
});
