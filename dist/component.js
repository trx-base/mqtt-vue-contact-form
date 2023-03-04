const Component = {
  props: { 
    title: String 
  },
  setup(props) {
    const message = props.title + ' - Howdy, here is the composite speaking!'
    return {
        message
    }
  },
  mounted() {
    console.log("mqtt-vue-contact-form mounted.") // 0
  }
}
 
Vue.createApp({ 
  components: { Component }
}).mount("#MqttVueContactForm");