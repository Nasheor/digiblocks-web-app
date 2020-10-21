<template>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="buildings"
        multi-sort
        hide-default-footer
        class="elevation-0 border"
      ></v-data-table>
    </v-card>
</template>

<script src='./VerifyCertificate.js' />
<style scoped lang="scss" src="./VerifyCertificate.scss"></style>