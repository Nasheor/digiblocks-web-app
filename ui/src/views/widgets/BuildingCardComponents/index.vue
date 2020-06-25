<template>
    <v-row>
      <v-col cols="12" sm="12">
        <TimeSeries />
      </v-col>
      <v-col cols="12" lg="7">
        <BarGraph />
      </v-col>
      <v-col cols="12" lg="5">
        <LineMetrics />
        <BarMetrics />
      </v-col>
      <v-col cols="12" lg="7">
        <MetricsTable />
      </v-col>
      <v-col cols="12" lg="4">
        <PieChart />
      </v-col>
      <v-col cols="12" sm="12" lg="8">
        <Timeline />
      </v-col>
      <v-col cols="12" lg="4">
        <Profile />
      </v-col>
    </v-row>
</template>

 <script src='./BuildingCardComponents.js' />
 <style scoped lang="scss" src="./BuildingCardComponents.scss"></style>