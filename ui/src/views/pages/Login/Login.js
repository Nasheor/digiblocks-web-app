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
        admin: false,
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
          v => !!v || "Password is required",
          v => (v && v.length <= 7) || "Password must be less than 10 characters"
        ],
      }
    },

    methods: {
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
    }
},
}
