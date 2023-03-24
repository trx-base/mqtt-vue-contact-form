import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Component from '../src/component';

// Init Mocks
const mqtt = {
  connect: vi.fn().mockReturnValue({ publish: vi.fn(), on: vi.fn() })
};
vi.stubGlobal('mqtt', mqtt);

vi.mock('../src/util', () => {
  return {
    random: vi.fn().mockReturnValue('mockedRandom')
  };
});

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

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_mockedRandom', clean: true, protocolVersion: 5 });
  });

  it('should publish to topic when submit', async () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'test/expected/topic'
      }
    });
    wrapper.vm.submit();
    expect(mqtt.connect().publish).toHaveBeenCalledWith('mqtt-vue-contact-form/test/expected/topic/submit', '{}', { qos: 2 }, wrapper.vm.handlePublishCallback);
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

    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_mockedRandom', username: 'expectedUsername', password: 'expectedPassword', clean: true, protocolVersion: 5 });
  });

  it('should set clientId when connecting to mqtt broker', () => {
    mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    expect(mqtt.connect).toHaveBeenCalledWith('wss://expectedHost', { clientId: 'jestTest_mockedRandom', clean: true, protocolVersion: 5 });
  });

  it('should have disabled submit when mqtt connection preparation', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    expect(wrapper.vm.data.actions.submit.disabled).toBe(true);
  });

  it('should publish to topic when action.submit executed', async () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'test/expected/topic'
      }
    });
    wrapper.vm.data.actions.submit.execute();
    expect(mqtt.connect().publish).toHaveBeenCalledWith('mqtt-vue-contact-form/test/expected/topic/submit', '{}', { qos: 2 }, wrapper.vm.handlePublishCallback);
  });

  it('should have enabled submit when mqtt connection success', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    wrapper.vm.handleConnectSuccess();
    expect(wrapper.vm.data.actions.submit.disabled).toBe(false);
  });

  it('should have disabled submit when mqtt connection disconnect after success', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    wrapper.vm.handleConnectSuccess();
    expect(wrapper.vm.data.actions.submit.disabled).toBe(false);
    wrapper.vm.handleConnectClose('Expected test close.');
    expect(wrapper.vm.data.actions.submit.disabled).toBe(true);
  });

  it('should not reset values when handlePublishCallback() contains error', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    wrapper.vm.data.values = { value1: 'Expected value' };
    wrapper.vm.handlePublishCallback('Expected error');
    expect(wrapper.vm.data.values.value1).toBe('Expected value');
  });

  it('should reset values when handlePublishCallback() without error', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    wrapper.vm.data.values = { value1: 'Expected value' };
    wrapper.vm.handlePublishCallback();
    expect(wrapper.vm.data.values).toStrictEqual({});
  });

  it('should have status "NONE" when mounted', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    expect(wrapper.vm.data.status).toBe('NONE');
  });

  it('should change status when given different actions', () => {
    const wrapper = mount(Component, {
      propsData: {
        mqttHost: 'wss://expectedHost',
        mqttTopic: 'jestTest'
      }
    });
    expect(wrapper.vm.data.status).toBe('NONE');
    wrapper.vm.handleConnectSuccess();
    expect(wrapper.vm.data.status).toBe('CONNECTED');
    wrapper.vm.handleConnectClose();
    expect(wrapper.vm.data.status).toBe('DISCONNECTED');
    wrapper.vm.handlePublishCallback();
    expect(wrapper.vm.data.status).toBe('SUCCESS');
    wrapper.vm.handlePublishCallback('Error');
    expect(wrapper.vm.data.status).toBe('ERROR');
  });
});
