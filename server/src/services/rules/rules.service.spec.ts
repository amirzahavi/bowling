import { Test, TestingModule } from '@nestjs/testing';
import { RollDto } from '../../roll.dto';
import { MAX_PINS, Roll } from '../../models/roll';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  let rulesService: RulesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [RulesService],
    }).compile();

    rulesService = app.get<RulesService>(RulesService);
  });

  describe('isStrike', () => {
    it('should detect strike, when first roll and score max pins', () => {
      const roll = new RollDto();
      roll.rollInFrame = 1;
      roll.knockedPins = MAX_PINS;

      expect(rulesService.isStrike(roll)).toBeTruthy();
    });

    it('should NOT detect strike, when first roll and NOT score max pins', () => {
      const roll = new RollDto();
      roll.rollInFrame = 1;
      roll.knockedPins = MAX_PINS - 1;

      expect(rulesService.isStrike(roll)).toBeFalsy();
    });

    it('should NOT detect strike, when second roll and score max pins', () => {
      const roll = new RollDto();
      roll.rollInFrame = 2;
      roll.knockedPins = MAX_PINS;

      expect(rulesService.isStrike(roll)).toBeFalsy();
    });
  });

  describe('isSpare', () => {
    it('should detect spare, when previous and current pins sum to max pins and both in the same frame', () => {
      const previousRoll = new Roll();
      previousRoll.frame = 8;
      previousRoll.rollInFrame = 1;
      previousRoll.knockedPins = 6;

      const roll = new RollDto();
      roll.frame = 8;
      roll.rollInFrame = 2;
      roll.knockedPins = MAX_PINS - previousRoll.knockedPins;

      expect(rulesService.isSpare(previousRoll, roll)).toBeTruthy();
    });

    it('should NOT detect spare, when previous and current pins sum to max pins and both NOT in the same frame', () => {
      const previousRoll = new Roll();
      previousRoll.frame = 8;
      previousRoll.rollInFrame = 1;
      previousRoll.knockedPins = 6;

      const roll = new RollDto();
      roll.frame = 9;
      roll.rollInFrame = 2;
      roll.knockedPins = MAX_PINS - previousRoll.knockedPins;

      expect(rulesService.isSpare(previousRoll, roll)).toBeFalsy();
    });

    it("should NOT detect spare, when previous and current pins  DON'T sum to max pins and both in the same frame", () => {
      const previousRoll = new Roll();
      previousRoll.frame = 8;
      previousRoll.rollInFrame = 1;
      previousRoll.knockedPins = 6;

      const roll = new RollDto();
      roll.frame = 8;
      roll.rollInFrame = 2;
      roll.knockedPins = MAX_PINS - previousRoll.knockedPins - 1;

      expect(rulesService.isSpare(previousRoll, roll)).toBeFalsy();
    });
  });
});
