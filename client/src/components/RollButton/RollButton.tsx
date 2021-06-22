import React, { FC } from 'react';
import { Button } from "../button";

import './RollButton.css';

interface RollButtonProps {}

export const RollButton: FC<RollButtonProps> = () => {
  return <Button bordered>Roll!</Button>
}