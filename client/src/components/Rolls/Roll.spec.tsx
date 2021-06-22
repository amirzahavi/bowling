/// <reference types="@testing-library/jest-dom" />
import * as React from 'react';
import { render } from '@testing-library/react';
import { Rolls } from "./Rolls";

describe('<Rolls>', () => {
  it('should render a roll with number', () => {    
    const rolls = [4,5];
    const { getAllByRole } = render(<Rolls rolls={rolls} spare={false} strike={false}></Rolls>);
    const rollElements = getAllByRole('listitem');
    
    rollElements.forEach((roll, i) => {
      expect(roll).toHaveTextContent(rolls[i].toString());
    });
  });

  it('should render a spare', () => {
    const rolls = [4,6];
    const { getAllByRole } = render(<Rolls rolls={rolls} spare={true} strike={false}></Rolls>);
    const [roll1, roll2] = getAllByRole('listitem');
    
    expect(roll1).toHaveTextContent(rolls[0].toString());
    expect(roll2).toHaveTextContent('/');
  });

  it('should render a strike', () => {
    const rolls = [10];
    const { getAllByRole, getByRole } = render(<Rolls rolls={rolls} spare={false} strike={true}></Rolls>);
    const [roll1] = getAllByRole('listitem');
    const strikeElement = getByRole('status');
    
    expect(roll1).toContainElement(strikeElement);
  });

  it('should render a strike, with 2 additional on last frame', () => {
    const rolls = [10, 2, 4];
    const { getAllByRole, getByRole } = render(<Rolls rolls={rolls} spare={false} strike={true}></Rolls>);
    const [roll1, ...rest] = getAllByRole('listitem');
    const strikeElement = getByRole('status');
    
    expect(roll1).toContainElement(strikeElement);
    rest.forEach((roll, i) => {
      expect(roll).toHaveTextContent(rolls[i + 1].toString());
    });
  });

  it('should render a spare only on second place, when last frame', () => {
    const rolls = [6,4,5];
    const { getAllByRole } = render(<Rolls rolls={rolls} spare={true} strike={false}></Rolls>);
    const [roll1, roll2, roll3] = getAllByRole('listitem');    
        
    expect(roll1).toHaveTextContent(rolls[0].toString());
    expect(roll2).toHaveTextContent('/');
    expect(roll3).toHaveTextContent(rolls[2].toString());
  });
});
