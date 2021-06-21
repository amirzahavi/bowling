import { IsPositive, Max, Min } from 'class-validator';

export class RollDto {
  @IsPositive()
  frame: number;

  @IsPositive()
  rollInFrame: number;

  @Min(0)
  @Max(10)
  knockedPins: number;
}
