<template>
    <v-data-table
        :headers="headers"
        :items="getBuildings"
        multi-sort
        hide-default-footer
        class="elevation-0 border"
    />
</template>

<script src='./Registration.js' />
<style scoped lang="scss" src="./Registration.scss"></style>