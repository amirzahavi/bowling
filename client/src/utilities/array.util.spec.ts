import {createElement} from 'react';
import { padArray, joinElement } from "./array.util";

describe('padArray()', () => {
  it('should insert all items if array is empty', () => {    
    const actual = padArray([], 3, (index) => index);
    expect(actual).toStrictEqual([0,1,2]);
  });

  it('should insert 2 items, when already have 1 and total of 3', () => {    
    const actual = padArray([0], 3, (index) => index);
    expect(actual).toStrictEqual([0,1,2]);
  });

  it('should not insert items, when already have 3 and total of 3', () => {
    const actual = padArray([0,1,2], 3, (index) => index);
    expect(actual).toStrictEqual([0,1,2]);
  });

  it('should throw if maxItems is less than existing array', () => {
    expect(() => padArray([0,1], 1, index => index)).toThrow();
  })
});

describe('joinElement()', () => {
  it('should join between existing elements a given seperator', () => {
    const actual = joinElement([createElement('a'), createElement('a')], (index) => createElement('abbr', {index}));
    expect(actual).toHaveLength(3);
    expect(actual![1].type).toBe('abbr');
  })

  it('should not join seperator when only one element', () => {
    const actual = joinElement([createElement('a')], (index) => createElement('abbr', {index}));
    expect(actual).toHaveLength(1);
    expect(actual![0].type).not.toBe('abbr');
  })

  it('should not join seperator when no elements', () => {
    const actual = joinElement([], (index) => createElement('abbr', {index}));
    expect(actual).toHaveLength(0);    
  })

  it('should join seperator only between elements', () => {
    const actual = joinElement([createElement('a'),createElement('a'),createElement('a')], (index) => createElement('abbr', {index}));
    expect(actual).toHaveLength(5);
    expect(actual![1].type).toBe('abbr');
    expect(actual![3].type).toBe('abbr');
  })
});