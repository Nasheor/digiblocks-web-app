<template>
    <v-row>
        <v-col v-for="item of items" :key="item.name" cols="12" sm="6" lg="3" class="py-0">
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Gas'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">{{item.icon}}</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-up-bold</v-icon></div>
                                <div><p>4.5%</p></div>
                            </div>   
                            <p>{{gas_value[0]}} {{item.key}}</p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Gas
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Electricity'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">{{item.icon}}</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-down-bold</v-icon></div>
                                <div><p>5%</p></div>
                            </div>   
                            <p>{{electricity_value[0]}} {{item.key}}</p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Electricity
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Water'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">{{item.icon}}</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-down-bold</v-icon></div>
                                <div><p>6%</p></div>
                            </div>   
                            <p>{{water_value[0]}} {{item.key}}</p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Water
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Carbon Dioxide'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">{{item.icon}}</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-up-bold</v-icon></div>
                                <div><p>6%</p></div>
                            </div>   
                            <p>{{co_value[0]}} {{item.key}}</p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Carbon Dioxide
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Total Electrical Usage'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">mdi-flash</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-down-bold</v-icon></div>
                                <div><p>6%</p></div>
                            </div>   
                            <p>
                                    {{total_electrical_usage[0]}} kWh/m
                                    <sup>2</sup>/yr
                            </p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Total Electrical Usage
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
            <v-card
                class="mx-auto kpi_metrics"
                max-width="344"
                outlined
                v-if="item.name==='Total Non-Electrical Usage'"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar
                            tile
                            size="40"
                            max-width="20"
                            color="grey"
                        >
                            <v-icon dark size="30">mdi-camera-timer</v-icon>
                        </v-list-item-avatar>
                        <div class="inner_display">
                            <v-list-item-title class="headline mb-1">
                                YTD {{from_period[0].value}}
                            </v-list-item-title>
                            <div class="basic_format">
                                <div><v-icon color="green" size="30">mdi-arrow-down-bold</v-icon></div>
                                <div><p>6%</p></div>
                            </div>   
                            <p>
                                    {{total_non_electrical_usage[0]}} kWh/m
                                    <sup>2</sup>/yr
                            </p>      
                        </div>                                           
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <strong>
                        Total Non-Electrical Usage
                    </strong>
                    <v-spacer></v-spacer>
                    <strong>
                        Usage On Track
                    </strong>
                </v-list-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<script src='./SummaryCard.js' />
<style scoped lang="scss" src="./SummaryCard.scss"></style>