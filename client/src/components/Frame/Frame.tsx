import classNames from "classnames";
import React, { FC } from "react";

import "./Frame.css";

export interface FrameData {
  number: number;
  strike?: boolean;
  spare?: boolean;
  rolls?: number[];
  score?: number;
}

interface FrameProps {
  data: FrameData
}

export const Frame: FC<FrameProps> = ({data}) => {
  return <div role="listitem" className={classNames("frame", {'disabled': !data.rolls?.length})}>
    <h2 role="heading" className="frame_number">{data.number}</h2>
    <div role="list" className="frame_rolls">
      <span role="listitem" className="frame_roll">{data.rolls && data.rolls[0]}</span>
      <span>/</span>
      <span role="listitem" className="frame_roll">{data.rolls && data.rolls[1]}</span>
      {
        data.number === 10 ? (
          <>
            <span>/</span>
            <span role="listitem" className="frame_roll">{data.rolls && data.rolls[2]}</span>
            <span>/</span>
            <span role="listitem" className="frame_roll">{data.rolls && data.rolls[3]}</span>
          </>
        ) : ''
      }   
    </div>
    <div role="status" className="frame_score">{data.score ?? 'N/A'}</div>
  </div>
}