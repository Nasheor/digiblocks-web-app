<template>
    <v-card flat tile color="#eef5f9" class="d-flex flex-row pa-2 mt-0 ml-3" >
        <v-card tile width="40%" height="320px" class="mr-8 ">
            <v-img
                src="@/assets/images/weatherbg.jpg"
                class="sundaycard-img-height rounded"
                height="180px"
            ></v-img>
            <div class="px-5 py-1">
                <v-row class="ml-8">
                <v-col cols="8" sm="4" lg="4">
                    <div class="d-flex align-center">
                        <div class="ml-3">
                            <h1 class="font-weight-light mb-0 display-1">
                                {{temperature.main.temp}}
                            <sup>0</sup>F
                            </h1>
                            <small class>{{temperature.weather[0].description}}</small>
                        </div>
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="8" sm="4" lg="7" class="text-center border-left">
                    <h3 class="font-weight-light mb-0 display-1">
                       FEELS LIKE {{temperature.main.feels_like}}
                    <sup>0</sup>
                    </h3>F
                </v-col>
                </v-row>
            </div>
        </v-card>
        <v-card width="45%" class="ml-4" height="320px" flat>
            <v-card-text>
            <v-card flat class="text-center ml-1" width="405px" >
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