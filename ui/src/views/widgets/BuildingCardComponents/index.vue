<template>
  <v-card class="pa-2">
    <v-spacer />
      <v-row class="mt-10">
        <!-- <v-col cols="4" sm="12"  class="mt-12">
          <v-card-text class="format mt-5">
            <v-file-input 
                label="Telemetry File"
                dense
                outlined
                show-size
                @change="filePicked">
            </v-file-input>
            <v-dialog v-model="file_processed" max-width="650" hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <div
                v-on="on"
                class="display ml-12"
                >                        
                    <v-btn 
                    color="green"  
                    @click.native="submit"
                    v-on="on"
                    >
                    Submit
                    </v-btn>
            </div>
            </template>
                <v-card v-if="getFileStatus">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-subheader v-text="'Select Data to Upload'"></v-subheader>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                            v-model="selected_column.column_id"
                            :items="getFileColumns"
                            :menu-props="{ maxHeight: '400' }"
                            label="Select"
                            persistent-hint
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-subheader v-text="'Type of Data'"></v-subheader>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                            v-model="selected_column.type"
                            :items="energy_type"
                            :menu-props="{ maxHeight: '400' }"
                            label="Select"
                            persistent-hint
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-subheader v-text="'Select Timestamp'"></v-subheader>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                            v-model="selected_column.timestamp"
                            :items="getTimestamp"
                            :menu-props="{ maxHeight: '400' }"
                            label="Select"
                            persistent-hint
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-subheader v-text="'Select Device'"></v-subheader>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                              v-model="selected_column.device"
                              :items="devices"
                              :menu-props="{ maxHeight: '400' }"
                              label="Select"
                              persistent-hint
                            ></v-select>
                        </v-col>
                    </v-row>
                <v-footer class="d-flex justify-center" padless>
                    <v-btn align-center color="success" @click="upload">
                        Upload
                    </v-btn>
                    <v-btn class="ml-2" dark @click="close">
                        Close
                    </v-btn>
                </v-footer>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-col> -->
        <v-col class="mt-12" cols="4" sm="12" v-if="getDltStatus===false">
          <v-chip class="mr-2" color="red lighten-3" text-color="gray">
             <h4> Register Building to the Ledger </h4>
            <v-btn
              class="ml-2"
              min-width="0"
              color="deep-purple"
              text
              @click="registerBuilding"
              v-if="getDltStatus === false && getRole === 'Community Manager' || getRole === 'Building Owner'"
            >
              <!-- <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon> -->
              Register Building
            </v-btn> 
          </v-chip>
        </v-col>
        <v-col class="mt-12" cols="4" sm="12" v-else>
          <v-chip class="mr-2" color="green lighten-3" text-color="gray">
             <h4> Building already registered to the ledger </h4>
          </v-chip>
        </v-col>
        <v-col cols="12" sm="12">
          <TimeSeries :building_data="getBuilding"/>
        </v-col>
        <!-- <v-col cols="12" lg="7">
          <BarGraph :building_data="getBuilding"/>
        </v-col> -->
        <v-col cols="12" lg="5">
          <LineMetrics :building_data="getBuilding"/>
          <!-- <BarMetrics :building_data="getBuilding"/> -->
        </v-col>
        <v-col cols="12" sm="12" lg="8">
          <Timeline :building_data="getBuilding"/>
        </v-col>
        <v-col cols="12" lg="4">
          <Profile :building_data="getBuilding"/>
        </v-col>
      </v-row>
  </v-card>
</template>

 <script src='./BuildingCardComponents.js' />
 <style scoped lang="scss" src="./BuildingCardComponents.scss"></style>