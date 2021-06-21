import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RollDto } from '../../dtos/roll.dto';
import { Roll } from '../../models/roll';
import { RulesService } from '../rules/rules.service';

@Injectable()
export class RollsService {
  constructor(
    @InjectRepository(Roll)
    private readonly rollRepository: Repository<Roll>,
    private readonly rulesService: RulesService,
  ) {}

  async addRoll(newRoll: RollDto): Promise<void> {
    const lastRoll = await this.getLastRoll();
    const roll: Omit<Roll, 'id'> = {
      ...newRoll,
      spare: this.rulesService.isSpare(lastRoll, newRoll),
      strike: this.rulesService.isStrike(newRoll),
    };
    await this.rollRepository.insert(roll);
  }

  private async getLastRoll(): Promise<Roll> {
    const foundRolls = await this.rollRepository.find({
      order: { id: 'DESC' },
      take: 1,
    });
    return foundRolls.shift();
  }
}
