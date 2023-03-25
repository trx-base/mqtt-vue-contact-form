/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/
import * as util from './util.js';

export default {
  template: '<slot :component="component"/>',
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
      component: {
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
      this.mqttClient.publish(this.mqttTargetTopic, JSON.stringify(this.component.values), { qos: 2 }, this.handlePublishCallback);
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
      this.component.status = 'CONNECTED';
    },
    handleConnectClose (message) {
      console.warn('handleConnectClose(): ' + message);
      this.component.status = 'DISCONNECTED';
    },
    handlePublishCallback (error) {
      console.debug('handlePublishCallback(): ' + error);
      if (error) {
        this.component.status = 'ERROR';
      } else {
        this.component.status = 'SUCCESS';
        this.component.values = {};
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
  watch: {
    'component.status' (newStatus, oldStatus) {
      switch (newStatus) {
        case 'SUCCESS':
        case 'CONNECTED':
          this.component.actions.submit.disabled = false;
          break;
        case 'NONE':
        case 'DISCONNECTED':
        case 'ERROR':
          this.component.actions.submit.disabled = true;
          break;
        default:
          throw new Error('Unexpected status: ' + newStatus + '. Old status: ' + oldStatus);
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.mqttClient = mqtt.connect(this.mqttHost, this.getMqttConnectionOptions());
    this.mqttClient.on('connect', this.handleConnectSuccess);
    this.mqttClient.on('close', this.handleConnectClose);
  }
};
