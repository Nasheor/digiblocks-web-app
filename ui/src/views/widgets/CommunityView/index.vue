<template>
    <v-container fluid class="down-top-padding background" color="#e3e9ed">
        <v-row color="#e3e9ed">
            <v-col cols="6" class="py-0">
                <v-card class="mb-7">
                    <v-toolbar flat>
                        <v-toolbar-title>{{getKpiType}} Consumption</v-toolbar-title>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <div class="mt-4">
                        <vue-apex-charts
                            type="treemap"
                            height = "350"
                            width="380"
                            class="ma-2"
                            :options="tree_map.chartOptions"
                            :series="tree_map.series"
                        ></vue-apex-charts>
                    </div>
                </v-card>                        
            </v-col>
            <v-col cols="6" class="py-0">
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>{{ getKpiType }} Consumption</v-toolbar-title>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <vue-apex-charts
                        class="position ma-2"
                        height="360"
                        width="400"
                        :options="heat_map_energy.chartOptions"
                        :series="heatMapSeries"
                    ></vue-apex-charts>                   
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

 <script src='./CommunityView.js' />
 <style scoped lang="scss" src="./CommunityView.scss"></style>