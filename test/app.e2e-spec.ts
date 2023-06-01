import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  let refreshToken = '';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('user authorization ', () => {
    it('should register new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@gmail.com', password: '123456test' })
        .expect(201);
      expect(response.body).toMatchObject({
        email: 'test@gmail.com',
        role: 'admin',
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });

      expect(response.body).not.toHaveProperty('password');
      // expect(response.body).toHaveProperty('accessToken');
    });

    it('should throw error email already exist', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@gmail.com', password: '123456test' })
        .expect(403);
    });

    it('should login user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@gmail.com', password: '123456test' })
        .expect(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;
    });

    it('should throw error user not found', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'testFake@gmail.com', password: '123456test' })
        .expect(403);
    });

    it('should send new pair of tokens', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/refreshTokens')
        .query({ refreshToken })
        .expect(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should logout current user', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/logout')
        .query({ accessToken })
        .expect(200);
      expect(response.body).toHaveProperty('message');
    });
  });
});
