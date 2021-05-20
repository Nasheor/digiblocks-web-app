<template>
  <v-card>
    <v-card-text class="pa-7">
      <div class="d-flex justify-center mt-3">
        <div class="text-center">
          <img
            src="../../../../assets/images/cit.jpg"
            alt="user"
            width="150px"
            class="img-fluid rounded-circle shadow-sm"
          />
          <h4 class="mt-2 title font-weight-regular">Bishopstown Campus</h4>
          <h6 class="subtitle-2 font-weight-light">Cork Institute of Technology</h6>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="py-5">
        <small class="blue-grey--text text--lighten-2">Email address</small>
        <h6 class="body-2">cit@gmail.com</h6>
        <small class="blue-grey--text text--lighten-2 pt-4 d-block">Address</small>
        <h6 class="body-2">Bishopstown, Cork</h6>
      </div>
      <!-- <div class="map-box">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                data-projection="EPSG:4326" style="height: 430px" class="mt-4">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-feature>
            <vl-geom-point  :coordinates="building_data.coordinates"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon  :src="require('@/assets/images/marker.png')" :scale="0.12"></vl-style-icon>
            </vl-style-box>        
          </vl-feature>
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
        </vl-map>
      </div> -->
      <!-- <small class="blue-grey--text text--lighten-2 py-4 d-block">Social Profile</small>

      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue darken-4">
        <i class="fab fa-facebook-f" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue accent-3">
        <i class="fab fa-twitter" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="red darken-3">
        <i class="fab fa-youtube" dark></i>
      </v-btn> -->
    </v-card-text>
  </v-card>
</template>

<script src='./Profile.js' />
<style scoped lang="scss" src="./Profile.scss"></style>