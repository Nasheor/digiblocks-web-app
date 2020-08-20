// Utilities
import {
    mapState,
    mapGetters,
} from 'vuex'

export default {

    props: {
        expandOnHover: {
        type: Boolean,
        default: false,
        },
    },

    data: () => ({
        items: [
            {
                icon: 'mdi-view-dashboard',
                title: 'dashboard',
                to: '/dashboard',
                isAdmin: false,
            },
            {
                icon: 'mdi-hospital-building',
                title: 'Cork Institute of Technology',
                to: '/buildings',
                isAdmin: false,
            },
            {
                title: 'Certificate',
                icon: 'mdi-format-font',
                to: '/certificate',
                isAdmin: false,
            },
            {
                title: 'All Assets',
                icon: 'mdi-android-debug-bridge',
                to: '/',
                isAdmin: true,
            }
        ],
    }),

    computed: {
        ...mapState(['barColor', 'barImage']),
        ...mapGetters(['getPrivilegeStatus']),
        drawer: {
            get () {
                return this.$store.state.drawer
            },
            set (val) {
                this.$store.commit('setDrawer', val)
            },
        },
        computedItems () {
            return this.items.map(this.mapItem)
        },
        profile () {
            return {
                avatar: true,
                title: this.$t('avatar'),
            }
        },
    },

    methods: {
        mapItem (item) {
            return {
                ...item,
                children: item.children ? item.children.map(this.mapItem) : undefined,
                title: this.$t(item.title),
            }
        },
    },
}
