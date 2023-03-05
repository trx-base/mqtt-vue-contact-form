export default {
  template: `<div>
       <h1>mqtt-vue-contact-form</h1>
       <h2><span style="color:red">{{ title }}</span><span> - {{ message }}</h2>
       <h3><slot :title="title" :message="message"/></h3>
      </div>`,
  props: { 
    title: String 
  },
  setup(props) {
    const message = 'Howdy, here is the composite speaking!'
    return {
        message
    }
  },
  mounted() {
    console.log("mqtt-vue-contact-form mounted.") // 0
  }
}