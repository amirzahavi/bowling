import React, { FC, useState } from "react";
import { useAlert } from "react-alert";
import { useFrames } from "../../hooks/use-frames.hook";

import { FramesPanel } from "../FramesPanel";
import { RollPanel } from "../RollPanel";
import { Seperator } from "../Seperator";

import './Game.css';

export const Game: FC = () => {
  const alert = useAlert();
  const [pins, setKnockedPins] = useState<{knockedPins: number} | null>(null);
  const {lastFrame, frames, error} = useFrames(pins);

  if (error) {
    alert.error(error);
  }

  function handleRoll(knockedPins: number) {
    setKnockedPins({knockedPins});
  }

  return (
    <div className="bowling">
      <RollPanel disabled={lastFrame} onRoll={handleRoll}></RollPanel>
      <Seperator></Seperator>  
      <FramesPanel frames={frames}></FramesPanel>
    </div>
  );
}