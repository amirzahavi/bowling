import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { postRoll, resetGame } from "../utilities/api.util";
import type { FrameData } from "../components/Frame";
import { aggregateRolls, isLastRoll, nextFrame, nextRoll } from "../utilities/rolls.util";

export interface PinsState {
  knockedPins: number;
}

export function useFrames(pins: PinsState | null) {
  const alert = useAlert();
  const [lastFrame, setLastFrame] = useState(false);
  const [error, setError] = useState('');
  const [frames, setFrames] = useState<FrameData[]>([]);
  const [currentRoll, setCurrentRoll] = useState({
    frame: 1,
    rollInFrame: 1
  });

  useEffect(() => {
    if (pins !== null) {
      alert.info('processing', {timeout: 2000});
      postRoll({...currentRoll, knockedPins: pins.knockedPins})      
      .then(result => {
        if ('message' in result) {
          setError(result.message);
        } else {
          const frames = aggregateRolls(result);          
          setFrames(frames);
          
          if (isLastRoll(result)) {
            setLastFrame(true);
            alert.success('Congratulations! You finished the game', {
              onClose: () => {
                resetGame().then(() => {                  
                  setFrames([]);
                  setLastFrame(false);                  
                }).catch(error => alert.error(error.message))
              }
            });
          } else {
            setCurrentRoll({
              frame: nextFrame(currentRoll.frame, currentRoll.rollInFrame, pins.knockedPins),
              rollInFrame: nextRoll(currentRoll.frame, currentRoll.rollInFrame, pins.knockedPins)
            });
          }
        }
      })
      .catch(error => setError(error.message));
    }
  }, [pins]);

  return {lastFrame, frames, error};
}