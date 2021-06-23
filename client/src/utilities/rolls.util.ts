import type { FrameData } from "src/components/Frame";
import { MAX_FRAMES } from "../components/FramesPanel";

export interface RollData {
  frame: number;
  rollInFrame: number;
  knockedPins: number;
  strike: boolean;
  spare: boolean;
  score?: number;
}

export function aggregateRolls(rolls: RollData[]): FrameData[] {
  return rolls.reduce((frames, roll) => {
    let frame = frames.find(f => f.number === roll.frame);
    if (!frame) {
      frame = {number: roll.frame, rolls: []};
      frames.push(frame);
    }
    frame.rolls?.push(roll.knockedPins);
    frame.score = roll.score;
    frame.spare = roll.spare;
    frame.strike = roll.strike;

    return frames;
  }, [] as FrameData[]);
}

export function nextFrame(currentFrame: number, currentRoll: number, knockedPins: number): number {
  if (currentFrame === MAX_FRAMES) return MAX_FRAMES;
  if (knockedPins === 10) return currentFrame + 1;
  return (currentRoll > 1) ? (currentFrame + 1) : currentFrame;
}

export function nextRoll(currentFrame: number, currentRoll: number, knockedPins: number): number {
  if (currentFrame === MAX_FRAMES) return currentRoll + 1;
  if (knockedPins === 10) return 1;
  return currentRoll === 1 ? currentRoll + 1 : 1;
}