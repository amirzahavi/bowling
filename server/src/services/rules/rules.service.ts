import { Injectable } from '@nestjs/common';
import { RollDto } from '../../dtos/roll.dto';
import { MAX_PINS, Roll } from '../../models/roll';

@Injectable()
export class RulesService {
  isStrike(roll: RollDto): boolean {
    return roll.rollInFrame === 1 && roll.knockedPins === MAX_PINS;
  }

  isSpare(previousRoll: Roll | undefined, currentRoll: RollDto): boolean {
    if (!previousRoll) return false;
    if (
      currentRoll.frame === 10 &&
      (previousRoll.strike || currentRoll.rollInFrame > 2)
    )
      return false;

    return (
      previousRoll.frame === currentRoll.frame &&
      previousRoll.knockedPins + currentRoll.knockedPins === MAX_PINS
    );
  }
}
