import { APP_FILTER } from '@nestjs/core';
import { DuplicateRollExceptionFilter } from './filters/exception.filter';
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
      host: process.env.MYSQL_HOST || 'localhost',
      database: 'bowling',
      username: 'root',
      entities: [Roll],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Roll]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DuplicateRollExceptionFilter,
    },
    RulesService,
    ScoreService,
    RollsService,
  ],
})
export class AppModule {}
