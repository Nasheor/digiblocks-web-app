import 'particles.js'
import { mapGetters } from 'vuex'

export default {
    data () {
      return {
        loading: false,
        userEmail: 'admin@yopmail.com',
        password: 'admin@123',
        hidePassword: true,
        error: false,
        showResult: false,
        result: '',
        checkbox: '',
        show1: false,
        role: '',
        valid: true,
        user_category: ["Building Owner", "Community Manager", "External Verifier"],
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
          v => !!v || "Password is required",
          v => (v && v.length <= 10) || "Password must be less than 10 characters"
        ],
      }
    },
    computed: {
      ...mapGetters({
          login_status: 'getLoginStatus'
      }),
      ...mapGetters({
        building_data: "getBuildingData"
      }),
      ...mapGetters([
       "getRole",
      ]),
    },
    methods: {
      initParticles () {
        /* eslint-disable */
        window.particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 5000,
              "density": {
                "enable": true,
                "value_area": 10000 // Denser the smaller the number.
              }
            },
            "color": { // The color for every node, not the connecting lines.
              "value": "#01579b" // Or use an array of colors like ["#9b0000", "#001378", "#0b521f"]
            },
            "shape": {
                "type": "circle", // Can show circle, edge (a square), triangle, polygon, star, img, or an array of multiple.
                "stroke": { // The border
                  "width": 1,
                  "color": "#145ea8"
                },
                "polygon": { // if the shape is a polygon
                  "nb_sides": 4
                },
            },
            "opacity": {
              "value": 0.7,
              "random": true
            },
            "size": {
              "value": 10,
              "random": true
            },
            "line_linked": {
              "enable": true,
              "distance": 200, // The radius before a line is added, the lower the number the more lines.
              "color": "#007ecc",
              "opacity": 0.5,
              "width": 2
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "bottom-left", // Move them off the canvas, either "none", "top", "right", "bottom", "left", "top-right", "bottom-right" et cetera...
              "random": true,
              "straight": true, // Whether they'll shift left and right while moving.
              "out_mode": "bounce", // What it'll do when it reaches the end of the canvas, either "out" or "bounce".
              "bounce": false,
              "attract": { // Make them start to clump together while moving.
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          }
        })
      },
      login () {
        if (!this.userEmail || !this.password) {
          this.result = "Email and Password can't be null."
          this.showResult = true
          return
        }
        
        let payload = {
          "email": this.userEmail,
          "password": this.password,
        }
        this.$store.commit("setEmail", this.userEmail)
        if(this.building_data.length === 0)        
          this.$store.dispatch("LOAD_CUSTOMER_DETAILS", payload ).then(r => {
            if (this.login_status == true  && this.getRole != "External Verifier")
              this.$router.push({name: 'Home'})
          
            else if(this.login_status == true && this.getRole === "External Verifier")
              this.$router.push({name: "Verify Certificate"})
          })       
          
        else {

          let tmp = localStorage.getItem("login")
          if(tmp === false) {
            alert("Invalid Credentials. Try Again")
          }
          // alert("Invalid Credentials. Try Again")
          this.result = "Email and Password can't be null."
          this.showResult = true
          return
        }

    },
    register() {
      this.$router.push({name: 'Register'});
    },
    openWebsite() {
      let win = window.open("http://www.nimbus.cit.ie/digiblocks/index.html", '_blank')
      win.focus()
    }
  },
  mounted() {
    this.initParticles();
  },
}
