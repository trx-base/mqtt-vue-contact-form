export default {
  template: `
  <div>
    <h2>component.js</h2>
    <slot :submit="submit"/>
  </div>`,
  props: {
    mqttHost: String
  },
  setup () {
  
    const submit = (fullName, email, message) => {
      console.log("Submitting...")
      console.log("Name:" + fullName)
      console.log("Email:" + email)
      console.log("Message:" + message)
      console.log("---------------")
    }
    return {
      submit
    };
  },
  mounted () {
    console.log('Component mounted');
    console.log('mqttHost: ' + this.mqttHost); // 0/ 0
  }
};
