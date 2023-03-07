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
    console.log('Component mounted');
    console.log('mqttHost: ' + this.mqttHost); // 0/ 0
  }
};
