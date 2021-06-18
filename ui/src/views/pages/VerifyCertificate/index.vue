<template>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="certifier_data"
        multi-sort
        hide-default-footer
        class="elevation-0 border"
      >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="accept(item)">mdi-check</v-icon>
        <v-icon small @click="deleteCertificate(item.id)">mdi-delete</v-icon>
      </template>
      </v-data-table>
    </v-card>
</template>

<script src='./VerifyCertificate.js' />
<style scoped lang="scss" src="./VerifyCertificate.scss"></style>