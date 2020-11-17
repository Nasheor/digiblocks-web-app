<template>
    <v-container>
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <BuildingCard 
                    v-for="building of buildings"
                    :key="building.key"
                    class="ma-3 pa-2"
                    :src="building.image"
                    :name="building.name"
                    :floor_area="building.floor_area"
                    :category="building.category"
                    :hours="building.hours"
                    :latitude="building.latitude"
                    :longitude="building.longitude"
                    :id="building.id"
                    :compare="false"
                    @click.native="setName(building)"
                    outlined
                    tile
                  />              
                </div>
              </template>
              <v-card  >
                  <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                      <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ name }}</v-toolbar-title>
                    <v-spacer />
                  </v-toolbar>
                    <v-data-table
                        :headers="headers"
                        :items="getBuildings"
                        multi-sort
                        hide-default-footer
                        class="elevation-0 border"
                    />
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script src='./Transactions.js' />
<style scoped lang="scss" src="./Transactions.scss"></style>