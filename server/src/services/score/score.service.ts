import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RollWithScore } from 'src/dtos/roll-with-score.dto';
import { Repository } from 'typeorm';
import { Roll } from '../../models/roll';

@Injectable({ scope: Scope.REQUEST })
export class ScoreService {
  private rolls: Roll[];
  private scored: RollWithScore[] = [];
  private logger: Logger;

  constructor(
    @InjectRepository(Roll)
    private rollRepository: Repository<Roll>,
  ) {
    this.logger = new Logger(ScoreService.name);
  }

  async calculate(): Promise<RollWithScore[]> {
    this.rolls = await this.rollRepository.find();
    this.rolls.forEach((current, index) => {
      const calculatedRoll = this.calculateRoll(current, index);
      if (calculatedRoll) {
        this.scored.push(calculatedRoll);
      }
    });
    return this.scored;
  }

  private calculateRoll(roll: Roll, index: number): RollWithScore | null {
    this.logger.log(`calculating roll: ${JSON.stringify(roll)}`);
    if (roll.strike) {
      return this.calculateStrikeRoll(roll, index);
    }
    if (roll.spare) {
      return this.calculateSpareRoll(roll, index);
    }
    return this.calculateScore(roll, this.scored[index - 1]?.score ?? 0);
  }

  private calculateScore(
    roll: Roll,
    previousScore: number,
    bonus = 0,
  ): RollWithScore {
    return {
      ...roll,
      score: roll.knockedPins + previousScore + bonus,
    };
  }

  private calculateStrikeRoll(roll: Roll, index: number): RollWithScore {
    const next2 = this.rolls[index + 2];
    if (!next2) return null;

    const next = this.rolls[index + 1];
    return this.calculateScore(
      roll,
      this.scored[index - 1]?.score ?? 0,
      next.knockedPins + next2.knockedPins,
    );
  }

  private calculateSpareRoll(roll: Roll, index: number): RollWithScore | null {
    const next = this.rolls[index + 1];
    if (!next) return null;

    return this.calculateScore(
      roll,
      this.scored[index - 1]?.score ?? 0,
      next.knockedPins,
    );
  }
}