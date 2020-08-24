<template>
    <v-container fluid class="down-top-padding">
        <v-row>
            <v-col cols="12" class="py-0">
                <SummaryCard :summary_card_data="summary_card_data" />
            </v-col>
            <v-col cols="12" class="py-0">
                <CampusMap />
            </v-col>
        </v-row>
    </v-container>
</template>

<script src='./Dashboard.js' />
<style scoped lang="scss" src="./Dashboard.scss"></style>
