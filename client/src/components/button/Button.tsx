import React, { FC } from 'react';
import classNames from "classnames";

import './Button.css';

interface ButtonProps {
  bordered?: boolean;
}

export const Button: FC<ButtonProps> = ({bordered, children}) => {
  return <button role="button" className={classNames('btn', {bordered})}>{children}</button>
}