import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('List Places', () => {
  const seed = require('../seed/multiple-places');

  beforeEach(() => seed.run(nestApp));

  describe('without any criteria', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when rating is provided', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?rating=3`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when limit is provided', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?take=2`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when offset is provided', () => {
    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?skip=3`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when limit is not a number', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?take=foo`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when limit is negative', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?take=-1`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when limit is too large', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?take=9000`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when offset is not a number', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?skip=foo`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when offset is negative', () => {
    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places?skip=-1`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
