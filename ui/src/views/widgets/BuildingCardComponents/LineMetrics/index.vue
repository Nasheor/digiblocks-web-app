<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 accent-2">
      <v-file-input 
          label="Upload Asset KPI File"
          dense
          color="white"
          outlined
          show-size
          v-if="getRole === 'Community Manager' || getRole === 'Building Owner'"
          @change="filePicked">
      </v-file-input>
      <v-dialog 
        v-model="file_processed" 
        max-width="650" hide-overlay 
        transition="dialog-bottom-transition"
        v-if="getRole === 'Community Manager' || getRole === 'Building Owner'"
      >
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
      <div class="d-flex align-center">
        <div class="align-self-center">
          <h1 class=" display-1">
            <i class="ti-pie-chart"></i>
          </h1>
        </div>
        <div class="mx-4">
          <h3 class="card-title title font-weight-regular">Electricity usage</h3>
          <h6 class="card-subtitle op-5 subtitle-2 font-weight-regular">{{timeline.date}}</h6>
        </div>
      </div>
      <v-row class="mt-1">
        <v-col cols="5" class="d-flex align-center">
          <h2 class="font-weight-light  text-nowrap">{{building_data.building_electrical}} kWh</h2>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script src='./LineMetrics.js' />
<style scoped lang="scss" src="./LineMetrics.scss"></style>