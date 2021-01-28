<template>
<v-card>
   <v-card-text class="pa-5 border-bottom">
      <h1 class="blue-grey--text text--darken-2 display-3">{{building_data.name}}</h1>
      <v-row>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Building Address</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="address"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Building Category</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="category"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>DEC Category</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="dec_category"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Devices</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="devices"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Environment</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="environment"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Main Fuel</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="fuel"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" class="d-flex align-center">
              <label>Total Floor Area</label>
            </v-col>
            <v-col cols="12" sm="9">
              <v-text-field
                filled
                background-color="transparent"
                v-model="floor_area"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="pa-5 text-right">
      <v-btn color="success" class="text-capitalize mr-2" @click="saveFormDetails">Save</v-btn>
      <v-btn color="black" class="text-capitalize" @click="closeEditForm" dark>Cancel</v-btn>
    </div>    
</v-card>
</template>

 <script src='./EditBuilding.js' />
 <style scoped lang="scss" src="./EditBuilding.scss"></style>