import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Update place', () => {
  const seed = require('../seed/multiple-places');

  beforeEach(() => seed.run(nestApp));

  describe('when user is admin', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/places/${seed.places[0].id}`)
        .send({
          address: '069 Murphy Union',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user is owner', () => {
    const authSeed = require('../seed/owner-user');

    beforeEach(() => authSeed.run(nestApp));

    describe('when place belongs to the user', () => {
      it('should succeed', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/places/${authSeed.place.id}`)
          .send({
            address: '069 Murphy Union',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when place does not belong to the user', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .patch(`/places/${seed.places[0].id}`)
          .send({
            address: '069 Murphy Union',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(403);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when title is empty', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/places/${seed.places[0].id}`)
        .send({
          title: '',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when address is empty', () => {
    const authSeed = require('../seed/admin-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should fail', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .patch(`/places/${seed.places[0].id}`)
        .send({
          address: '',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
