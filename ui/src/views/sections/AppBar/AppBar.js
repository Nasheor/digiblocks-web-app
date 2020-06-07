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
      'Mike John Responded to your email',
      'You have 5 new tasks',
      'You\'re now friends with Andrew',
      'Another Notification',
      'Another one',
    ],
  }),

  computed: {
    ...mapState(['drawer']),
  },

  methods: {
    ...mapMutations({
      setDrawer: 'SET_DRAWER',
    }),
  },
}
