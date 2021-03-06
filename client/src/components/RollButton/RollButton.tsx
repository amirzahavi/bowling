import React, { FC } from 'react';

import './RollButton.css';

interface RollButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

export const RollButton: FC<RollButtonProps> = ({disabled, onClick = () => {}}) => {
  return <button className="btn btn--roll" data-testid="roll-btn" role="button" onClick={onClick} disabled={disabled}>
    <svg role="img" className="submit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M14 8.83L17.17 12 14 15.17V14H6v-4h8V8.83M12 4v4H4v8h8v4l8-8-8-8z"/>
    </svg>
  </button>
}