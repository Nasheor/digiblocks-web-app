<template>
  <v-card flat class="pa-2 d-flex" color="#eef5f9">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 430px; width: 100%"
      class="mt-4 overlay"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker 
        v-for="marker of building_data"
        :key="marker.name"
        :lat-lng="marker.coordinates"

      >
        <l-tooltip :content="marker.name+ ' BER: '+Math.round(marker.ber)"></l-tooltip>
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
              v-for="item of building_data"
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
                <v-chip class="ma-2" color="#5fd47f" small label>{{Math.round(item.ber) }}</v-chip>
              </td>
              <td>
                <h5 class="font-weight-light subtitle-2">{{ Math.round(item.annual_electrical)}}</h5>
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