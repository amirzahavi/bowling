import * as React from 'react';
import { render } from '@testing-library/react';
import { FramesPanel, MAX_FRAMES } from "./FramesPanel";
import type { FrameData } from '../Frame/Frame';

describe('<FramesPanel>', () => {
  it('should render all frame and total score', () => {
    const frames: FrameData[] = [
      {number: 1, score: 3},{number: 2, score: 3},{number: 3, score: 3},{number: 4, score: 3},{number: 5, score: 3},
      {number: 6, score: 3},{number: 7, score: 3},{number: 8, score: 3},{number: 9, score: 3},{number: 10, score: 3}
    ];
    const { getByTestId } = render(<FramesPanel frames={frames}></FramesPanel>);
    const scores = getByTestId('frames');
    
    expect(scores.children).toHaveLength(MAX_FRAMES + 1);
  });

  it('should render all frame and total score, when not all frames exists', () => {
    const frames: FrameData[] = [
      {number: 1, score: null},{number: 2, score: null},
      {number: 3, score: null},{number: 4, score: null},
      {number: 5, score: null}
    ];
    const { getByTestId } = render(<FramesPanel frames={frames}></FramesPanel>);
    const scores = getByTestId('frames');
    
    expect(scores.children).toHaveLength(MAX_FRAMES + 1);
  });
});
