<template>
  <v-card class="pa-2">
    <v-spacer />
      <v-row class="mt-8">
        <v-col cols="4" sm="12"  class="mt-12">
          <v-card-text class="format mt-5">
            <v-file-input 
                label="Telemetry File"
                dense
                outlined
                show-size
                @change="filePicked">
            </v-file-input>
            <v-btn
              class="ml-2"
              min-width="0"
              color="success"
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-text>
        </v-col>
        <v-col cols="4" sm="12" v-if="getDltStatus===false">
          <v-chip class="mr-2" color="red lighten-3" text-color="gray">
             <h4> Register Building to the Ledger </h4>
          </v-chip>
        </v-col>
        <v-col cols="4" sm="12"  class="mt-12" v-else>
          <v-chip class="mr-2" color="green lighten-3" text-color="gray">
             <h4> Building already registered to the ledger </h4>
          </v-chip>
        </v-col>
        <v-col cols="12" sm="12">
          <TimeSeries :building_data="getBuilding"/>
        </v-col>
        <v-col cols="12" lg="7">
          <BarGraph :building_data="getBuilding"/>
        </v-col>
        <v-col cols="12" lg="5">
          <LineMetrics :building_data="getBuilding"/>
          <BarMetrics :building_data="getBuilding"/>
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