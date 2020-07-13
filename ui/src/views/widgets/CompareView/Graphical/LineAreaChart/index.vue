<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Line Area Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <vue-apex-charts
                type="area"
                height="350"
                :options="chartData.chartOptions"
                :series="chartData.series"
              ></vue-apex-charts>
        </div>
    </v-card>    
</template>

<script src="./LineAreaChart.js" />
<style lang="scss" scoped src="./LineAreaChart.scss" />