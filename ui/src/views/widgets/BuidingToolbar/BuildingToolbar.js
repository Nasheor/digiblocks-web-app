// Components
import { VHover, VListItem } from 'vuetify/lib'

// Utilities
import { mapState, mapMutations } from 'vuex'

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
    notifications: [
      'Notification 1',
      'Notification 2',
      'You\'re now friends with Waylon Smithers',
      'Another Notification',
      'Another one',
    ],
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
  },

  methods: {
    ...mapMutations({
      setDrawer: 'setDrawer',
    }),
  },
  logout () {

  }
}
