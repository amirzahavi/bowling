import React, { FC, useState } from 'react';
import { Button } from "../Button";
import { RollButton } from "../RollButton";

import './RollPanel.css';

const DEFAULT_MAX_PINS = 10;

interface RollPanelProps {
  disabled: boolean;
  maxPins?: number;
  onRoll?: (knockedPins: number) => void;
}

export const RollPanel: FC<RollPanelProps> = ({disabled, maxPins = DEFAULT_MAX_PINS, onRoll}) => {
  const [knockedPins, setKnockedPins] = useState(0);
  return <div className="rolls">
    {Array(maxPins + 1).fill(0).map((_, index) => <Button key={index} onClick={() => setKnockedPins(index)}>{index}</Button>)}
    <RollButton disabled={disabled} onClick={() => onRoll && onRoll(knockedPins)}></RollButton>
  </div>
}