<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    class="overlay"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="date"
                        label="Pick a Year"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        type="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        no-title
                        scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="setTimeline">OK</v-btn>
                    </v-date-picker>
                </v-menu>                
            </v-col>
        </v-row>
    </div>
</template>

<script src='./TimelineTracker.js' />
<style scoped lang="scss" src="./TimelineTracker.scss"></style>