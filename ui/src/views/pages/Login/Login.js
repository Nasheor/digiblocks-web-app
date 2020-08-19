export default {
    data () {
      return {
        loading: false,
        userEmail: 'admin@yopmail.com',
        password: '123456',
        hidePassword: true,
        error: false,
        showResult: false,
        result: '',
        checkbox: '',
        show1: false,
        admin: false,
        valid: true,
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

    methods: {
      initParticlesJS () {
        /* eslint-disable */
        particlesJS('particles-js', {
          'particles': {
            'number': {
              'value': 80,
              'density': {
                'enable': true,
                'value_area': 800
              }
            },
            'color': {
              'value': '#ffffff'
            },
            'shape': {
              'type': 'circle',
              'stroke': {
                'width': 0,
                'color': '#000000'
              },
              'polygon': {
                'nb_sides': 5
              },
              'image': {
                'src': 'img/github.svg',
                'width': 100,
                'height': 100
              }
            },
            'opacity': {
              'value': 0.5,
              'random': false,
              'anim': {
                'enable': false,
                'speed': 1,
                'opacity_min': 0.1,
                'sync': false
              }
            },
            'size': {
              'value': 10,
              'random': true,
              'anim': {
                'enable': false,
                'speed': 80,
                'size_min': 0.1,
                'sync': false
              }
            },
            'line_linked': {
              'enable': true,
              'distance': 300,
              'color': '#ffffff',
              'opacity': 0.4,
              'width': 2
            },
            'move': {
              'enable': true,
              'speed': 12,
              'direction': 'none',
              'random': false,
              'straight': false,
              'out_mode': 'out',
              'bounce': false,
              'attract': {
                'enable': false,
                'rotateX': 600,
                'rotateY': 1200
              }
            }
          },
          'interactivity': {
            'detect_on': 'canvas',
            'events': {
              'onhover': {
                'enable': false,
                'mode': 'repulse'
              },
              'onclick': {
                'enable': true,
                'mode': 'push'
              },
              'resize': true
            },
            'modes': {
              'grab': {
                'distance': 800,
                'line_linked': {
                  'opacity': 1
                }
              },
              'bubble': {
                'distance': 800,
                'size': 80,
                'duration': 2,
                'opacity': 0.8,
                'speed': 3
              },
              'repulse': {
                'distance': 400,
                'duration': 0.4
              },
              'push': {
                'particles_nb': 4
              },
              'remove': {
                'particles_nb': 2
              }
            }
          },
          'retina_detect': true
        })
      },
      login () {
        const vm = this

        if (!this.userEmail || !this.password) {
          vm.result = "Email and Password can't be null."
          vm.showResult = true
          return
        }
        if (vm.userEmail === "admin@yopmail.com"&& vm.password === "123456") {
          this.$store.commit("setPrivileges", this.admin);
          vm.$router.push({ name: 'Dashboard' })
        } else {
          vm.error = true
          vm.result = 'Email or Password is incorrect.'
          vm.showResult = true
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
    // require('particles.js')
    // this.$nextTick(() => {
    //   this.initParticlesJS()
    // })
  }
}
