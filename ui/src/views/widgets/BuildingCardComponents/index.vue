<template>
    <v-row>
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
</template>

 <script src='./BuildingCardComponents.js' />
 <style scoped lang="scss" src="./BuildingCardComponents.scss"></style>