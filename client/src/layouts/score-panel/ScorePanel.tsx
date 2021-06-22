import React, { FC } from "react";
import { Button } from "../../components/button";

import "./ScorePanel.css";

export const ScorePanel: FC = () => {
  return <div className="scores">
    {Array(10).fill(0).map((_, index) => <Button key={index}>{index}</Button>)}
  </div>
}