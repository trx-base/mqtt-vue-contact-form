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
      mqttProtocolVersion: 5,
      data: {
        status: 'NONE',
        values: {

        },
        actions: {
          submit: {
            disabled: true,
            execute: this.submit
          }
        }
      }

    };
  },
  methods: {
    submit () {
      this.mqttClient.publish(this.mqttTargetTopic, JSON.stringify(this.data.values), { qos: 2 }, this.handlePublishCallback);
    },
    getMqttConnectionOptions () {
      const mqttConnectionOptions = {};
      mqttConnectionOptions.protocolVersion = this.mqttProtocolVersion;
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
      this.data.status = 'CONNECTED';
      this.data.actions.submit.disabled = false;
    },
    handleConnectClose (message) {
      console.warn('handleConnectClose(): ' + message);
      this.data.status = 'DISCONNECTED';
      this.data.actions.submit.disabled = true;
    },
    handlePublishCallback (error) {
      console.debug('handlePublishCallback(): ' + error);
      if (error) {
        this.data.status = 'ERROR';
      } else {
        this.data.status = 'SUCCESS';
        this.data.values = {};
      }
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
    this.mqttClient.on('close', this.handleConnectClose);
  }
};
