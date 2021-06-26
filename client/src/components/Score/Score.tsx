import React, { FC } from "react";

import './Score.css';

interface ScoreProps {
  value?: number;
}

export const Score: FC<ScoreProps> = ({value}) => (
  <div  className="score">
    <h3>Score</h3>
    <div role="status" className="total">{value ?? 'N/A'}</div>
  </div>
);