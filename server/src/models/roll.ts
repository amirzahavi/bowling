export const MAX_PINS = 10;

export class Roll {
  id: number;
  frame: number;
  rollInFrame: number;
  knockedPins: number;
  strike: boolean;
  spare: boolean;
}
