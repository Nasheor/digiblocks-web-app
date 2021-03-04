<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <v-tabs v-model="tab" color="info">
        <v-tab :key="activity" class="text-capitalize font-weight-light subtitle-1">
          <v-icon class="d-block d-md-none">mdi-access-point</v-icon>
          <span class="d-none d-md-block">Activity</span>
        </v-tab>
        <!-- <v-tab :key="settings" class="text-capitalize font-weight-light subtitle-1">
          <v-icon class="d-block d-md-none">mdi-cog</v-icon>
          <span class="d-none d-md-block">Settings</span>
        </v-tab> -->
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Activity Tabs -->
        <v-tab-item :key="activity">
          <v-card flat>
            <v-card-text>
              <v-timeline :reverse="reverse" dense>
                <v-expansion-panels popout>
                <v-timeline-item 
                    v-for="(transaction, index) of transaction_data"
                    :key="index"
                    :icon="icons[index]"
                    class="align-start" 
                    large
                >
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      {{transaction.Timestamp}}
                    </v-card-title>
                      <v-expansion-panel
                          v-for="(item,i) in 1"
                          :key="i"
                      >
                          <v-expansion-panel-header>{{transaction.TxId}}</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-toolbar
                              dense
                              elevation="0"
                              class="toolbar-position"
                            >
                                <v-spacer />
                                <v-dialog v-model="meta_status" persistent max-width="650" transition="dialog-bottom-transition">
                                    <template v-slot:activator="{ on }">
                                      <v-btn
                                        class="mb-10"
                                        min-width="0"
                                        color="success"
                                        v-on="on"
                                        @click.native="meta_status = true"
                                      >
                                         Meta Data
                                      </v-btn>
                                    </template>
                                    <v-card v-if="meta_status" >
                                        <v-toolbar height="100px" class="an-toolbar-position" dark  color="#f79026">
                                            <v-btn icon dark @click.native="meta_status=false">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                            <v-toolbar-title>DEC Calculation Data</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card>
                                          <v-list flat>
                                              <v-list-item-group color="info">
                                                  <v-list-item
                                                  v-for="(item, i) in meta_data"
                                                  :key="i"
                                                  >
                                                    <v-card-text>
                                                      <strong>{{ item.key}}: </strong> {{item.value}}
                                                    </v-card-text>

                                                    <v-list-item-content>
                                                        <v-list-item-title> {{ item.value }}</v-list-item-title>
                                                    </v-list-item-content>
                                                  </v-list-item>
                                              </v-list-item-group>
                                              </v-list>
                                        </v-card> 
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                            <v-row>
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150" class="mb-2">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Building Category</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        > {{ transaction.Value.BuildingCategory }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col> 
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Energy Consumption</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        > {{ transaction.Value.EnergyConsumption }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Floor Area</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        >  {{ transaction.Value.FloorArea }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col> 
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Grade</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        >  {{ transaction.Value.Grade }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Hours of Occupancy</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        >   {{ transaction.Value.HoursOfOccupancy }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col> 
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Meter Start Date</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        >   {{ transaction.Value.MeterStartDate }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col> 
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Meter End Date</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        > {{ transaction.Value.MetereEndDate }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col>   
                              <v-col cols="12" sm="6" lg="3" class="py-0">
                                <v-card height="150">
                                  <v-card-text>
                                    <v-row class="d-flex align-center">
                                      <v-col cols="6">
                                        <h2 class="font-weight-light headline">Status</h2>
                                        <h5
                                          class="subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                                        >{{ transaction.Value.status }}</h5>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col>                                         
                            </v-row>
                          </v-expansion-panel-content>
                      </v-expansion-panel>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                </v-expansion-panels>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script src='./Dec.js' />
<style scoped lang="scss" src="./Dec.scss"></style>