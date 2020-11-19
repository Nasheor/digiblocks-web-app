<template>
    <v-card>
    <v-data-table
        :headers="headers"
        :items="building_data"
        multi-sort
        hide-default-footer
        class="elevation-0 border"
    />        
    </v-card>
</template>

<script src='./Dec.js' />
<style scoped lang="scss" src="./Dec.scss"></style>