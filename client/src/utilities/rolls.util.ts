import type { FrameData } from "src/components/Frame";
import { MAX_FRAMES } from "../components/FramesPanel";
import type { RollResponse } from "./api.util";

export function aggregateRolls(rolls: RollResponse[]): FrameData[] {
  return rolls.reduce((frames, roll) => {
    let frame = frames.find(f => f.number === roll.frame);
    if (!frame) {
      frame = {number: roll.frame, rolls: [], score: null};
      frames.push(frame);
    }
    frame.rolls?.push(roll.knockedPins);
    frame.score = roll.score;
    frame.spare = frame.spare ? frame.spare : roll.spare;
    frame.strike = frame.strike ? frame.strike : roll.strike;

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

export function isLastRoll(rolls: RollResponse[]): boolean {
  const lastFrame = rolls.filter(roll => roll.frame === MAX_FRAMES);
  if (!lastFrame.length || lastFrame.length === 1) return false;  
  if (lastFrame.length > 2) return true;

  return !lastFrame[0].strike && !lastFrame[1].spare;
}