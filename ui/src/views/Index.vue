<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppBar from './sections/AppBar/index'
  import Drawer from './sections/Drawer/index'
  import Settings from './sections/Settings/index'
  import View from './sections/View/index'
  import ThingsboardController from './controller/thingsboardController'

  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: AppBar,
      DashboardCoreDrawer: Drawer,
      DashboardCoreSettings: Settings,
      DashboardCoreView: View,
    },

    data: () => ({
      expandOnHover: false,
      assetData: '',
      devices: '',
    }),

    methods: {
      getAssets() {
        return ThingsboardController.getTenantAssets(30);
      },
      async refresh() {
        this.assetData = await this.getAssets();
      },
    },
    computed: {
      ...mapGetters(["getPrivilegeStatus"]),
    },
    async mounted() {
      const newAssets = await this.getAssets();
      this.assetData = newAssets; 
      // Refresh data every 5 minutes
      setInterval(() => {
        this.refresh();
      }, 300000);
    }
  }
</script>
