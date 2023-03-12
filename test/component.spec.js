import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Component from '../dist/component';

// Init Mocks
const publish = vi.fn();
const connect = vi.fn(() => {
  return {
    publish
  };
});
const mqtt = {
  connect
};
vi.stubGlobal('mqtt', mqtt);
// Init Mocks End

describe('mqtt-vue-contact-form', () => {
  it('should connect to mqtt when mounted', () => {
    mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost'
      }
    });

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost');
  });

  it('should publish to topic when submit', async () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttTopic: 'test/expected/topic'
      }
    });
    wrapper.vm.submit();
    expect(publish).toHaveBeenCalled();
  });
});
