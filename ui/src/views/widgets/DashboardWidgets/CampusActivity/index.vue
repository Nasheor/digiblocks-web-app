<template>
    <v-card flat>
    <v-card-text>
        <v-timeline :reverse="reverse" dense>
        <v-timeline-item class="align-start" large>
            <template v-slot:icon>
            <v-avatar>
                <img src="../../../../assets/images/cit.jpg" />
            </v-avatar>
            </template>
            <v-card class="elevation-0">
            <v-card-title class="subtitle-1 pa-0">
                John Doe
                <span class="subtitle-2 mx-1 font-weight-light">5 minutes ago</span>
            </v-card-title>
            <v-card-text class="px-0">
                assign a new task
                <a href="javascript:void(0)">Energy web app design</a>
            </v-card-text>
            <v-divider class="my-4"></v-divider>
            </v-card>
        </v-timeline-item>
        <v-timeline-item class="align-start" large>
            <template v-slot:icon>
            <v-avatar>
                <img src="../../../../assets/images/cit.jpg" />
            </v-avatar>
            </template>
            <v-card class="elevation-0">
            <v-card-title class="subtitle-1 pa-0">
                Jacky Chain
                <span class="subtitle-2 mx-1 font-weight-light">14 minutes ago</span>
            </v-card-title>
            <v-row class="mt-4">
                <v-col lg="9" cols="12" sm="12">
                <div class="subtitle-2 font-weight-regular mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Integer nec odio. Praesent libero. Sed cursus
                    ante.
                </div>
                </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            </v-card>
        </v-timeline-item>
        <v-timeline-item class="align-start" large>
            <template v-slot:icon>
            <v-avatar>
                <img src="../../../../assets/images/cit.jpg" />
            </v-avatar>
            </template>
            <v-card class="elevation-0">
            <v-card-title class="subtitle-1 pa-0">
                Emma John
                <span class="subtitle-2 mx-1 font-weight-light">23 minutes ago</span>
            </v-card-title>
            <div class="subtitle-2 font-weight-regular mt-4">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer nec odio. Praesent libero. Sed
                cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                Fusce nec tellus sed augue semper
            </div>
            <v-divider class="mb-4 mt-7"></v-divider>
            </v-card>
        </v-timeline-item>
        <v-timeline-item class="align-start" large>
            <template v-slot:icon>
            <v-avatar>
                <img src="../../../../assets/images/cit.jpg" />
            </v-avatar>
            </template>
            <v-card class="elevation-0">
            <v-card-title class="subtitle-1 pa-0">
                Charlotte Smith
                <span class="subtitle-2 mx-1 font-weight-light">1 hour ago</span>
            </v-card-title>
            <div class="subtitle-2 font-weight-regular mt-4 pa-4 border">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer nec odio. Praesent libero. Sed
                cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                Fusce nec tellus sed augue semper
            </div>
            </v-card>
        </v-timeline-item>
        </v-timeline>
    </v-card-text>
    </v-card>
</template>

<script src='./CampusActivity.js' />
<style scoped lang="scss" src="./CampusActivity.scss"></style>