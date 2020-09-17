<template>
    <v-row>
        <v-col v-for="item of items" :key="item.name" cols="12" sm="6" lg="3" class="py-0">
            <v-card flat class="mb-2" color="white" max-height="158">
                <v-card-text>
                <div class="d-flex align-center">
                    <div class="align-self-center">
                        <h1 class="black--text display-1">
                            <v-icon dark size="30">mdi-apple-keyboard-command</v-icon>
                        </h1>
                    </div>
                    <div class="mx-4">
                    <h2 class="black--text font-weight-regular">{{item.name}}</h2>
                    <h5 class=" black--text subtitle-2 text-no-wrap font-weight-regular"
                    >{{item.key}}</h5>
                    </div>
                </div>
                <v-row class="mt-1" v-if="item.name==='Gas'">
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{from_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{gas_value[0]}}</h5>
                    </v-col>
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{to_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{gas_value[1]}}</h5>
                    </v-col>
                </v-row>
                <v-row class="mt-1" v-else-if="item.name==='Electricity'">
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{from_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{electricity_value[0]}}</h5>
                    </v-col>
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{to_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{electricity_value[1]}}</h5>
                    </v-col>
                </v-row>
                <v-row class="mt-1" v-else-if="item.name==='Water'">
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{from_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{water_value[0]}}</h5>
                    </v-col>
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{to_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{water_value[1]}}</h5>
                    </v-col>
                </v-row>
                <v-row class="mt-1" v-else-if="item.name==='Carbon Dioxide'">
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{from_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{co_value[0]}}</h5>
                    </v-col>
                    <v-col cols="5" class="d-flex align-center">
                        <h5 class="font-weight-light black--text text-nowrap">{{to_period[0].value}}</h5>
                    </v-col>
                    <v-col cols="7">
                        <h5 class="font-weight-strong black--text text-nowrap">{{co_value[1]}}</h5>
                    </v-col>
                </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script src='./SummaryCard.js' />
<style scoped lang="scss" src="./SummaryCard.scss"></style>