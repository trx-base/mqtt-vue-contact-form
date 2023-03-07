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
    return {

    };
  },
  methods: {
    onSubmit (fullName, email, message) {
      console.log('Submitting...');
      console.log('Name:' + fullName);
      console.log('Email:' + email);
      console.log('Message:' + message);
      console.log('---------------');
    }
  },
  mounted () {
    const mqttClient = mqtt.connect("ws://public.trxbroker.org:9001/mqtt ");
  }
};
