import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roll } from '../../models/roll';
import { RollDto } from '../../dtos/roll.dto';
import { RollsService } from './rolls.service';
import { RulesService } from '../rules/rules.service';

describe('RollsService', () => {
  let service: RollsService;
  const deleteExcSpy = jest.fn();
  const rollRepoStub = {
    find: jest.fn(),
    insert: jest.fn(),
    createQueryBuilder: () => ({
      delete: () => ({
        execute: deleteExcSpy,
      }),
    }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RollsService,
        { provide: getRepositoryToken(Roll), useValue: rollRepoStub },
        RulesService,
      ],
    }).compile();

    service = module.get<RollsService>(RollsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reset', async () => {
    await service.reset();

    expect(deleteExcSpy).toBeCalledTimes(1);
  });

  it('should not be a spare on first frame and first roll', async () => {
    const roll = new RollDto();
    roll.frame = 1;
    roll.rollInFrame = 1;
    roll.knockedPins = 6;

    rollRepoStub.find.mockResolvedValue([]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 1,
      rollInFrame: 1,
      knockedPins: 6,
      spare: false,
      strike: false,
    });
  });

  it('should be strike on first frame, when knocked pins is 10', async () => {
    const roll = new RollDto();
    roll.frame = 1;
    roll.rollInFrame = 1;
    roll.knockedPins = 10;

    rollRepoStub.find.mockResolvedValue([]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 1,
      rollInFrame: 1,
      knockedPins: 10,
      spare: false,
      strike: true,
    });
  });

  it('should be spare on first frame, when knocked pins is total 10 with previous roll', async () => {
    const roll = new RollDto();
    roll.frame = 1;
    roll.rollInFrame = 2;
    roll.knockedPins = 7;

    rollRepoStub.find.mockResolvedValue([{ frame: 1, knockedPins: 3 }]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 1,
      rollInFrame: 2,
      knockedPins: 7,
      spare: true,
      strike: false,
    });
  });

  it('should NOT be spare on 10th frame, when rollInFrame is 2 and previous is strike', async () => {
    const roll = new RollDto();
    roll.frame = 10;
    roll.rollInFrame = 2;
    roll.knockedPins = 0;

    rollRepoStub.find.mockResolvedValue([
      { frame: 10, knockedPins: 10, rollInFrame: 1, strike: true },
    ]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 10,
      rollInFrame: 2,
      knockedPins: 0,
      spare: false,
      strike: false,
    });
  });

  it('should NOT be strike on 10th frame, when rollInFrame is 2', async () => {
    const roll = new RollDto();
    roll.frame = 10;
    roll.rollInFrame = 2;
    roll.knockedPins = 10;

    rollRepoStub.find.mockResolvedValue([
      { frame: 10, knockedPins: 10, rollInFrame: 1, strike: true },
    ]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 10,
      rollInFrame: 2,
      knockedPins: 10,
      spare: false,
      strike: false,
    });
  });

  it('should NOT be spare on 10th frame, when rollInFrame is 3 and first rollInFrame is strike', async () => {
    const roll = new RollDto();
    roll.frame = 10;
    roll.rollInFrame = 3;
    roll.knockedPins = 1;

    rollRepoStub.find.mockResolvedValue([
      { frame: 10, knockedPins: 9, rollInFrame: 2, strike: false },
    ]);

    await service.addRoll(roll);

    expect(rollRepoStub.insert).toBeCalledWith({
      frame: 10,
      rollInFrame: 3,
      knockedPins: 1,
      spare: false,
      strike: false,
    });
  });
});
