import React from 'react';
import './App.css';
import { Seperator } from './components/Seperator';

import {RollPanel} from './components/RollPanel';
import { FramesPanel } from './components/FramesPanel';

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
