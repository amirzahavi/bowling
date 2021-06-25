import { useEffect, useState } from "react";
import { postRoll } from "../utilities/api.util";
import type { FrameData } from "../components/Frame";
import { aggregateRolls, isLastRoll, nextFrame, nextRoll } from "../utilities/rolls.util";

export interface PinsState {
  knockedPins: number;
}

export interface CurrentRollState {
  frame: number;
  rollInFrame: number;
}

export interface FramesState {
  processing: boolean;
  isLastRoll: boolean;
  frames: FrameData[];
  currentRoll: CurrentRollState;
  error?: string;  
}

const INITIAL_STATE: FramesState = {
  currentRoll: {frame: 1, rollInFrame: 1},
  frames: [],
  isLastRoll: false,
  processing: false,
  error: undefined
}

export function useFrames(pins: PinsState | null) {
  const [state, setState] = useState<FramesState>(INITIAL_STATE);

  function reset() {
    setState(INITIAL_STATE);
  }

  useEffect(() => {
    if (pins !== null) {
      setState({...state, processing: true});
      postRoll({...state.currentRoll, knockedPins: pins.knockedPins})      
      .then(result => {
        if ('message' in result) {
          setState({...state, error: result.message, processing: false});
        } else {
          const frames = aggregateRolls(result);
            setState({
              ...state, 
              frames, 
              isLastRoll: isLastRoll(result),
              processing: false,
              currentRoll: {
                frame: nextFrame(state.currentRoll.frame, state.currentRoll.rollInFrame, pins.knockedPins),
                rollInFrame: nextRoll(state.currentRoll.frame, state.currentRoll.rollInFrame, pins.knockedPins)
            }})
        }
      })
      .catch(error => setState({...state, error: error.message, processing: false}));
    }
  }, [pins]);

  return {...state, reset};
}