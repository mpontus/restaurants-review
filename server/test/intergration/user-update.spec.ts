import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Update User', () => {
  const seed = require('../seed/multiple-users');

  beforeEach(() => seed.run(nestApp));

  describe('when user is admin', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/users/${seed.users[0].id}`)
        .send({
          name: 'Theodore Roberson',
          email: 'milabgog@iz.ro',
          password: '#(i9Z3OyGW',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });

    describe('when name is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/users/${seed.users[0].id}`)
          .send({
            name: '',
            email: 'milabgog@iz.ro',
            password: '#(i9Z3OyGW',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when email is invalid', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/users/${seed.users[0].id}`)
          .send({
            name: 'Theodore Roberson',
            email: 'foobar',
            password: '#(i9Z3OyGW',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when password is too short', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/users/${seed.users[0].id}`)
          .send({
            name: 'Theodore Roberson',
            email: 'milabgog@iz.ro',
            password: 'foo',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when email is already taken', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/users/${seed.users[0].id}`)
          .send({
            name: 'Theodore Roberson',
            email: seed.users[1].email,
            password: '#(i9Z3OyGW',
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
        .patch(`/users/${seed.users[0].id}`)
        .send({
          name: 'Theodore Roberson',
          email: 'milabgog@iz.ro',
          password: '#(i9Z3OyGW',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
