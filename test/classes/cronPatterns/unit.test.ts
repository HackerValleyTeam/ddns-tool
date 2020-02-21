/* eslint-disable */
import { expect } from 'chai';
import { every5Minutes, every5Seconds, everyDay } from '../../../classes/cronPatterns';

describe('Test cronPatterns', () => {
  it('Expect every5Minutes to be a string', () => {
    const result = every5Minutes;
    expect(result).to.be.a('string');
  });

  it('Expect every5Seconds to be a string', () => {
    const result = every5Seconds;
    expect(result).to.be.a('string');
  });

  it('Expect everyDay to be a string', () => {
    const result = everyDay;
    expect(result).to.be.a('string');
  });
});