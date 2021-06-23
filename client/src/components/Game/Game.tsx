import React, { FC, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { aggregateRolls, isLastRoll, nextFrame, nextRoll } from "../../utilities/rolls.util";

import type { FrameData } from "../Frame";
import { FramesPanel } from "../FramesPanel";
import { RollPanel } from "../RollPanel";
import { Seperator } from "../Seperator";

import './Game.css';

export const Game: FC = () => {
  const alert = useAlert();
  const [pins, setKnockedPins] = useState<{knockedPins: number} | null>(null);
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
          alert.error(result.message);
        } else {
          const frames = aggregateRolls(result);          
          setFrames(frames);
          
          if (isLastRoll(result)) {
            alert.success('Congratulations! You finished the game');
          } else {
            setCurrentRoll({
              frame: nextFrame(currentRoll.frame, currentRoll.rollInFrame, pins.knockedPins),
              rollInFrame: nextRoll(currentRoll.frame, currentRoll.rollInFrame, pins.knockedPins)
            });
          }
        }
      })
      .catch(error => alert.error(error.message));
    }
  }, [pins]);  


  function handleRoll(knockedPins: number) {
    setKnockedPins({knockedPins});
  }

  return (
    <div className="bowling">
      <RollPanel onRoll={handleRoll}></RollPanel>
      <Seperator></Seperator>  
      <FramesPanel frames={frames}></FramesPanel>
    </div>
  );
}