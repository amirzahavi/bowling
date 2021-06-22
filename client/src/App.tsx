import React from 'react';
import './App.css';

import {RollPanel} from './layouts/roll-panel';

interface AppProps {}

function App({}: AppProps) {
  return (
    <RollPanel></RollPanel>
  );
}

export default App;
