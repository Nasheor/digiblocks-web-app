<template>
    <v-card flat tile color="#21c1d6" class="d-flex pa-2" >
        <v-card-text width="40%">
            <v-timeline  dense>
                <v-timeline-item
                    v-for="activity of activity_data"
                    :key="activity.name"
                    class="align-start" 
                    large
                >
                    <template v-slot:icon>
                    <v-avatar>
                        <img :src="require('@/assets/images/'+ activity.image)" />
                    </v-avatar>
                    </template>
                    <v-card class="elevation-0">
                        <v-card-title class="pa-2">
                            {{activity.name}}
                            <span class="subtitle-2 mx-1 font-weight-light">{{activity.time}} {{activity.unit}} ago</span>
                        </v-card-title>
                        <div class="font-weight-regular mt-4">
                        {{activity.value}}
                        </div>
                        <v-divider class="mb-4 mt-7"></v-divider>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
        <v-card width="50%" height="400px"  flat>
            <v-card-text  class="mb-7">
            <img
                src="@/assets/images/profile-bg.jpg"
                class="img-fluid rounded-top bt4 w-100 profile-bg-height"
            />
            <div class="p-4 mt-n12 text-center">
                <div class="d-flex justify-center mt-n5">
                <img
                    :src="require('@/assets/images/'+ dashboard_data[9].value)"
                    alt="user"
                    width="118px"
                    height="100px"
                    class="img-fluid rounded-circle elevation-1"
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
                    <v-col cols="2" class="ml-8">
                        <h2 class="font-weight-light">{{dashboard_data[0].value}}</h2>
                        <small class>Band</small>
                    </v-col>
                </v-row>
            </div>
            </v-card-text>
            <v-card flat height="200px" >
                <v-card-text class="pa-0">
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
                            {{dashboard_data[15].value}}
                            <sup>0</sup>
                            </h1>
                            <small class>Sunny Rainy day</small>
                        </div>
                        </div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="4" sm="4" lg="5" class="text-center border-left">
                        <h1 class="font-weight-light mb-0 display-1">
                        {{dashboard_data[16].value}}
                        <sup>0</sup>
                        </h1>
                        <small class>Tonight</small>
                    </v-col>
                    </v-row>
                </div>
                </v-card-text>
            </v-card>
        </v-card>
    </v-card>
</template>

<script src='./CampusActivity.js' />
<style scoped lang="scss" src="./CampusActivity.scss"></style>