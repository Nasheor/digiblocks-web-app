<template>
  <v-card flat class="pa-2 d-flex" color="#eef5f9">
    <gmap-map
      :center="center"
      :zoom="14"
      style="width:80%;  height: 450px; background-color: pink;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
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