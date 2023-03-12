import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Component from '../dist/component';

const mqtt = {
  connect: vi.fn()
};
vi.stubGlobal('mqtt', mqtt);

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  it('serial test', async () => {
    expect(true).toBe(true);
  });

  it('should do somehting with component', () => {
    const wrapper = mount(Component);
    console.log(wrapper.html());
  });
});
