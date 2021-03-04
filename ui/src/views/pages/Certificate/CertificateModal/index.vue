<template>
  <v-card class="pt-12">
    <v-row class="pa-4">
        <v-col 
          cols="12" sm="12" lg="4"
          v-for="i of certificate_keys.length"
          :key="i"
        >
            <v-card flat v-if="certificate_keys[i] != 'rating'">
                <v-card-text class="pa-0">
                <div class="">
                    <v-row>
                    <v-col cols="4" sm="4" lg="8">
                        <div class="d-flex align-center">
                        <div class="ml-4">
                            <h1 class="font-weight-light info--text mb-0 display-1">
                              {{ certificate_keys[i] }}
                            </h1>
                        </div>
                        </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="4" sm="4" lg="8" class="text-center border-left">
                        <h1 class="font-weight-light display-1 ml-0">
                          {{building_data[certificate_keys[i]]}}
                        </h1>
                    </v-col>
                    </v-row>
                </div>
                </v-card-text>
            </v-card>
            <v-card v-else color="#21c1d6">
              <v-row class="d-flex justify-center">
                <v-col cols="4" sm="4" lg="7">
                  <v-card-text>
                    <h4 class="font-weight-light mb-0 display-1">
                      {{certificate_keys[i]}}
                    </h4> 
                  </v-card-text>
                </v-col>
                <v-divider certical></v-divider>
                <v-col cols="4" sm="4" lg="5">
                  <h5 class="font-weight-light display-1 mt-4">  {{ building_data["band"]}} </h5>
                </v-col>
              </v-row>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="12" class="py-0">
            <v-card outlined color="#21c1d6" class="text-center mb-7">
                <v-card-text>
                    <h4 class="font-weight-light mb-0 display-1">BAND</h4>
                      <div style="width: 90px;margin: 0 auto;" class="mt-3">
                          <h2 font-weight-light text--secondary display-1 mt-4>{{building_data.band}}</h2>
                      </div>
                    <div class="pa-2 text-center">
                        <h4 class="mb-0 font-weight-regular">
                        {{building_data.building_electrical}} kWh/m
                        <sup>2</sup>/yr
                        </h4>
                    </div>
                </v-card-text>
                <v-card-text>
                  <h4 class="font-weight-light mb-0 display-1 text-uppercase">
                    Carbon Dioxide emissions indicator</h4>
                  <div class="pa-2 text-center">
                    Annual Co<sub>2</sub> emissions {{ building_data.co2_performance}} kgCo<sub>2</sub>/m<sup>2</sup>/yr
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
            height="350"
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
                  <v-chip class="ma-2" small label color="light-green lighten-5 success--text">0</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">
                  <v-chip class="ma-2" small label color="deep-purple lighten-5 purple--text">50</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pt-2 pb-3">
                <div class="mx-2">
                  <v-chip class="ma-2" small label color="yellow lighten-5 warning--text">100</v-chip>
                </div>
              </div>
              <div class="d-flex align-center pb-3">
                <div class="mx-2">
                  <v-chip class="ma-2" small label color="red lighten-5 error--text">150</v-chip>
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
                    Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): {{building_data.annual_non_electrical}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): {{building_data.annual_electrical}}
                </v-card>
            </v-col>
        </v-row>
        <v-card-text><strong>Typical Building of this type</strong></v-card-text>
        <v-row class="pa-3">
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): <br/> {{building_data.building_electrical}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card flat color="#21c1d6" height="50px" class="pa-3">                    
                  Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): {{building_data.building_non_electrical}}
                </v-card>
            </v-col>
        </v-row>
    </div>
  </v-card>
</template>

<script src="./CertificateModal.js" />
<style scoped lang="scss" src="./CertificateModal.scss" />