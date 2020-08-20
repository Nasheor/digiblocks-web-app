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
                  <!-- <v-icon>mdi-logout</v-icon> -->
                  Compare
                </v-btn>
              </template>
              <v-card v-if="getCompareDialogStatus" >
                  <CompareView />
              </v-card>
          </v-dialog>
          <v-dialog v-model="add_building_status" max-width="700px" persistent transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ml-2"
                  min-width="0"
                  dark
                  v-on="on"
                >
                  <!-- <v-icon>mdi-logout</v-icon> -->
                  <v-icon>mdi-table-plus</v-icon>
                </v-btn>
              </template>
              <v-card v-if="add_building_status">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-title>
                    <span class="headline">New Building</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            label="Building Name"
                            :rules="fnameRules"
                            v-model="building_name"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="tel"
                            label="Contact Number"
                            :rules="contactRules"
                            :counter="10"
                            v-model="phone"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            label="Band"
                            :rules="bandRules"
                            v-model="band"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" lg="6">
                          <v-text-field
                            type="number"
                            label="Rating"
                            v-model="rating"
                            :rules="ratingRules"
                            :counter="5"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="Address"
                            rows="3"
                            :rules="addressRules"
                            :counter="300"
                            v-model="address"
                            outlined
                            required
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="add_building_status = false">Close</v-btn>
                    <v-btn color="success" @click="addBuilding">Save</v-btn>
                  </v-card-actions>
                </v-form>
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
                    v-for="building of getBuildings"
                    :key="building.src"
                    class="ma-3 pa-2"
                    :src="building.src"
                    :name="building.name"
                    :compare="true"
                    @click.native="name=building.name"
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
                  </v-toolbar>
                  <BCard />
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

 <script src='./Buildings.js' />
 <style scoped lang="scss" src="./Buildings.scss"></style>