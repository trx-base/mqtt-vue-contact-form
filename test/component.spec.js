import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Component from '../src/component';

// Init Mocks
const mqtt = {
  connect: vi.fn().mockReturnValue({ publish: vi.fn() })
};
vi.stubGlobal('mqtt', mqtt);

describe('mqtt-vue-contact-form', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should connect to mqtt when mounted', () => {
    mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_etjen' });
  });

  it('should publish to topic when submit', async () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'test/expected/topic'
      }
    });
    wrapper.vm.submit();
    expect(mqtt.connect().publish).toHaveBeenCalled();
  });

  it('should use username and password when connecting to mqtt broker', () => {
    mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest',
        mqttUsername: 'expectedUsername',
        mqttPassword: 'expectedPassword'
      }
    });

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_etjen', username: 'expectedUsername', password: 'expectedPassword' });
  });

  it('should set clientId when connecting to mqtt broker', () => {
    mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_etjen' });
  });
});
