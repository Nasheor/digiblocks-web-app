<template>
  <v-card class="mb-7">
    <gmap-map
      :center="center"
      :zoom="14"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </v-card>
</template>

<script src='./CampusMap.js' />
<style scoped lang="scss" src="./CampusMap.scss"></style>