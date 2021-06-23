import React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
// @ts-ignore
import AlertTemplate from "react-alert-template-basic";

import { Game } from './components/Game';

interface AppProps {}

function App({}: AppProps) {      
  return (
    <AlertProvider template={AlertTemplate} position={positions.BOTTOM_CENTER}>
      <Game></Game>
    </AlertProvider>
  );
}

export default App;
