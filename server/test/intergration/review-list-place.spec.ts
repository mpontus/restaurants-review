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

    describe('when limit is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?take=2`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?skip=3`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?take=foo`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?take=-1`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is too large', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?take=9000`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is not a number', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?skip=foo`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is negative', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .get(`/places/${seed.place.id}/reviews?skip=-1`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
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
