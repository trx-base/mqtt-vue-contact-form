/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/

export default {
  template: '<slot :submit="onSubmit"/>',
  props: {
    mqttHost: String
  },
  data() {
    return {
      mqttClient: {},
    }
  },
  methods: {
    onSubmit (form) {
      this.mqttClient.publish('mqtt-vue-contact-form/message', JSON.stringify(form));
    }
  },
  mounted() {
    this.mqttClient = mqtt.connect(this.mqttHost);
  }
};
