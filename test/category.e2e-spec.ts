import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category Controller (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  let categoryId = '';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  describe('categories', () => {
    it('should register new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test2Fake@gmail.com', password: '123456test' })
        .expect(201);
      expect(response.body).toMatchObject({
        email: 'test2Fake@gmail.com',
        role: 'admin',
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });

      accessToken = response.body.accessToken;
    });

    it('should get zero categories', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .expect(404);

      expect(response.body).toMatchObject({
        message: 'Categories have not been created',
      });
    });

    it('should create new category', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .query({ accessToken })
        .send({ title: 'iPhone', description: 'test description' })
        .expect(201);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        title: 'iPhone',
        description: 'test description',
      });
      categoryId = response.body.id;
    });
  });

  it('should update category', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/category/${categoryId}`)
      .query({ accessToken })
      .send({ title: 'iPhone update', description: 'test description update' })
      .expect(200);
    expect(response.body).toMatchObject({
      id: categoryId,
      title: 'iPhone update',
      description: 'test description update',
    });
  });

  it('should get one category', async () => {
    const response = await request(app.getHttpServer())
      .get('/category')
      .expect(200);

    expect(response.body).toHaveLength(1);
  });
});
