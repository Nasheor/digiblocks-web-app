<template>
    <div>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="data" :search="search" class="border"></v-data-table>
        </v-card>
    </div>
</template>

<script src='./Tabular.js' />
<style scoped lang="scss" src="./Tabular.scss"></style>