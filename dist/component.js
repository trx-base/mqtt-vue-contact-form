/*
Prerequisites:
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
*/

export default {
  template: '<slot :form="form" :submit="onSubmit"/>',
  props: {
    mqttHost: String
  },
  data () {
    return {
      mqttClient: {},
      form: {
        name: '',
        email: '',
        message: ''
      }

    };
  },
  methods: {
    onSubmit () {
      this.mqttClient.publish('mqtt-vue-contact-form/message', JSON.stringify(this.form));
      this.form = {};
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.mqttClient = mqtt.connect(this.mqttHost);
  }
};
