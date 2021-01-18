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
            <v-data-table :headers="headers" :items="compare_buildings" :search="search" class="border">
                <template v-slot:[`item.controls`]="{ item }">
                     <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on }">
                            <div
                                v-on="on"
                                class="display"
                            >
                                <v-btn class="mx-2" fab dark small color="gray" @click="onButtonClick(item)">
                                <v-icon dark>mdi-google-circles-group</v-icon>
                                </v-btn>
                            </div>
                        </template>
                        <v-card  >
                            <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                                <v-btn icon dark @click="dialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                                <v-toolbar-title>{{ name }}</v-toolbar-title>
                                <v-spacer />

                                <div class="mx-3" />
                                <div>
                                    <v-btn
                                        class="ml-2"
                                        min-width="0"
                                        color="error"
                                        @click="generateDec"
                                        v-if="getDltCertStatus === false && getRole === 'Community Manager'"
                                    >
                                        <v-icon class="mr-3">mdi-certificate</v-icon>
                                        Generate DEC
                                    </v-btn>
                                    <v-btn
                                    class="ml-2"
                                    min-width="0"
                                    color="error"
                                    @click="registerBuilding"
                                    v-if="getDltStatus === false && getRole === 'Community Manager'"
                                    >
                                    <v-icon medium color="white" class="pa-2">mdi-battery-plus</v-icon>
                                    Register Building
                                    </v-btn>   
                                </div>
                            </v-toolbar>
                            <BCard :name="name" :building="b_card_data" />
                            <v-dialog v-model="togglePop" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">DEC Generated</v-card-title>
                                <v-card-text>Your Certificate is now available in the Certificate Section</v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" text @click="generate_dec = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                            <v-dialog v-model="toggleBuildingPop" persistent max-width="290">
                            <v-card>
                                <v-card-title class="headline">Building Registered</v-card-title>
                                <v-card-text>The building has been registered to the ledger</v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" text @click="register_building = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-card>
                    </v-dialog>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script src='./Tabular.js' />
<style scoped lang="scss" src="./Tabular.scss"></style>