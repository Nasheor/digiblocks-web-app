import Tabular from './Tabular/index';
import Graphical from './Graphical/index';

export default {
    components: {
        Tabular,
        Graphical, 
    },
    data() {
        return {
            tab: null,
            views: [
                {
                    'name': 'tabular',
                    'icon': 'mdi-newspaper'
                }, 
                {
                    'name': 'graphical',
                    'icon': 'mdi-chart-bar'
                }
            ], 
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        };
    },
    methods: {
        close() {
            this.$store.commit("statusCompareDialog", false);
            location.reload();
        },
    },
}