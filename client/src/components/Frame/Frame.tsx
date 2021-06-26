import classNames from "classnames";
import React, { FC } from "react";
import { Rolls } from "../Rolls";

import "./Frame.css";

export interface FrameData {
  number: number;
  strike?: boolean;
  spare?: boolean;
  rolls?: number[];
  score: number | null;
}

interface FrameProps {
  data: FrameData
}

export const Frame: FC<FrameProps> = ({data}) => {
  return <div role="listitem" className={classNames("frame", {'disabled': !data.rolls?.length})}>
    <h2 role="heading" className="frame_number">{data.number}</h2>
    <Rolls rolls={data.rolls} 
      strike={data.strike ?? false} 
      spare={data.spare ?? false}
    ></Rolls>
    <div role="status" className="frame_score">{data.score ?? ''}</div>
  </div>
}