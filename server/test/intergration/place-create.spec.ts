import supertest from 'supertest';
import { initApp } from '../utils/init-app';
import { resetDb } from '../utils/reset-db';

let nestApp: any;

beforeAll(async () => {
  nestApp = await initApp();
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb(nestApp));

describe('Create place', () => {
  describe('when user is owner', () => {
    const authSeed = require('../seed/owner-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/places`)
        .send({
          title: 'Armstrong, Jacobs and Murray',
          address: '907 Wolff Mountain',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(201);

      expect(response.body).toMatchSnapshot({
        id: expect.any(String),
      });
    });

    describe('when title is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places`)
          .send({
            title: '',
            address: '907 Wolff Mountain',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when address is empty', () => {
      it('should fail', async () => {
        const response = await supertest(nestApp.getHttpServer())
          .post(`/places`)
          .send({
            title: 'Armstrong, Jacobs and Murray',
            address: '',
          })
          .set('Authorization', `Bearer ${authSeed.accessToken}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when user is not owner', () => {
    const authSeed = require('../seed/regular-user');

    beforeEach(() => authSeed.run(nestApp));

    it('should succeed', async () => {
      const response = await supertest(nestApp.getHttpServer())
        .post(`/places`)
        .send({
          title: 'Armstrong, Jacobs and Murray',
          address: '907 Wolff Mountain',
        })
        .set('Authorization', `Bearer ${authSeed.accessToken}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
