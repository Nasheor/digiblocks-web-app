<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5 deep-purple accent-2">
      <div class="d-flex align-center">
        <div class="align-self-center">
          <h1 class="white--text display-1">
            <i class="ti-pie-chart"></i>
          </h1>
        </div>
        <div class="mx-4">
          <h3 class="card-title white--text title font-weight-regular">Electricity usage</h3>
          <h6 class="card-subtitle white--text op-5 subtitle-2 font-weight-regular">{{building_data.expiry}}</h6>
        </div>
      </div>
      <v-row class="mt-1">
        <v-col cols="5" class="d-flex align-center">
          <h2 class="font-weight-light white--text text-nowrap">{{building_data.building_electrical}} kWh</h2>
        </v-col>
        <v-col cols="7">
          <div class="float-right" v-show="elementVisible">
            <vue-apex-charts
              type="line"
              height="70px"
              width="150px"
              :options="BandwidthChart.BandwidthChart.chartOptions"
              :series="BandwidthChart.BandwidthChart.series"
            ></vue-apex-charts>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script src='./LineMetrics.js' />
<style scoped lang="scss" src="./LineMetrics.scss"></style>