import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { RollWithScoreDto } from './dtos/roll-with-score.dto';
import { RollDto } from './dtos/roll.dto';
import { RollsService } from './services/rolls/rolls.service';
import { ScoreService } from './services/score/score.service';

@Controller()
export class AppController {
  constructor(
    private readonly rollService: RollsService,
    private readonly scoreService: ScoreService,
  ) {}

  @Post('/roll')
  async addRoll(@Body() roll: RollDto): Promise<RollWithScoreDto[]> {
    await this.rollService.addRoll(roll);
    return this.scoreService.calculate();
  }

  @Delete()
  reset(): Promise<DeleteResult> {
    return this.rollService.reset();
  }
}
