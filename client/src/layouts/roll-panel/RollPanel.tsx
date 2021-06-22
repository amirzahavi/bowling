import React, { FC } from 'react';
import { Button } from "../../components/button";
import { RollButton } from "../../components/RollButton";

import './RollPanel.css';

const MAX_PINS = 10;

export const RollPanel: FC = () => {
  return <div className="rolls">    
    {Array(MAX_PINS + 1).fill(0).map((_, index) => { 
        return <Button>{index}</Button>
    })}
    <RollButton></RollButton>
  </div>
}