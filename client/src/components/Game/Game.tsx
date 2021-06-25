import React, { FC, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { resetGame } from "../../utilities/api.util";
import { useFrames } from "../../hooks/use-frames.hook";

import { FramesPanel } from "../FramesPanel";
import { RollPanel } from "../RollPanel";
import { Seperator } from "../Seperator";

import './Game.css';

export const Game: FC = () => {
  const alert = useAlert();
  const [pins, setKnockedPins] = useState<{knockedPins: number} | null>(null);
  const {processing, error, isLastRoll, frames, currentRoll, reset} = useFrames(pins);  
  
  useEffect(() => {
    if (processing) {
      alert.info('processing', {timeout: 1000})
    }
    if (error) {      
      alert.error(error);
    }
    if (isLastRoll) {
      alert.success('Congratulations! You finished the game', {
        onClose: () => {
          resetGame()
            .then(() => {
              reset();
              setKnockedPins(null);
            })
            .catch(error => alert.error(error.message))
        }
      });
    }
  }, [processing, error]);

  function handleRoll(knockedPins: number) {
    setKnockedPins({knockedPins});
  }

  return (
    <div className="bowling">      
      <RollPanel prevPins={pins?.knockedPins} currentRoll={currentRoll} disabled={isLastRoll} onRoll={handleRoll}></RollPanel>
      <Seperator></Seperator>  
      <FramesPanel frames={frames}></FramesPanel>      
    </div>
  );
}