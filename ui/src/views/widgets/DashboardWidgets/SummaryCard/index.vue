<template>
    <v-row>
        <v-col v-for="item of items" :key="item.name" cols="12" sm="6" lg="3" class="py-0">
            <v-card flat color="#f5f5f5" class=" mb-7" min-height="168">
                <v-card-text >
                    <h1 class="title font-weight-regular headline mb-2">{{ item.name }}</h1>
                    <v-row class="d-flex align-center">
                        <v-col cols="6" color="green">
                            <h5 class="black--text font-weight-light">{{ item.measurement[0].value }}</h5>
                            <h5
                                class=" black--text subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                            >{{from_period[0].value}}</h5>
                        </v-col>
                        <v-divider vertical> </v-divider>
                        <v-col cols="4" >
                            <h5 class=" black--text font-weight-light">{{ item.measurement[1].value }}</h5>
                            <h5
                                class=" black--text subtitle-2 text-no-wrap blue-grey--text text--lighten-2 font-weight-regular"
                            >{{to_period[0].value}}</h5>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script src='./SummaryCard.js' />
<style scoped lang="scss" src="./SummaryCard.scss"></style>