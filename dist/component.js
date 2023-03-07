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
  setup () {
    const mqttClient = mqtt.connect("ws://public.trxbroker.org:9001/mqtt");
    return {mqttClient}
  },
  methods: {
    onSubmit (fullName, email, message) {
      this.mqttClient.publish('mqtt-vue-contact-form/message', message);
    }
  },
};
