import classNames from "classnames";
import React, { FC } from "react";
import { joinElement } from "../../utilities/array.util";

import './Rolls.css';

const Roll: FC = ({children}) => <span role="listitem" className="frame_roll">{children}</span>;

const Strike: FC = () => 
<Roll>
  <svg role="status" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
</Roll>;

const Spare: FC = () => <Roll>/</Roll>;

interface RollsProps {  
  rolls?: number[];
  strike: boolean;
  spare: boolean;
}

export const Rolls: FC<RollsProps> = ({rolls, strike, spare}) => {  
  return (
    <div role="list" className={classNames("frame_rolls", {'disabled': !rolls?.length})}>
      { 
        rolls ? joinElement(rolls.map(renderRollMark(spare, strike)), index => <span key={index + 10}>•</span>) : null
      }
    </div>
  );
}

function renderRollMark(spare: boolean, strike: boolean) {
  return (roll: number, index: number) => {
    if (strike && index === 0) return <Strike key={index}></Strike>;
    return index === 1 && spare ? <Spare key={index}></Spare> : <Roll key={index}>{roll}</Roll>
  }
}