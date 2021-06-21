import { Injectable } from '@nestjs/common';
import { RollDto } from '../../roll.dto';
import { MAX_PINS, Roll } from '../../models/roll';

@Injectable()
export class RulesService {
  isStrike(roll: RollDto): boolean {
    return roll.rollInFrame === 1 && roll.knockedPins === MAX_PINS;
  }

  isSpare(previousRoll: Roll, currentRole: RollDto): boolean {
    return (
      previousRoll.frame === currentRole.frame &&
      previousRoll.knockedPins + currentRole.knockedPins === MAX_PINS
    );
  }

  // calculateScore()
}
