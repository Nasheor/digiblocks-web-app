<template>
  <v-card class="pa-4">
      <v-row >
        <v-col cols="4" sm="12"  class="mt-12" v-if="getDltStatus==false">
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
          <TimeSeries :building_data="building_data"/>
        </v-col>
        <v-col cols="12" lg="7">
          <BarGraph :building_data="building_data"/>
        </v-col>
        <v-col cols="12" lg="5">
          <LineMetrics :building_data="building_data"/>
          <BarMetrics :building_data="building_data"/>
        </v-col>
        <v-col cols="12" sm="12" lg="8">
          <Timeline :building_data="building_data"/>
        </v-col>
        <v-col cols="12" lg="4">
          <Profile :building_data="building_data"/>
        </v-col>
      </v-row>
  </v-card>
</template>

 <script src='./BuildingCardComponents.js' />
 <style scoped lang="scss" src="./BuildingCardComponents.scss"></style>