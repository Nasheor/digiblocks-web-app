<template>
  <v-app-bar
    id="app-bar"
    app
    flat
    height="75"
    hide-on-scroll
    fixed
  >
    <v-spacer />

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

 <script src='./BuildingToolbar.js' />
 <style scoped lang="scss" src="./BuildingToolbar.scss"></style>
