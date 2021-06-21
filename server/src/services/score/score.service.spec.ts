import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roll } from '../../models/roll';
import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;
  const rollRepoStub = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoreService,
        { provide: getRepositoryToken(Roll), useValue: rollRepoStub },
      ],
    }).compile();

    service = await module.resolve<ScoreService>(ScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate first roll', async () => {
    const roll = new Roll();
    roll.knockedPins = 6;
    rollRepoStub.find.mockResolvedValue([roll]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 6,
        score: 6,
      },
    ]);
  });

  it('should calculate based on previous roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 6;
    const roll2 = new Roll();
    roll2.knockedPins = 3;

    rollRepoStub.find.mockResolvedValue([roll1, roll2]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 6,
        score: 6,
      },
      {
        knockedPins: 3,
        score: 9,
      },
    ]);
  });

  it('should calculate based on spare roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 6;
    const roll2 = new Roll();
    roll2.knockedPins = 4;
    roll2.spare = true;
    const roll3 = new Roll();
    roll3.knockedPins = 5;

    rollRepoStub.find.mockResolvedValue([roll1, roll2, roll3]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 6,
        score: 6,
      },
      {
        knockedPins: 4,
        score: 15,
        spare: true,
      },
      {
        knockedPins: 5,
        score: 20,
      },
    ]);
  });

  it('should skip calculation based on spare roll without next roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 6;
    const roll2 = new Roll();
    roll2.knockedPins = 4;
    roll2.spare = true;

    rollRepoStub.find.mockResolvedValue([roll1, roll2]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 6,
        score: 6,
      },
      {
        knockedPins: 4,
        spare: true,
      },
    ]);
  });

  it('should calculate based on strike roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 10;
    roll1.strike = true;
    const roll2 = new Roll();
    roll2.knockedPins = 4;
    const roll3 = new Roll();
    roll3.knockedPins = 5;

    rollRepoStub.find.mockResolvedValue([roll1, roll2, roll3]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 10,
        score: 19,
        strike: true,
      },
      {
        knockedPins: 4,
        score: 23,
      },
      {
        knockedPins: 5,
        score: 28,
      },
    ]);
  });

  it('should calculate based on strike roll with previous roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 6;
    const roll2 = new Roll();
    roll2.strike = true;
    roll2.knockedPins = 10;
    const roll3 = new Roll();
    roll3.knockedPins = 5;
    const roll4 = new Roll();
    roll4.knockedPins = 4;

    rollRepoStub.find.mockResolvedValue([roll1, roll2, roll3, roll4]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 6,
        score: 6,
      },
      {
        knockedPins: 10,
        score: 25,
        strike: true,
      },
      {
        knockedPins: 5,
        score: 30,
      },
      {
        knockedPins: 4,
        score: 34,
      },
    ]);
  });

  it('should skip calculation based on strike roll, with only one forward roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 10;
    roll1.strike = true;
    const roll2 = new Roll();
    roll2.knockedPins = 4;

    rollRepoStub.find.mockResolvedValue([roll1, roll2]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 10,
        strike: true,
      },
    ]);
  });

  it('should skip calculation based on strike roll, with no forward roll', async () => {
    const roll1 = new Roll();
    roll1.knockedPins = 10;
    roll1.strike = true;

    rollRepoStub.find.mockResolvedValue([roll1]);

    const result = await service.calculate();

    expect(result).toStrictEqual([
      {
        knockedPins: 10,
        strike: true,
      },
    ]);
  });
});
