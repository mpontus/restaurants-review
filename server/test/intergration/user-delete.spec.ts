import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Delete user', () => {
  const seed = require('../seed/multiple-users');

  beforeEach(() => seed.run(nestApp));

  describe('when user is an admin', async () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .delete(`/users/${seed.users[0].id}`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when user does not exist', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .delete(`/users/foo`)
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(404);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is not an admin', async () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .delete(`/users/${seed.users[0].id}`)
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
