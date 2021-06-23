import React, { FC } from "react";
import { Frame, FrameData } from "../Frame";
import { padArray } from "../../utilities/array.util";

import "./FramesPanel.css";

export const MAX_FRAMES = 10;

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
    rolls: [10],
    score: 41
  },
  {
    number: 5,
    spare: false,
    strike: false,
    rolls: [1, 8],
    score: 50
  },
  {
    number: 6,
    spare: false,
    strike: true,
    rolls: [10],
    score: 64
  },
  {
    number: 7,
    spare: false,
    strike: true,
    rolls: [10],
    score: 74
  },
  // {
  //   number: 8,
  //   spare: false,
  //   strike: false,
  //   rolls: [2, 2],
  //   score: 78
  // },
  // {
  //   number: 9,
  //   spare: true,
  //   strike: false,
  //   rolls: [4, 6],
  //   score: 98
  // },
  // {
  //   number: 10,
  //   spare: false,
  //   strike: true,
  //   rolls: [5,5,6],
  //   score: 114
  // }
]

export const FramesPanel: FC = () => {
  const allFrames = padArray<FrameData>(frames, MAX_FRAMES, (index) => ({number: index + 1}));
  return <div className="scores">
    {allFrames.map(f => <Frame key={f.number} data={f}></Frame>)}
  </div>
}