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
                            type="pie"
                            height = "250"
                            :options="pie_chart_energy.chartOptions"
                            :series="pie_chart_energy.series"
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
                        class="position"
                        height="250"
                        width="420"
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