// Utilities
import {
mapState,
} from 'vuex'

export default {
name: 'DashboardCoreDrawer',

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
        },
        {
            icon: 'mdi-hospital-building',
            title: 'Buildings',
            to: '/buildings',
        },
        {
            title: 'Certificate',
            icon: 'mdi-format-font',
            to: '/certificate',
        },
    ],
}),

computed: {
    ...mapState(['barColor', 'barImage']),
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
