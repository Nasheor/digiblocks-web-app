export default {
    data() {
        return {
            password: "",
            show1: false,
            passwordRules: [
              v => !!v || "Password is required",
              v => (v && v.length <= 10) || "Password must be less than 10 characters"
            ],
            email: "",
            emailRules: [
              v => !!v || "E-mail is required",
              v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            checkbox: false,
            fname: "",
            fnameRules: [
              v => !!v || "Name is required",
              v => (v && v.length <= 10) || "Name must be less than 10 characters"
            ]
        };
    },
    methods: {
        goToLogin() {
            this.$router.push({name: 'Login'});
        },
        submit() {
            this.$refs.form.validate();
            if (this.$refs.form.validate(true)) {
              this.$router.push({ path: "/pages/fulllogin" });
            }
          },
          openWebsite() {
            let win = window.open("http://www.nimbus.cit.ie/digiblocks/index.html", '_blank')
            win.focus()
          }
    }
}
