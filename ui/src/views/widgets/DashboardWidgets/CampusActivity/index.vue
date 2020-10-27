<template>
    <v-card flat tile color="#eef5f9" class="d-flex pa-2 mt-0 ml-3" >
        <v-card tile width="40%" height="200px" class="mr-8" color="#20bd7b">
            <v-img
                src="@/assets/images/weatherbg.jpg"
                class="sundaycard-img-height rounded"
                height="100px"
            ></v-img>
            <div class="px-5 py-1">
                <v-row>
                <v-col cols="4" sm="4" lg="6">
                    <div class="d-flex align-center">
                    <div class="ml-3">
                        <h1 class="font-weight-light info--text mb-0 display-1">
                        {{dashboard_data[7].value}}
                        <sup>0</sup>
                        </h1>
                        <small class>Sunny Rainy day</small>
                    </div>
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="4" sm="4" lg="5" class="text-center border-left">
                    <h1 class="font-weight-light mb-0 display-1">
                    {{dashboard_data[8].value}}
                    <sup>0</sup>
                    </h1>
                    <small class>Tonight</small>
                </v-col>
                </v-row>
            </div>
        </v-card>
        <v-card width="45%" class="ml-12" height="320px"  color="#26adad" flat>
            <v-card-text>
            <v-card flat class="text-center ml-1" width="405px" color="#26adad">
                <div class="d-flex justify-center mt-n5">
                <img
                    :src="require('@/assets/images/'+ dashboard_data[5].value)"
                    alt="user"
                    width="118px"
                    height="100px"
                    class="img-fluid rounded-circle elevation-1 mt-2"
                />
                </div>
                <h2 class="mb-0 mt-4 font-weight-regular">{{dashboard_data[2].value}}</h2>
                <v-row class="mt-4 pa-4 d-flex justify-center">
                    <v-col cols="3">
                        <h2 class="mb-0 font-weight-light">{{dashboard_data[1].value}}</h2>
                        <small class>Buildings</small>
                    </v-col>
                    <v-col cols="3" class="ml-8">
                        <h2 class="mb-0 font-weight-light">{{dashboard_data[3].value}}</h2>
                        <small class>Devices</small>
                    </v-col>
                    <v-col cols="3" class="ml-8">
                        <h2 class="font-weight-light">{{dashboard_data[0].value}}</h2>
                        <small class>Band</small>
                    </v-col>
                </v-row>
            </v-card>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script src='./CampusActivity.js' />
<style scoped lang="scss" src="./CampusActivity.scss"></style>