import React from 'react';
import './App.css';
import { Seperator } from './components/Seperator';

import {RollPanel} from './layouts/roll-panel';
import { ScorePanel } from './layouts/score-panel';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="bowling">
      <RollPanel></RollPanel>
      <Seperator></Seperator>  
      <ScorePanel></ScorePanel>
    </div>
  );
}

export default App;
