/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/
import * as util from './util.js';

export default {
  template: '<slot :data="data" :submit="submit"/>',
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
        values: {},
        messages: {
          general: ''
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
      if (this.mqttUsername) {
        mqttConnectionOptions.username = this.mqttUsername;
      }
      if (this.mqttPassword) {
        mqttConnectionOptions.password = this.mqttPassword;
      }
      return mqttConnectionOptions;
    }
  },
  computed: {
    mqttTargetTopic () {
      return '/mqtt-vue-contact-form/' + this.mqttTopic + '/submit';
    },
    mqttClientId () {
      return this.mqttTopic + '_' + util.random();
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.mqttClient = mqtt.connect(this.mqttHost, this.getMqttConnectionOptions());
  }
};
