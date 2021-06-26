import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { RollButton } from "./RollButton";

describe('<RollButton>', () => {
  it('should render button', () => {
    const { getByRole } = render(<RollButton disabled={false}></RollButton>);    
    const btnElement = getByRole('button');
    expect(btnElement).toHaveClass('btn');
  });

  it('should render button with svg', () => {
    const { getByRole } = render(<RollButton disabled={false}></RollButton>);    
    const btnElement = getByRole('button');
    const svgElement = getByRole('img');
    expect(btnElement).toContainElement(svgElement);
  });

  it('should render disabled button', () => {
    const { getByRole } = render(<RollButton disabled={true}></RollButton>);
    const btnElement = getByRole('button');
    expect(btnElement).toHaveAttribute('disabled');
  });

  it('should fire onClick event, when clicked', () => {
    const spy = jest.fn();
    const { getByRole } = render(<RollButton disabled={true} onClick={spy}></RollButton>);
    const btnElement = getByRole('button');
    
    fireEvent.click(btnElement);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
