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
                  <v-toolbar class="an-toolbar-position" dark  color="#f79026">
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
                          >
                            <v-icon class="mr-3">mdi-certificate</v-icon>
                            Generate DEC
                        </v-btn>
                        <v-btn
                          class="ml-2"
                          min-width="0"
                          color="error"
                          @click="registerBuilding"
                          v-if="getDltStatus === false"
                        >
                          <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                          Register Building
                        </v-btn>   
                    </div>
                  </v-toolbar>
                  <BCard :name="name" :building="b_card_data" />
                <v-dialog v-model="togglePop" persistent max-width="290">
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