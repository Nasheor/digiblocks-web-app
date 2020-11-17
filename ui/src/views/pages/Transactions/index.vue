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
                <v-tabs
                    v-model="tab"
                    background-color="#f79026"
                    centered
                    center-active
                    icons-and-text
                >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                        v-for="view in views"
                        :key="view.name"
                    >
                        {{view.name}}
                        <v-icon>{{view.icon}}</v-icon>
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="view in views"
                        :key="view.name"
                    >
                        <v-card flat>
                            <template v-if="tab===0">
                                <Dec :buildings="buildings" />
                            </template>
                            <template v-else>
                                <Registration :buildings="buildings" />
                            </template>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
                <v-footer class="d-flex justify-center" padless>
                    <v-btn align-center dark @click="dialog=false">
                        Close
                    </v-btn>
                </v-footer>
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script src='./Transactions.js' />
<style scoped lang="scss" src="./Transactions.scss"></style>