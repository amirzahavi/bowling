import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from '../src/app.controller';

describe('/roll (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const controller = await app.resolve<AppController>(AppController);
    await controller.reset();
  });

  afterEach(async () => {
    await app.close();
    1;
  });

  it('should return 400 with missing frame error', async () => {
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

  it('should return 400  with missing rollInFrame error', async () => {
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

  it('should return 400  with missing knockedPins errors', async () => {
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

  it('should return 409 error of duplicate roll', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 3 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 10 })
      .expect(409)
      .expect({
        statusCode: 409,
        message: ['duplicate roll'],
      });
  });

  it('should create roll', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 3 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 3,
            spare: false,
            strike: false,
            score: 3,
          },
        ]);
      });
  });

  it('should create roll and spare roll', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 3 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 2, knockedPins: 7 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 3,
            spare: false,
            strike: false,
            score: 3,
          },
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 2,
            knockedPins: 7,
            spare: true,
            strike: false,
            score: 10,
          },
        ]);
      });
  });

  it('should create roll and spare roll with score', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 3 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 2, knockedPins: 7 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 4, rollInFrame: 1, knockedPins: 6 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 3,
            spare: false,
            strike: false,
            score: 3,
          },
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 2,
            knockedPins: 7,
            spare: true,
            strike: false,
            score: 16,
          },
          {
            id: expect.any(Number),
            frame: 4,
            rollInFrame: 1,
            knockedPins: 6,
            spare: false,
            strike: false,
            score: 22,
          },
        ]);
      });
  });

  it('should create strike roll', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 10 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 10,
            spare: false,
            strike: true,
            score: 10,
          },
        ]);
      });
  });

  it('should create strike roll with score', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 10 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 4, rollInFrame: 1, knockedPins: 2 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 4, rollInFrame: 2, knockedPins: 4 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 10,
            spare: false,
            strike: true,
            score: 16,
          },
          {
            id: expect.any(Number),
            frame: 4,
            rollInFrame: 1,
            knockedPins: 2,
            spare: false,
            strike: false,
            score: 18,
          },
          {
            id: expect.any(Number),
            frame: 4,
            rollInFrame: 2,
            knockedPins: 4,
            spare: false,
            strike: false,
            score: 22,
          },
        ]);
      });
  });

  it('should create strike roll with spare', async () => {
    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 3, rollInFrame: 1, knockedPins: 10 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 4, rollInFrame: 1, knockedPins: 2 })
      .expect(201);

    await request(app.getHttpServer())
      .post('/roll')
      .send({ frame: 4, rollInFrame: 2, knockedPins: 8 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toStrictEqual([
          {
            id: expect.any(Number),
            frame: 3,
            rollInFrame: 1,
            knockedPins: 10,
            spare: false,
            strike: true,
            score: 20,
          },
          {
            id: expect.any(Number),
            frame: 4,
            rollInFrame: 1,
            knockedPins: 2,
            spare: false,
            strike: false,
            score: 22,
          },
          {
            id: expect.any(Number),
            frame: 4,
            rollInFrame: 2,
            knockedPins: 8,
            spare: true,
            strike: false,
            score: 30,
          },
        ]);
      });
  });
});
