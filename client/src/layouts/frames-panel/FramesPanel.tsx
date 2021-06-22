import React, { FC } from "react";
import { Frame, FrameData } from "../../components/Frame";

import "./FramesPanel.css";

const frames = [
  {
    number: 1,
    spare: false,
    strike: false,
    rolls: [1,3],
    score: 4
  },
  {
    number: 2,
    spare: true,
    strike: false,
    rolls: [4,6],
    score: 17
  },
  {
    number: 3,
    spare: false,
    strike: false,
    rolls: [3, 2],
    score: 22
  },
  {
    number: 4,
    spare: false,
    strike: true,
    rolls: [10]    
  }
]

export const FramesPanel: FC = () => {
  const allFrames = fillEmptyFrames(frames);
  return <div className="scores">
    {allFrames.map(f => <Frame key={f.number} data={f}></Frame>)}
  </div>
}

function fillEmptyFrames(frames: FrameData[]): FrameData[] {
  const numberOfFramesToFill = 10 - frames.length;
  let frameNumberToContinue = frames.length + 1;
  return [...frames, ...Array(numberOfFramesToFill).fill(0).map((() => ({number: frameNumberToContinue++})))]
}