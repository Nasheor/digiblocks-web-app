<template>
    <v-container fluid dark class="mx-auto mt-0"> 
      <v-toolbar
        dense
        elevation="0"
        class="toolbar-position"
      >
        <v-spacer />

        <div class="mx-3" />
        <div>
          <v-dialog v-model="community_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  min-width="0"
                  color="success"
                  v-on="on"
                  @click="open"
                >
                  Community View
                </v-btn>
              </template>
              <v-card v-if="community_dialog">
                  <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                      <v-btn icon dark @click="community_dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Community Energy Certificate</v-toolbar-title>
                  </v-toolbar>
                  <CommunityModal v-bind:chartData="data.barChart" />
              </v-card>
          </v-dialog>          
        </div>
      </v-toolbar>  
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
          <v-dialog v-model="dialog" persistent max-width="650" transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <BuildingCard 
                    v-for="building of building_data"
                    :key="building.src"
                    class="ma-3 pa-2"
                    :src="building.image"
                    :name="building.name"
                    @click.native="setData(building)"
                    outlined
                    tile
                  />                    
                </div>
              </template>
              <v-card v-if="getSelectedBuilding.certificate_generated === true" >
                <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ selected_building.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="green" v-if="role==='External Verifier'" class="ml-3" @click="verifyCert">Verify</v-btn>
                  <v-dialog v-model="history" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on }">
                      <div
                        v-on="on"
                        class="display ml-3"
                      >                        
                          <v-btn 
                            color="green"  
                            @click.native="openCertHistory"
                            v-on="on"
                          >
                            History
                          </v-btn>
                    </div>
                    </template>
                      <v-card v-if="getHistoryStatus">
                        <v-tabs
                            v-model="tab"
                            dark
                            centered
                            center-active
                            icons-and-text
                        >
                            <v-tabs-slider></v-tabs-slider>
                            <v-tab
                                v-for="view in views"
                                :key="view.name"
                            >
                                {{view.name}}
                                <v-icon>{{view.icon}}</v-icon>
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item
                                v-for="view in views"
                                :key="view.name"
                            >
                                <v-card flat>
                                    <template v-if="tab===0">
                                        <Dec/>
                                    </template>
                                    <!-- <template v-else>
                                        <Registration />
                                    </template> -->
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                        <v-footer class="d-flex justify-center" padless>
                            <v-btn align-center dark @click="close">
                                Close
                            </v-btn>
                        </v-footer>
                      </v-card>
                  </v-dialog>
                </v-toolbar>
                  <CertificateModal 
                    :chartData="data.barChart" 
                    :certificate_keys="certificate_keys"
                    :building_data="selected_building"
                  />
              </v-card>
              <v-card v-else>
                <v-card-title class="headline">Certificate Not Generated</v-card-title>
                <v-card-text>
                  Generate Certificate before access! 
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

<script src="./Certificate.js" />
<style lang="scss" scoped src="./Certificate.scss" />