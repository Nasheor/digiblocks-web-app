<template>
     <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Bar Chart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <div>
                <vue-apex-charts
                type="bar"
                height="350"
                :options="chartData.chartOptions"
                :series="chartData.series"
              ></vue-apex-charts>
            </div>
        </div>
    </v-card>   
</template>

<script src="./BarChart.js" />
<style scoped lang="scss" src="./BarChart.scss" />