import React, { FC } from 'react';

import './Button.css';

interface ButtonProps {
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({children, onClick = () => {}}) => {
  return <button role="button" className="btn" onClick={onClick}>{children}</button>
}