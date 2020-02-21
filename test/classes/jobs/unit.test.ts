/* eslint-disable */
import { expect } from 'chai';
import updateDNSConfig from '../../../classes/jobs';

describe('Test jobs', () => {
  it('Test updateDNSConfig', () => {
    expect(updateDNSConfig).to.exist;
  });
});