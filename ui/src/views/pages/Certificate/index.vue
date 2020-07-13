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
          <!-- <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }"> -->
                <v-btn
                  min-width="0"
                  color="success"
                  v-on="on"
                  @click="open"
                >
                  Community View
                </v-btn>
              <!-- </template>
              <v-card v-if="getCompareDialogStatus" >
                  <CompareView />
              </v-card>
          </v-dialog>           -->
        </div>
      </v-toolbar>  
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
          <v-dialog v-model="dialog" persistent max-width="490" transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  class="display"
                >
                  <BuildingCard
                    class="ma-3 pa-2"
                    v-bind:id="1"
                    v-bind:src="buildings[0].src"
                    v-bind:name="buildings[0].name"
                    @click.native="name=buildings[0].name"
                    outlined
                    tile
                  />  
                  <BuildingCard
                    class="ma-3 pa-2"
                    v-bind:id="2"
                    v-bind:src="buildings[1].src"
                    v-bind:name="buildings[1].name"
                    @click.native="name=buildings[1].name"
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
                  </v-toolbar>
                  <CertificateModal v-bind:chartData="data.barChart" />
              </v-card>
          </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

<script src="./Certificate.js" />
<style lang="scss" scoped src="./Certificate.scss" />