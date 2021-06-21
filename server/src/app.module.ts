import { RulesService } from './services/rules/rules.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roll } from './models/roll';
import { ScoreService } from './services/score/score.service';

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
  providers: [RulesService, AppService, ScoreService],
})
export class AppModule {}
