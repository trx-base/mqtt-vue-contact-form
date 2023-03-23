/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/
import * as util from './util.js';

export default {
  template: '<slot :data="data"/>',
  props: {
    mqttHost: {
      type: String,
      required: true
    },
    mqttTopic: {
      type: String,
      required: true
    },
    mqttUsername: {
      type: String
    },
    mqttPassword: {
      type: String
    }
  },
  data () {
    return {
      mqttClient: {},
      data: {
        values: {

        },
        actions: {
          submit: {
            disabled: true,
            execute: this.submit
          }
        },
        messages: {
          general: 'Form is being prepared. Please wait.'
        }
      }

    };
  },
  methods: {
    submit () {
      this.mqttClient.publish(this.mqttTargetTopic, JSON.stringify(this.data.values));
      this.data.values = {};
      this.data.messages.general = 'Thank you for reaching out to us. Our team will be in touch with you soon.';
    },
    getMqttConnectionOptions () {
      const mqttConnectionOptions = {};
      mqttConnectionOptions.clientId = this.mqttClientId;
      mqttConnectionOptions.clean = true;
      if (this.mqttUsername) {
        mqttConnectionOptions.username = this.mqttUsername;
      }
      if (this.mqttPassword) {
        mqttConnectionOptions.password = this.mqttPassword;
      }
      return mqttConnectionOptions;
    },
    handleConnectSuccess () {
      console.debug('handleConnectSuccess()');
      this.data.actions.submit.disabled = false;
      this.data.messages.general = '';
    },
    handleConnectError (error) {
      console.error(error);
      this.data.actions.submit.disabled = true;
    }
  },
  computed: {
    mqttTargetTopic () {
      return 'mqtt-vue-contact-form/' + this.mqttTopic + '/submit';
    },
    mqttClientId () {
      return this.mqttTopic + '_' + util.random();
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.mqttClient = mqtt.connect(this.mqttHost, this.getMqttConnectionOptions());
    this.mqttClient.on('connect', this.handleConnectSuccess);
    this.mqttClient.on('error', this.handleConnectError);
  }
};
