import React from 'react';
import './App.css';
import { Seperator } from './components/Seperator';

import {RollPanel} from './layouts/roll-panel';
import { FramesPanel } from './layouts/frames-panel';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="bowling">
      <RollPanel></RollPanel>
      <Seperator></Seperator>  
      <FramesPanel></FramesPanel>
    </div>
  );
}

export default App;
