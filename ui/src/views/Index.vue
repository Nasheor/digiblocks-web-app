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
      asset_data: '',
    }),

    methods: {
      getAssetData() {
        return ThingsboardController.getAssets(999)
       
      },
      async refresh() {
        this.assetData = await this.getAssetData()
        this.$store.commit("setAssetData", this.asset_data)
      },
    },
    computed: {
      ...mapGetters(["getPrivilegeStatus"]),
    },
    async mounted() {
      this.asset_data = await this.getAssetData()
      this.$store.commit("setAssetData", this.asset_data)
      // Refresh data every 5 minutes
      setInterval(() => {
        this.refresh()
      }, 300000)
    }
  }
</script>
