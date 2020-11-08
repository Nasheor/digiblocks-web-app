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
        title: localStorage.getItem("title"),
        items: [
            {
                icon: 'mdi-view-dashboard',
                title: 'dashboard',
                to: '/dashboard',
                role: ["Community Manager"],
                display: false,
            },
            {
                icon: 'mdi-hospital-building',
                title: 'Cork Institute of Technology',
                to: '/buildings',
                role: ["Community Manager", "External Verifier"],
                display: false,
            },
            {
                title: 'Certificate',
                icon: 'mdi-format-font',
                to: '/certificate',
                role: ["Community Manager", "External Verifier"],
                display: false,
            },
            {
                title: 'Verify Certificate',
                icon: 'mdi-android-debug-bridge',
                to: '/verify_certificate',
                role: ["External Verifier"],
                display: false,
            },
            {
                title: 'Transactions',
                icon: 'mdi-sort',
                to: '/transactions',
                role: ["Community Manager", "External Verifier"],
                display: false,            
            },
        ],
    }),

    computed: {
        ...mapState(['barColor', 'barImage']),
        ...mapGetters(["getRole"]),
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

    created() {
        this.items.map(item => {
            item.role.map(r => {
                if (r === this.getRole) {
                    item.display = true
                } 
            })
        })
    }
}
