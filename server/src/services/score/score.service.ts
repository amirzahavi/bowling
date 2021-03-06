import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RollWithScoreDto } from 'src/dtos/roll-with-score.dto';
import { Repository } from 'typeorm';
import { Roll } from '../../models/roll';

@Injectable({ scope: Scope.REQUEST })
export class ScoreService {
  private rolls: Roll[];
  private scored: RollWithScoreDto[] = [];
  private logger: Logger;

  constructor(
    @InjectRepository(Roll)
    private rollRepository: Repository<Roll>,
  ) {
    this.logger = new Logger(ScoreService.name);
  }

  async calculate(): Promise<RollWithScoreDto[]> {
    this.rolls = await this.rollRepository.find();
    for (let i = 0; i < this.rolls.length; i++) {
      const calculatedRoll = this.calculateRoll(this.rolls[i], i);
      this.scored.push(calculatedRoll);
    }
    return this.scored;
  }

  private calculateRoll(roll: Roll, index: number): RollWithScoreDto {
    this.logger.log(`calculating roll: ${JSON.stringify(roll)}`);
    if (roll.strike) {
      return this.calculateRollPlusTwo(roll, index);
    }
    if (roll.spare) {
      return this.calculateRollPlusOne(roll, index);
    }
    return this.calculateScore(roll, index);
  }

  private calculateScore(
    roll: Roll,
    index: number,
    bonus = 0,
  ): RollWithScoreDto {
    const previousScore = this.scored[index - 1]?.score ?? 0;
    return {
      ...roll,
      score: roll.knockedPins + previousScore + bonus,
    };
  }

  private calculateRollPlusTwo(roll: Roll, index: number): RollWithScoreDto {
    const next2 = this.rolls[index + 2];
    if (!next2) return this.calculateRollPlusOne(roll, index);

    const next = this.rolls[index + 1];
    return this.calculateScore(
      roll,
      index,
      next.knockedPins + next2.knockedPins,
    );
  }

  private calculateRollPlusOne(
    roll: Roll,
    index: number,
  ): RollWithScoreDto | null {
    const next = this.rolls[index + 1];
    return this.calculateScore(roll, index, next?.knockedPins ?? 0);
  }
}
