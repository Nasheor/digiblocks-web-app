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
          <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ml-2"
                  min-width="0"
                  color="success"
                  v-on="on"
                  @click="open"
                >
                  Compare
                </v-btn>
              </template>
              <v-card v-if="getCompareDialogStatus" >
                  <CompareView />
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
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <BuildingCard 
                    v-for="building of getBuildingData"
                    :key="building.key"
                    class="ma-3 pa-2"
                    :src="building.image"
                    :name="building.name"
                    :floor_area="building.floor_area"
                    :category="building.category"
                    :hours="building.hours"
                    :latitude="building.latitude"
                    :longitude="building.longitude"
                    :id="building.id"
                    :compare="true"
                    @click.native="setName(building)"
                    outlined
                    tile
                  />              
                </div>
              </template>
              <v-card  >
                  <v-toolbar height="100px" class="an-toolbar-position" dark  color="#f79026">
                      <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ name }}</v-toolbar-title>
                    <v-spacer />

                    <div class="mx-3" />
                    <div>
                        <v-btn
                            class="ml-2"
                            min-width="0"
                            color="error"
                            @click="generateDec"
                            v-if="getDltCertStatus === false && getRole === 'Community Manager'"
                          >
                            <v-icon class="mr-3">mdi-certificate</v-icon>
                            Generate DEC
                        </v-btn>
                        <v-btn
                          class="ml-2"
                          min-width="0"
                          color="error"
                          @click="registerBuilding"
                          v-if="getDltStatus === false && getRole === 'Community Manager'"
                        >
                          <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                          Register Building
                        </v-btn>   
                        <v-btn
                          class="ml-2"
                          min-width="0"
                          color="error"
                          @click="storeDataIOTA"
                          v-if="getRole === 'Community Manager'"
                        >
                          <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                          Store IOTA Data
                        </v-btn> 
                        <div>
                          <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  class="ml-2"
                                  min-width="0"
                                  color="error"
                                  v-on="on"
                                  @click.native="setEditFormStatus"
                                  v-if="getRole === 'Community Manager'"
                                >
                                  <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                                  Edit Building Data
                                </v-btn> 
                              </template>
                              <v-card v-if="getEditFormStatus" >
                                  <EditBuildingForm :building_data="b_card_data"/>
                              </v-card>
                          </v-dialog>
                          <v-dialog v-model="certificate_dialog" persistent max-width="650" transition="dialog-bottom-transition">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  class="ml-2"
                                  min-width="0"
                                  color="error"
                                  v-on="on"
                                  @click.native="certificate_dialog=true"
                                  v-if="getRole === 'Community Manager'"
                                >
                                  <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                                  View Certificate
                                </v-btn> 
                              </template>
                              <v-card v-if="b_card_data.certificate_generated === true" >
                                <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                                    <v-btn icon dark @click="certificate_dialog = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>{{ b_card_data.name }}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green" v-if="getRole==='External Verifier'" @click="verifyCert">Verify</v-btn>
                                  <v-dialog v-model="history" fullscreen hide-overlay transition="dialog-bottom-transition">
                                    <template v-slot:activator="{ on }">
                                      <div
                                        v-on="on"
                                        class="display ml-12"
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
                                            background-color="#f79026"
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
                                                    <template v-else>
                                                        <Registration />
                                                    </template>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs-items>
                                        <v-footer class="d-flex justify-center" padless>
                                            <v-btn align-center dark @click="closeHistory">
                                                Close
                                            </v-btn>
                                        </v-footer>
                                      </v-card>
                                  </v-dialog>
                                </v-toolbar>
                                  <CertificateModal 
                                    :chartData="data.barChart" 
                                    :certificate_keys="certificate_keys"
                                    :building_data="b_card_data"
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
                        </div>  
                    </div>
                  </v-toolbar>
                  <BCard :name="name" :building="b_card_data" />
                <v-dialog v-model="togglePop" persistent max-width="290" class="mt-3">
                  <v-card>
                      <v-card-title class="headline">DEC Generated</v-card-title>
                      <v-card-text>Your Certificate is now available in the Certificate Section</v-card-text>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="success" text @click="generate_dec = false">Close</v-btn>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="toggleBuildingPop" persistent max-width="290">
                  <v-card>
                      <v-card-title class="headline">Building Registered</v-card-title>
                      <v-card-text>The building has been registered to the ledger</v-card-text>
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="success" text @click="register_building = false">Close</v-btn>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

 <script src='./Buildings.js' />
 <style scoped lang="scss" src="./Buildings.scss"></style>