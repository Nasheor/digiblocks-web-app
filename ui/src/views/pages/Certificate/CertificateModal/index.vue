<template>
  <v-card>
    <v-row class="pa-4">
        <v-col cols="12" sm="12" lg="4">
            <v-card color="#eeeeee" outlined >
                <v-card-text >
                    <v-list color="#eeeeee" dense max-height="290">
                      <v-list-item
                        v-for="(item, i) in data"
                        :key="i"
                      >
                        <v-list-item-content  v-if="i < 3">
                          <v-list-item-title>
                            <strong> {{keys[i]}} </strong> 
                          </v-list-item-title> 
                          <v-list-item-subtitle>
                            {{data[i]}}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>                      
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <v-card color="#eeeeee" outlined >
                <v-card-text class="pt-0" >
                    <v-list 
                        v-for="(item, i) in data"
                        :key="i"                    
                        dense
                        class="pt-0"
                        color="#eeeeee"
                    >
                      <v-list-item
                        v-if="i > 3 && i < 7"
                      >
                        <v-list-item-content class="mt-0" >
                          <v-list-item-title>
                            <strong> {{keys[i]}} </strong> 
                          </v-list-item-title> 
                          <v-list-item-subtitle class="text-wrap">
                            {{data[i]}}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>                      
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <v-card color="#eeeeee" outlined>
                <v-card-text class="pt-0" >
                    <v-list 
                        v-for="(item, i) in data"
                        :key="i"                    
                        dense
                        class="pt-0"
                        color="#eeeeee"
                    >
                      <v-list-item
                        v-if="i > 6"
                      >
                        <v-list-item-content class="mt-0" >
                          <v-list-item-title>
                            <strong> {{keys[i]}} </strong> 
                          </v-list-item-title> 
                          <v-list-item-subtitle class="text-wrap">
                            {{data[i]}}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>                      
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" sm="12" lg="12" class="py-0">
            <v-card outlined color="#eeeeee" class="text-center mb-7">
                <v-card-text class="pa-5">
                    <h3 class="font-weight-regular">Band</h3>
                    <div class="mt-3">
                    <div style="width: 90px;margin: 0 auto;">
                        <h2>B1</h2>
                    </div>
                    </div>
                </v-card-text>
                <div class="pa-2 text-center">
                    <h4 class="mb-0 font-weight-regular">
                    149.1 kWh/m
                    <sup>2</sup>/yr
                    </h4>
                </div>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col cols="12" sm="12" lg="7">
          <vue-apex-charts
            type="bar"
            height="350"
            :options="chartData.chartOptions"
            :series="chartData.series"
          ></vue-apex-charts>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" sm="6" lg="2">
          <v-card outlined color="#eeeeee">
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
        <v-col cols="12" sm="6" lg="2">
          <v-card outlined dark class="mb-2 pa-4" min-width="100">
            Carbon Dioxide (Co
            <sub>2</sub>) emissions indicator
          </v-card>
          <v-card outlined class="pa-4" min-width="100" color="#eeeeee">
            Annual Co<sub>2</sub> emissions 30.11 kgCo<sub>2</sub>/m<sup>2</sup>/yr
            <br />31.76
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
        <v-card-text> <strong>Annual Energy use </strong></v-card-text>
        <v-row>
            <v-col cols="12" sm="12" lg="6">
                <v-card color="#eeeeee">
                    Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 87.35
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card color="#eeeeee">
                    Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 61.75
                </v-card>
            </v-col>
        </v-row>
        <v-card-text><strong>Typical Building of this type</strong></v-card-text>
        <v-row>
            <v-col cols="12" sm="12" lg="6">
                <v-card color="#eeeeee">
                    Non Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 273.2
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" lg="6">
                <v-card color="#eeeeee">
                    Electrical(kWh/m<sup>2</sup>/yr<sup>2</sup>): 196
                </v-card>
            </v-col>
        </v-row>
    </div>
  </v-card>
</template>

<script src="./CertificateModal.js" />
<style scoped lang="scss" src="./CertificateModal.scss" />