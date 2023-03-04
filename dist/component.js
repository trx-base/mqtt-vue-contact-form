const Component = {
  template: `
  <div>
   <h1>mqtt-vue-contact-form</h1>
   <p>{{ message }}</p>
  </div>
`,
props: {
  title: String
},
setup(props) {
    const message = props.title + ' - Howdy, here is the composite speaking!'

    // expose to template and other options API hooks
    return {
        message
    }
  },

  mounted() {
    console.log("MqttVueContactForm") // 0
  }
}
 
Vue.createApp({ 
  components: { Component }
}).mount("#MqttVueContactForm");