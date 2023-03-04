
const SingleFileComponent = {
    template: `
      <div>
       <h1>mqtt-vue-contact-form</h1>
       <p>{{ message }}</p>
       <input-text></input-text>
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
        console.log(this.message) // 0
      }
  } 

Vue.createApp({
    components: { SingleFileComponent },
    data() {
      return {
        display: "Salut Lume",
        timestamp: `Timestamp ${new Date().toLocaleString()}`,
        todos: [
          { text: "Learn JavaScript" },
          { text: "Learn Vue" },
          { text: "Build something awesome" },
          { text: "This is getting better and better" },
        ],
      };
    },
  }).mount("#app");