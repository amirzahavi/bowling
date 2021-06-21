import { RulesService } from './services/rules/rules.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roll } from './models/roll';
import { ScoreService } from './services/score/score.service';
import { RollsService } from './services/rolls/rolls.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      entities: [Roll],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [RulesService, ScoreService, RollsService],
})
export class AppModule {}
