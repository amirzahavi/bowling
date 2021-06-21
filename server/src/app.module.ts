import { RulesService } from './services/rules/rules.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [RulesService, AppService],
})
export class AppModule {}
