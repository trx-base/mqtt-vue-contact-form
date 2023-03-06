export default {
  template: `
  <div>
    <h2>component.js</h2>
    <slot :email="email"/>
  </div>`,
  props: {
    mqttHost: String
  },
  setup () {
    const name = 'Name not set';
    const email = 'Email not set';
    const message = 'No message either';
    return {
      name,
      email,
      message
    };
  },
  mounted () {
    console.log('Component mounted');
    console.log('mqttHost: ' + this.mqttHost); // 0/ 0
  }
};
