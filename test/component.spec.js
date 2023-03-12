import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Component from '../dist/component';

const mqtt = {
  connect: vi.fn()
};
vi.stubGlobal('mqtt', mqtt);

describe('mqtt-vue-contact-form', () => {
  it('should connect to mqtt when mounted', () => {
    mount(Component, { mqttHost: 'wss://expectedHost' });
    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost');
  });
});
