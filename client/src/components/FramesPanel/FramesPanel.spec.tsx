import * as React from 'react';
import { render } from '@testing-library/react';
import { FramesPanel } from "./FramesPanel";
import type { FrameData } from '../Frame/Frame';

describe('<FramesPanel>', () => {
  it('should render all frame', () => {
    const frames: FrameData[] = [
      {number: 1},{number: 2},{number: 3},{number: 4},{number: 5},
      {number: 6},{number: 7},{number: 8},{number: 9},{number: 10}
    ];
    const { getByTestId } = render(<FramesPanel frames={frames}></FramesPanel>);
    const scores = getByTestId('frames');
    
    expect(scores.children).toHaveLength(10);
  });

  it('should render all frame, when no all frames exists', () => {
    const frames: FrameData[] = [
      {number: 1},{number: 2},{number: 3},{number: 4},{number: 5}
    ];
    const { getByTestId } = render(<FramesPanel frames={frames}></FramesPanel>);
    const scores = getByTestId('frames');
    
    expect(scores.children).toHaveLength(10);
  });
});