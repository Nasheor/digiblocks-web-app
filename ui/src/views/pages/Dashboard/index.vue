<template>
    <v-container fluid class="down-top-padding background">
        <v-row>
            <v-col cols="12" class="py-0">
                <TimelineTracker />
            </v-col>
            <v-col cols="12" class="py-0">
                <CampusActivity />
            </v-col>
            <v-col cols="12" class="py-0">
                <SummaryCard />
            </v-col>
            <v-col cols="12" class="py-0">
                <CampusMap />
            </v-col>
            <v-col cols="12" class="py-0">
                <CommunityView />
            </v-col>
        </v-row>
    </v-container>
</template>

<script src='./Dashboard.js' />
<style scoped lang="scss" src="./Dashboard.scss"></style>
