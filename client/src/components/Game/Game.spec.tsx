import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { MAX_FRAMES } from "../FramesPanel";

import { Game } from "./Game";

const mockInfoAlert = jest.fn();
const mockErrorAlert = jest.fn();
const mockSuccessAlert = jest.fn();

jest.mock('react-alert', () => ({useAlert: () => ({
  info: mockInfoAlert,
  error: mockErrorAlert,
  success: mockSuccessAlert
})}));

describe('<Game>', () => {

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  })

  it('should display roll buttons panel and frames panel with seperator between them', () => {
    const {getByTestId, getByRole} = render(<Game></Game>);
    const framesPanel = getByTestId('frames');
    const rollsPanel = getByTestId('rolls');
    const separator = getByRole('separator');

    expect(framesPanel).toBeInTheDocument();
    expect(separator).toBeInTheDocument();
    expect(rollsPanel).toBeInTheDocument();
  });

  it('should display processing alert for one second', () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({message: 'Bad Request'})
    }); 
    const {getAllByRole, getByTestId, rerender} = render(<Game></Game>);    
    const buttons = getAllByRole('button');
    const roll = getByTestId('roll-btn');    

    // roll 7 pins
    fireEvent.click(buttons[7]);
    fireEvent.click(roll);
    rerender(<Game></Game>);

    expect(mockInfoAlert).toHaveBeenNthCalledWith(1, 'processing', {timeout: 1000});
  });

  it('should display error alert, when error from backend', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({message: 'Bad Request'})
    });  
    const {getAllByRole, getByTestId, rerender} = render(<Game></Game>);    
    const buttons = getAllByRole('button');
    const roll = getByTestId('roll-btn');

    // roll 7 pins
    fireEvent.click(buttons[7]);
    fireEvent.click(roll);
    await act(() => Promise.resolve(rerender(<Game></Game>)));    

    expect(mockErrorAlert).toHaveBeenNthCalledWith(1, 'Bad Request');
  });

  it('should display error alert, when fetch error', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockRejectedValue({message: 'Bad Connection'})
    });  
    const {getAllByRole, getByTestId, rerender} = render(<Game></Game>);    
    const buttons = getAllByRole('button');
    const roll = getByTestId('roll-btn');

    // roll 7 pins
    fireEvent.click(buttons[7]);
    fireEvent.click(roll);
    await act(() => Promise.resolve(rerender(<Game></Game>)));    

    expect(mockErrorAlert).toHaveBeenNthCalledWith(1, 'Bad Connection');
  });

  it('should display success alert, when finished the game', async () => {
    const rollsResult = Array(MAX_FRAMES).fill(0).map((_, i) => ({frame: i+1, strike: true, rollInFrame: 1}));
    rollsResult.push({frame: 10, strike: false, rollInFrame: 2}, {frame: 10, strike: false, rollInFrame: 3});
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(rollsResult)
    });  
    const {getAllByRole, getByTestId, rerender} = render(<Game></Game>);    
    const buttons = getAllByRole('button');
    const roll = getByTestId('roll-btn');

    // roll 7 pins
    for(let i=0; i < MAX_FRAMES; i++) {
      fireEvent.click(buttons[10]);
      fireEvent.click(roll);
    }
    await act(() => Promise.resolve(rerender(<Game></Game>)));    

    expect(mockSuccessAlert).toBeCalledTimes(1);
  });
});