/// <reference types="@testing-library/jest-dom" />
import * as React from 'react';
import { render } from '@testing-library/react';
import { RollPanel } from "./RollPanel";

describe('<RollPanel>', () => {
  it('should render 0-10 range of buttons by default with RollButton', () => {    
    const { getAllByRole } = render(<RollPanel></RollPanel>);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(12);
  });

  it('should render 0-x range of buttons with RollButton', () => {    
    const { getAllByRole } = render(<RollPanel maxPins={5}></RollPanel>);
    const buttons = getAllByRole('button');    
    expect(buttons).toHaveLength(7);
  });

  it('should render the index number in the buttons', () => {
    const { getAllByRole } = render(<RollPanel maxPins={1}></RollPanel>);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(3);
    const [roll0, roll1, rollBtn] = buttons;
    expect(roll0).toHaveTextContent('0');
    expect(roll1).toHaveTextContent('1');
    expect(rollBtn).not.toHaveTextContent('2');
  })
});
