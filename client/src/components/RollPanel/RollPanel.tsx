import React, { FC, useState } from 'react';
import { Button } from "../Button";
import { RollButton } from "../RollButton";

import './RollPanel.css';

const MAX_PINS = 10;

interface RollPanelProps {
  disabled: boolean;
  onRoll?: (knockedPins: number) => void;
}

export const RollPanel: FC<RollPanelProps> = ({disabled, onRoll}) => {
  const [knockedPins, setKnockedPins] = useState(0);
  return <div className="rolls">
    {Array(MAX_PINS + 1).fill(0).map((_, index) => <Button key={index} disabled={disabled} selected={index === knockedPins} onClick={() => setKnockedPins(index)}>{index}</Button>)}
    <RollButton disabled={disabled} onClick={() => onRoll && onRoll(knockedPins)}></RollButton>
  </div>
}