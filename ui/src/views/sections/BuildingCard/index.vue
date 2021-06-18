<template>
    <v-card
      class="d-flex flex-column justify-space-between pa-0"
      max-width="250"
    >
        <v-list-item-action>
            <v-checkbox
                color="secondary"
               @click.stop="addBuilding"
               v-model="isSelected"
               v-if="compare===true"
            />
        </v-list-item-action>
                <v-img
                    :src="require(`../../../assets/images/${src}`)"
                    height="200px"
                    dark                   
                ></v-img> 
      
        <v-card-subtitle class="overline">
            {{name}}
        </v-card-subtitle>
        <v-card-text v-if="getRole==='External Verifier'">
            <v-list disabled>
                <v-list-item>
                    <v-list-item-title>
                        Status:
                    </v-list-item-title>
                    <v-list-content>
                        <p v-if="entire_building.certificate_verified===false && entire_building.certificate_generated===true">Not Verified</p>
                        <p v-else-if="entire_building.certificate_generated===false">No Verification Request</p>
                        <p v-else>Verified by {{entire_building.assessor}}</p>
                    </v-list-content>
                </v-list-item>
                <!-- <v-list-item>
                    <v-list-item-title>
                        BER:
                    </v-list-item-title>
                    <v-list-content class="mt-4">
                        <p>{{Math.round(entire_building.ber)}}</p>
                    </v-list-content>
                </v-list-item> -->
            </v-list>
        </v-card-text>
    </v-card>
</template>

 <script src='./BuildingCard.js' />
 <style scoped lang="scss" src="./BuildingCard.scss"></style>