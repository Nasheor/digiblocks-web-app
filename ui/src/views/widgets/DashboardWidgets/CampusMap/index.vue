<template>
  <v-card flat class="pa-2 d-flex" color="#eef5f9">
    <!-- <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 430px" class="mt-4">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-layer-tile>
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      
      <vl-feature>
        <vl-geom-multi-point  :coordinates="markers"></vl-geom-multi-point>
        <vl-style-box v-for="marker of markers" :key="marker[0]">
          <vl-style-icon  :src="require('../../../../assets/images/marker.png')" :scale="0.12"></vl-style-icon>
        </vl-style-box>        
      </vl-feature>
    </vl-map> -->
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 430px; width: 100%"
      class="mt-4"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker 
        v-for="marker of markers"
        :key="marker.key"
        :lat-lng="marker"
      >
      </l-marker>
    </l-map>
    <v-card-text>
      <v-simple-table class="month-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="font-weight-regular subtitle-2"
                  v-for="header of headers"
                  :key="header"
              >{{header}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in campus_data"
              :key="item.text"
              class="month-item"
            >
              <td>
                <div class="d-flex align-center">
                  <img
                    :src="require('@/assets/images/'+ item.image)"
                    alt="user"
                    class="rounded-circle"
                    width="35"
                    height="35"
                  />
                  <div class="mx-4">
                    <h4 class="font-weight-medium text-no-wrap">{{ item.name }}</h4>
                    <h6
                      class="blue-grey--text text-no-wrap text--lighten-2 font-weight-regular caption"
                    >{{ item.category }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <v-chip class="ma-2" :color="item.color" small label>{{ item.band }}</v-chip>
              </td>
              <td>
                <h5 class="font-weight-light subtitle-2">{{ item.money }}</h5>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script src='./CampusMap.js' />
<style scoped lang="scss" src="./CampusMap.scss"></style>