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
        rules: {
          required: value => !!value || 'Required.',
        },
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
          vm.$router.push({ name: 'Dashboard' })
        } else {
          vm.error = true
          vm.result = 'Email or Password is incorrect.'
          vm.showResult = true
        }
    },
},
}
