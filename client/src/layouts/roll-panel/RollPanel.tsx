import React, { FC } from 'react';
import { Button } from "../../components/Button";
import { RollButton } from "../../components/RollButton";

import './RollPanel.css';

const DEFAULT_MAX_PINS = 10;

interface RollPanelProps {
  maxPins?: number;
}

export const RollPanel: FC<RollPanelProps> = ({maxPins = DEFAULT_MAX_PINS}) => {
  return <div className="rolls">
    {Array(maxPins + 1).fill(0).map((_, index) => <Button key={index}>{index}</Button>)}
    <RollButton></RollButton>
  </div>
}