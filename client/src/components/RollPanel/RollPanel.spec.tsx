import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { NUMBER_OF_PIN_BUTTONS, RollPanel } from "./RollPanel";
import type { CurrentRollState } from 'src/hooks/use-frames.hook';

describe('<RollPanel>', () => {
  it('should render NUMBER_OF_PIN_BUTTONS range of buttons by default with RollButton', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll}></RollPanel>);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(NUMBER_OF_PIN_BUTTONS + 1);
  });

  it('should render the index number in the buttons', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll}></RollPanel>);
    const buttons = getAllByRole('button');

    for(let i = 0; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toHaveTextContent(i.toString());
    }
  });

  it('should render the last button as RollButton', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll}></RollPanel>);
    const buttons = getAllByRole('button');

    expect(buttons[NUMBER_OF_PIN_BUTTONS]).not.toHaveTextContent(NUMBER_OF_PIN_BUTTONS.toString());
  });

  it('should fire onRoll event, when RollButton is clicked', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const spy = jest.fn();
    const { getByTestId } = render(<RollPanel disabled={false} currentRoll={roll} onRoll={spy}></RollPanel>);
    const rollButton = getByTestId('roll-btn');

    fireEvent.click(rollButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should disable all buttons, when panel is disabled', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const { getAllByRole} = render(<RollPanel disabled={true} currentRoll={roll}></RollPanel>);
    const buttons = getAllByRole('button');    
        
    for(let i=0; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toBeDisabled();
    }
  });

  it('should disable 4-10 buttons after choose 7 knocked down pins, when have previous rolls in frame', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 2};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll} prevPins={7}></RollPanel>);
    const buttons = getAllByRole('button');    

    for(let i=1; i <= 3; i++) {
      expect(buttons[i]).toBeEnabled();
    }

    for(let i=4; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toBeDisabled();
    }
  });

  it('should disable 8-10 buttons after choose 3 knocked down pins, when have previous rolls in frame', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 2};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll} prevPins={3}></RollPanel>);
    const buttons = getAllByRole('button');    

    for(let i=1; i <= 7; i++) {
      expect(buttons[i]).toBeEnabled();
    }

    for(let i=8; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toBeDisabled();
    }
  });

  it('should enable all buttons, when first throw in frame', () => {
    const roll: CurrentRollState = {frame: 5, rollInFrame: 1};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll} prevPins={4}></RollPanel>);
    const buttons = getAllByRole('button');    
    
    for(let i=0; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toBeEnabled();
    }
  });

  it('should enable all buttons, when first throw in game', () => {
    const roll: CurrentRollState = {frame: 1, rollInFrame: 1};
    const { getAllByRole } = render(<RollPanel disabled={false} currentRoll={roll} prevPins={undefined}></RollPanel>);
    const buttons = getAllByRole('button');    
    
    for(let i=0; i < NUMBER_OF_PIN_BUTTONS; i++) {
      expect(buttons[i]).toBeEnabled();
    }
  });
});
