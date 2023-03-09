/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/

export default {
  template: '<slot :data="data" :submit="submit"/>',
  props: {
    mqttHost: String,
    mqttTopic: String
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
      this.mqttClient.publish(this.mqttTopic, JSON.stringify(this.data.values));
      this.data.values = {};
      this.data.messages.general = 'Thank you for reaching out to us. Our team will be in touch with you soon.';
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.mqttClient = mqtt.connect(this.mqttHost);
  }
};
