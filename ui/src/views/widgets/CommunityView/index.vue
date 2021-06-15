<template>
    <v-container fluid class="down-top-padding background display_class" color="#e3e9ed">
        <v-row class="layout" color="#e3e9ed">
            <v-col cols="12" class="py-0">
                <v-card class="mt-4" color="#e3e9ed"> 
                <h1 class="font-weight-medium mb-5">Breakdown</h1>
                <v-row>
                    <!-- <v-col cols="12" sm="6" lg="4" class="py-0">
                        <v-card class="pb-8">
                            <v-toolbar flat>
                                <v-toolbar-title>Environment</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4 pa-4">
                                <vue-apex-charts
                                    type="pie"
                                    height="250"
                                    :options="pie_chart_environment.chartOptions"
                                    :series="pie_chart_environment.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col> -->
                    <v-col cols="12" sm="6" lg="4" class="py-0">
                        <v-card class="mb-7">
                            <v-toolbar flat>
                                <v-toolbar-title>Energy Consumption</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4">
                                <vue-apex-charts
                                    type="pie"
                                    height = "250"
                                    :options="pie_chart_energy.chartOptions"
                                    :series="pie_chart_energy.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col>
                    <!-- <v-col cols="12" sm="6" lg="3" class="py-0">
                        <v-card class="mb-7">
                            <v-toolbar flat>
                                <v-toolbar-title>Fuel Types</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4">
                                <vue-apex-charts
                                    type="pie"
                                    height = "auto"
                                    :options="pie_chart_fuel.chartOptions"
                                    :series="pie_chart_fuel.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col> -->
                </v-row>
                </v-card>
            </v-col>
            <v-col cols="12" class="py-0">
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>Electricity breakdown</v-toolbar-title>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <vue-apex-charts
                        type="heatmap"
                        height="350"
                        :options="heat_map_energy.chartOptions"
                        :series="heat_map_energy.series"
                    ></vue-apex-charts>                   
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

 <script src='./CommunityView.js' />
 <style scoped lang="scss" src="./CommunityView.scss"></style>