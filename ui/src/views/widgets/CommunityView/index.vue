<template>
    <v-container fluid class="down-top-padding background display_class" color="#e3e9ed">
        <v-row class="layout" color="#e3e9ed">
            <v-col cols="12" class="py-0">
                <v-row >
                    <v-col  cols="12" sm="6" lg="3" class="py-0">
                        <v-card color="#38c9ea">
                            <v-card-text class="pt-4">
                            <h4 class="font-weight-regular">Total Electrical Usage</h4>
                            <v-row>
                                <v-col cols="6">
                                <span class="display-1 deep-purple--text text--accent-2 font-weight-regular">{{total_electrical_usage[0]}} kWh/m
                        <sup>2</sup>/yr</span>
                                <h6 class="subtitle-2 font-weight-regular mt-2">10% Increased</h6>
                                </v-col>
                                <v-col cols="6">
                                <div class="overflow-hidden float-right my-3 mr-3" style="height: 70px; width: 150px">
                                    <VueApexCharts
                                        height="200px"
                                        width="150px"
                                        :options="metric_options"
                                        :series="percentage"
                                    ></VueApexCharts>
                                </div>
                                </v-col>
                            </v-row>
                            </v-card-text>
                        </v-card>    
                    </v-col>
                    <v-col cols="12" sm="6" lg="3" class="py-0">
                        <v-card color="#38c9ea">
                            <v-card-text class="pt-4">
                            <h4 class="font-weight-regular">Total Non Electrical Usage</h4>
                            <v-row>
                                <v-col cols="6">
                                <span class="display-1 deep-purple--text text--accent-2 font-weight-regular">{{total_non_electrical_usage[0]}} kWh/m
                        <sup>2</sup>/yr</span>
                                <h6 class="subtitle-2 font-weight-regular mt-2">10% Increased</h6>
                                </v-col>
                                <v-col cols="6">
                                <div class="overflow-hidden float-right my-3 mr-3" style="height: 70px; width: 150px">
                                    <VueApexCharts
                                        height="200px"
                                        width="150px"
                                        :options="metric_options"
                                        :series="percentage"
                                    ></VueApexCharts>
                                </div>
                                </v-col>
                            </v-row>
                            </v-card-text>
                        </v-card>    
                    </v-col>
                </v-row>           
            </v-col>
            <v-col cols="12" class="py-0">
                <v-card class="mt-4" color="#e3e9ed"> 
                <h1 class="font-weight-medium mb-5">Breakdown</h1>
                <v-row>
                    <v-col cols="12" sm="6" lg="6" class="py-0">
                        <v-card class="mb-7">
                            <v-toolbar flat>
                                <v-toolbar-title>Environment</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4 pa-4">
                                <vue-apex-charts
                                    type="pie"
                                    height="350"
                                    :options="pie_chart_environment.chartOptions"
                                    :series="pie_chart_environment.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col>
                    <v-col cols="12" sm="6" lg="6" class="py-0">
                        <v-card class="mb-7">
                            <v-toolbar flat>
                                <v-toolbar-title>Fuel Types</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4 pa-4">
                                <vue-apex-charts
                                    type="pie"
                                    height="350"
                                    :options="pie_chart_fuel.chartOptions"
                                    :series="pie_chart_fuel.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col>
                    <v-col cols="12" sm="6" lg="6" class="py-0">
                        <v-card class="mb-7">
                            <v-toolbar flat>
                                <v-toolbar-title>Energy Consumption</v-toolbar-title>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <div class="mt-4 pa-4">
                                <vue-apex-charts
                                    type="pie"
                                    height="350"
                                    :options="pie_chart_energy.chartOptions"
                                    :series="pie_chart_energy.series"
                                ></vue-apex-charts>
                            </div>
                        </v-card>                        
                    </v-col>
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