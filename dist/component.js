 Vue.createApp({ 
    template: `
      <div>
       <h1>mqtt-vue-contact-form</h1>
       <p>{{ message }}</p>
      </div>
    `,
    setup() {
        const message = 'Hello, here is the composite speaking!'
    
        // expose to template and other options API hooks
        return {
            message
        }
      },
    
      mounted() {
        console.log("MqttVueContactForm mounted.") // 0
      }
}).mount("#MqttVueContactForm");