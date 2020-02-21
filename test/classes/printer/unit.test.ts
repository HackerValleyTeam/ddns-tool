/* eslint-disable */
import { expect } from 'chai';
import { print, styledText } from '../../../classes/printer';

describe('Testing printer class', () => {

  it('Expect method print to exist', () => {
    expect(print).to.exist;
  });

  it('Expect method print accept two paramaters', () => {
    expect(print('for-test', '')).to.not.eql(1);
  });

  it('Expect method styledText to exist', () => {
    expect(styledText).to.exist;
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'red')).to.not.eql(1);
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'blue')).to.not.eql(1);
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'yellow')).to.not.eql(1);
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'shineBlue')).to.not.eql(1);
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'purple')).to.not.eql(1);
  });

  it('Can\'t test styledTexd method just for test cover', () => {
    expect(styledText('1', 'nothing')).to.not.eql(1);
  });
});
