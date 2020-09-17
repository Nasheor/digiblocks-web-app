<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="buildings"
        multi-sort
        hide-default-footer
        class="elevation-0 border"
      ></v-data-table>
      <v-row>
        <v-col cols="12" sm="12" lg="12" class="py-0" >
            <v-card outlined color="#21c1d6" class="text-center mb-7">
                <v-card-text>
                    <h4 class="font-weight-light mb-0 display-1">BAND</h4>
                      <div style="width: 90px;margin: 0 auto;" class="mt-3">
                          <h2 font-weight-light text--secondary display-1 mt-4>B1</h2>
                      </div>
                    <div class="pa-2 text-center">
                        <h4 class="mb-0 font-weight-regular">
                        149.1 kWh/m
                        <sup>2</sup>/yr
                        </h4>
                    </div>
                </v-card-text>
                <v-card-text>
                  <h4 class="font-weight-light mb-0 display-1 text-uppercase">
                    Carbon Dioxide emissions indicator</h4>
                  <div class="pa-2 text-center">
                    Annual Co<sub>2</sub> emissions 67 kgCo<sub>2</sub>/m<sup>2</sup>/yr
                  </div>
                </v-card-text>
        </v-card>
      </v-col>
      </v-row>
    <div>
      <v-row class="ml-4">
        <v-col cols="12" sm="12" lg="9">
          <vue-apex-charts
            type="bar"
            height="450"
            :options="chartData.chartOptions"
            :series="chartData.series"
          ></vue-apex-charts>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" sm="6" lg="2">
          <v-card outlined color="#21c1d6">
            <v-card-text>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">Best</div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">
                  <v-chip class="mb-7" small label color="light-green lighten-5 success--text">0</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">
                  <v-chip class="mb-12 mt-5" small label color="deep-purple lighten-5 purple--text">50</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">
                  <v-chip class="mt-12" small label color="yellow lighten-5 warning--text">100</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pb-3">
                <div class="mx-2">
                  <v-chip class="mt-9" small label color="red lighten-5 error--text">150</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">Worst</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
        <v-card-text> <strong>Annual Energy use </strong></v-card-text>
        <v-row class="pa-3">
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">
                    Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 87.35
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 61.75
                </v-card>
            </v-col>
        </v-row>
        <v-card-text><strong>Typical Building of this type</strong></v-card-text>
        <v-row class="pa-3">
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 273.2
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 196
                </v-card>
            </v-col>
        </v-row>
    </div>
    </div>
</template>

<script src="./CommunityModal.js" />
<style lang="scss" scoped src="./CommunityModal.scss" />