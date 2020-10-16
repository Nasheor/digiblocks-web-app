<template>
  <v-app >
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
    }),
  }
</script>
