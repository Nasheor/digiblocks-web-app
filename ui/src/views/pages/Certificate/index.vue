<template>
    <v-container fluid dark class="mx-auto mt-0"> 
      <v-toolbar
        dense
        elevation="0"
        class="toolbar-position"
      >
        <v-spacer />

        <div class="mx-3" />
        <div>
          <v-dialog v-model="community_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  min-width="0"
                  color="success"
                  v-on="on"
                  @click="open"
                >
                  Community View
                </v-btn>
              </template>
              <v-card v-if="community_dialog">
                  <v-toolbar class="an-toolbar-position" dark  color="#f79026">
                      <v-btn icon dark @click="community_dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Community Energy Certificate</v-toolbar-title>
                  </v-toolbar>
                  <CommunityModal v-bind:chartData="data.barChart" />
              </v-card>
          </v-dialog>          
        </div>
      </v-toolbar>  
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
          <v-dialog v-model="dialog" persistent max-width="650" transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <BuildingCard 
                    v-for="building of building_data"
                    :key="building.src"
                    class="ma-3 pa-2"
                    :src="building.image"
                    :name="building.name"
                    @click.native="setData(building)"
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
                      <v-toolbar-title>{{ selected_building.name }}</v-toolbar-title>
                  </v-toolbar>
                  <CertificateModal 
                    :chartData="data.barChart" 
                    :certificate_keys="certificate_keys"
                    :building_data="selected_building"/>
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

<script src="./Certificate.js" />
<style lang="scss" scoped src="./Certificate.scss" />