import React, { useState } from 'react';
import { Seperator } from './components/Seperator';
import {RollPanel} from './components/RollPanel';
import { FramesPanel } from './components/FramesPanel';
import type { FrameData } from './components/Frame';

import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const [frames, setFrames] = useState<FrameData[]>([]);
  
  function handleRoll(knockedPins: number) {
    console.log('knockedPins', knockedPins);
    const frames2 = [
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
    ];
    setFrames(frames2);
  }

  return (
    <div className="bowling">
      <RollPanel onRoll={handleRoll}></RollPanel>
      <Seperator></Seperator>  
      <FramesPanel frames={frames}></FramesPanel>
    </div>
  );
}

export default App;
