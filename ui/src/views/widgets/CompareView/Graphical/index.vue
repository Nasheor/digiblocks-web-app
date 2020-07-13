<template>
<v-container>
    <v-row>
        <v-col cols="12" sm="12" lg="6">
            <ColumnChart v-bind:chartData="chartData.columnChart"/>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
            <BarChart v-bind:chartData="chartData.barChart"/>
        </v-col>
        <v-col cols="12" sm="12">
            <MixedChart v-bind:chartData="chartData.mixedChart"/>
        </v-col>
        <v-col cols="12" sm="12">
            <HeatMap v-bind:chartData="chartData.heatMapChart"/>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
            <PieChart v-bind:chartData="chartData.pieChart"/>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
            <RadialChart v-bind:chartData="chartData.radialBarChart"/>
        </v-col>
        <v-col cols="12" sm="12">
            <LineAreaChart v-bind:chartData="chartData.lineAreaChartSpline"/>
        </v-col>
        <v-col cols="12" sm="12">
            <BubbleChart v-bind:chartData="chartData.bubbleChart"/>
        </v-col>
    </v-row>
</v-container>
</template>
 
 <script src='./Graphical.js' />
 <style scoped lang="scss" src="./Graphical.scss"></style>