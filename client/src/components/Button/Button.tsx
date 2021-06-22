import React, { FC } from 'react';

import './Button.css';

export const Button: FC = ({children}) => {
  return <button role="button" className="btn">{children}</button>
}