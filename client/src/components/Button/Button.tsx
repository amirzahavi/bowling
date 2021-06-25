import React, { FC } from 'react';
import classNames from 'classnames';

import './Button.css';

interface ButtonProps {
  selected: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({children, selected, disabled, onClick = () => {}}) => {
  return <button role="button" 
    className={classNames('btn', {selected})} 
    disabled={disabled} 
    onClick={onClick}>{children}</button>
}