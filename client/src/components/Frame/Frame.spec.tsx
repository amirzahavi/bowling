import * as React from 'react';
import { render } from '@testing-library/react';
import { Frame, FrameData } from "./Frame";

describe('<Frame>', () => {
  it('should render frame with data', () => {
    const data: FrameData = {
      number: 1,
      rolls: [3,4],
      spare: false,
      strike: false,
      score: 7
    };
    const { getAllByRole, getByRole } = render(<Frame data={data}></Frame>);
    const rollElements = getAllByRole('listitem').filter(item => !item.classList.contains('frame'));
    const frameNumberElement = getByRole('heading');
    const scoreElement = getByRole('status');

    expect(frameNumberElement).toHaveTextContent(data.number.toString());
    rollElements.forEach((roll, i) => {
      expect(roll).toHaveTextContent(data.rolls![i].toString());
    });
    expect(scoreElement).toHaveTextContent(data.score!.toString());
  });

  it('should render frame as disabled, if no rolls', () => {
    const data: FrameData = {
      number: 3
    };
    const { getAllByRole } = render(<Frame data={data}></Frame>);
    const frameElement = getAllByRole('listitem').find(item => item.classList.contains('frame'));
    
    expect(frameElement).toHaveClass('frame disabled');
  });

  it('should render frame header as frame number', () => {
    const data: FrameData = {
      number: 3
    };
    const { getByRole } = render(<Frame data={data}></Frame>);
    const frameTitleElement = getByRole('heading');
    
    expect(frameTitleElement).toHaveTextContent(data.number.toString());
  });

  it('should render frame rolls', () => {
    const data: FrameData = {
      number: 3,
      rolls: [1,3]
    };
    const { getByRole } = render(<Frame data={data}></Frame>);
    const rolls = getByRole('list');    
    
    expect(rolls.children).toHaveLength(3); // rolls + seperator    
  });

  it('should render frame score', () => {
    const data: FrameData = {
      number: 3,
      score: 100
    };
    const { getByRole } = render(<Frame data={data}></Frame>);
    const frameScoreElement = getByRole('status');
    
    expect(frameScoreElement).toHaveTextContent(data.score!.toString());
  });

  it('should render default frame score, when no score provided', () => {
    const data: FrameData = {
      number: 3
    };
    const { getByRole } = render(<Frame data={data}></Frame>);
    const frameScoreElement = getByRole('status');
    
    expect(frameScoreElement).toHaveTextContent('N/A');
  });
});
