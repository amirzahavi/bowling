import React, { FC } from "react";
import { Frame, FrameData } from "../Frame";
import { padArray } from "../../utilities/array.util";

import "./FramesPanel.css";
import { Score } from "../Score/Score";

export const MAX_FRAMES = 10;

interface FramesPanelProps {
  frames: FrameData[]
}

export const FramesPanel: FC<FramesPanelProps> = ({frames}) => {
  const allFrames = padArray<FrameData>(frames, MAX_FRAMES, (index) => ({number: index + 1, score: null}));
  return <div data-testid="frames" className="frames">
    {allFrames.map(f => <Frame key={f.number} data={f}></Frame>)}
    <Score value={frames[frames.length - 1]?.score}></Score>
  </div>
}