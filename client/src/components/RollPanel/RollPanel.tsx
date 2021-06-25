import React, { FC, useState } from 'react';
import type { CurrentRollState } from '../../hooks/use-frames.hook';
import { Button } from "../Button";
import { MAX_FRAMES } from '../FramesPanel';
import { RollButton } from "../RollButton";

import './RollPanel.css';

const MAX_PINS = 10;

interface RollPanelProps {
  disabled: boolean;
  prevPins?: number;
  currentRoll: CurrentRollState;
  onRoll?: (knockedPins: number) => void;
}

function isBtnDisabled(isPanelDisabled: boolean, knockedPins: number | undefined, currentPin: number, currentRoll: CurrentRollState): boolean {
  if (isPanelDisabled) return true;
  if (typeof knockedPins === 'undefined') return false;
  if (currentRoll.rollInFrame !== 2 || currentRoll.frame === MAX_FRAMES) return false;

  const maxAvailablePins = MAX_PINS - knockedPins;
  return currentPin > maxAvailablePins;
}

export const RollPanel: FC<RollPanelProps> = ({prevPins, disabled, currentRoll, onRoll}) => {
  const [knockedPins, setKnockedPins] = useState(0);
  return <div className="rolls">
    {Array(MAX_PINS + 1).fill(0).map((_, index) => <Button key={index} disabled={isBtnDisabled(disabled, prevPins, index, currentRoll)} selected={index === knockedPins} onClick={() => setKnockedPins(index)}>{index}</Button>)}
    <RollButton disabled={disabled} onClick={() => onRoll && onRoll(knockedPins)}></RollButton>
  </div>
}