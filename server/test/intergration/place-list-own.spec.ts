import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('List Own Places', () => {
  const seed = require('../seed/multiple-places');

  beforeEach(() => seed.run(nestApp));

  describe('when user is an owner', () => {
    const authSeed = require('../seed/owner-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places/own`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user is not an owner', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .get(`/places/own`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
