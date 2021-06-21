import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const MAX_PINS = 10;

@Entity()
export class Roll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  frame: number;

  @Column({ name: 'roll_in_frame' })
  rollInFrame: number;

  @Column({ name: 'knocked_pins' })
  knockedPins: number;

  @Column()
  strike: boolean;

  @Column()
  spare: boolean;
}
