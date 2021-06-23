import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
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
      fetch('http://localhost:3000/roll', {        
        method: 'POST',
        headers: {          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...currentRoll, knockedPins: pins.knockedPins})        
      })      
      .then(result => result.json())      
      .then(result => {
        if (result.statusCode && result.message) {
          setError(result.message);
        } else {
          const frames = aggregateRolls(result);          
          setFrames(frames);
          
          if (isLastRoll(result)) {
            setLastFrame(true);
            alert.success('Congratulations! You finished the game', {
              onClose: () => {
                fetch('http://localhost:3000', {
                  method: 'DELETE'                  
                })
                .then(result => {
                  if (!result.ok) {
                    alert.error(`Something went wrong!`);
                    return;
                  }
                  setFrames([]);
                  setLastFrame(false);                  
                })
                .catch(error => alert.error(error.message))
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