import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    1;
  });

  it('/roll - with missing frame error', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ rollInFrame: 1, knockedPins: 10 })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['frame must be a positive number'],
        error: 'Bad Request',
      });
  });

  it('/roll - with missing rollInFrame error', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 1, knockedPins: 10 })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['rollInFrame must be a positive number'],
        error: 'Bad Request',
      });
  });

  it('/roll - with missing knockedPins error', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 1, rollInFrame: 2 })
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'knockedPins must not be greater than 10',
          'knockedPins must not be less than 0',
        ],
        error: 'Bad Request',
      });
  });

  it('/roll - with error of duplicate roll', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 3 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 10 })
      .expect(409);
  });
});
