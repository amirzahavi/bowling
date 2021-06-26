import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RollDto } from './dtos/roll.dto';
import { RollsService } from './services/rolls/rolls.service';
import { ScoreService } from './services/score/score.service';

describe('AppController', () => {
  let appController: AppController;
  const rollServiceSpy = { addRoll: jest.fn(), reset: jest.fn() };
  const scoreServiceSpy = { calculate: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: RollsService, useValue: rollServiceSpy },
        { provide: ScoreService, useValue: scoreServiceSpy },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/roll', () => {
    it('should add roll', async () => {
      const roll = new RollDto();
      await appController.addRoll(roll);
      expect(rollServiceSpy.addRoll).toBeCalledWith(roll);
    });

    it('should calculate score', async () => {
      const roll = new RollDto();
      await appController.addRoll(roll);
      expect(scoreServiceSpy.calculate).toBeCalled();
    });
  });

  describe('/ (DELETE)', () => {
    it('should call reset on service', async () => {
      await appController.reset();
      expect(rollServiceSpy.reset).toBeCalled();
    });
  });
});
