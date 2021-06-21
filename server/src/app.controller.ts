import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { KillDragonDto } from './dto/kill-dragon.dto';
import { HeroesGameService } from './services/heroes-game.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly gameService: HeroesGameService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/:id')
  killDragon(@Param('id') id: string, @Body() dragon: KillDragonDto) {
    return this.gameService.killDragon(id, dragon);
  }
}
