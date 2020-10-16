// Components
import { VHover, VListItem } from 'vuetify/lib'

// Utilities
import { mapState, mapMutations, mapGetters } from 'vuex'


export default {
  name: 'DashboardCoreAppBar',

  components: {
    AppBarItem: {
      render (h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(VListItem, {
                attrs: this.$attrs,
                class: {
                  'black--text': !hover,
                  'white--text secondary elevation-12': hover,
                },
                props: {
                  activeClass: '',
                  dark: hover,
                  link: true,
                  ...this.$attrs,
                },
              }, this.$slots.default)
            },
          },
        })
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: [],
    items: [
      {
        icon: 'mdi-account',
        href: '#',
        title: 'Profile',
        click: (e) => {
        },
      },
    ],
  }),

  computed: {
    ...mapState(['drawer']),
    ...mapGetters({building_data: "getBuildingData"}),
    ...mapGetters({dashboard_data: "getDashboardData"})
  },

  methods: {
    ...mapMutations({
      setDrawer: 'setDrawer',
    }),
    populateActivity() {
      this.building_data.map(building => {
          this.notifications.push(Object.assign({}, {"name": building.name, 
                                  "image": building.image
                                  }, building.activity[0]))
      })
      console.log(this.notifications)
    },
    href() {
      return undefined;
    },
    logout(){
      this.$store.commit("clearData")
      window.location.reload(1)
    }
  },
  created() {
    this.populateActivity()
  }
}
