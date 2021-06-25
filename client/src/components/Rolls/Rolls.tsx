import classNames from "classnames";
import React, { FC } from "react";
import { joinElement } from "../../utilities/array.util";
import { Roll } from "./Roll";
import { Strike } from "./Strike";
import { Spare } from "./Spare";
import { RollSeperator } from "./RollSeperator";

import './Rolls.css';
interface RollsProps {  
  rolls?: number[];
  strike: boolean;
  spare: boolean;
}

export const Rolls: FC<RollsProps> = ({rolls, strike, spare}) => {  
  return (
    <div role="list" className={classNames("frame_rolls", {'disabled': !rolls?.length})}>
      {         
        rolls ? joinElement(rolls.map(renderRollMark(spare, strike)), index => <RollSeperator key={index + 10}></RollSeperator>) : null
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