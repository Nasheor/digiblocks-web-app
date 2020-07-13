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
          <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="ml-2"
                  min-width="0"
                  color="success"
                  v-on="on"
                  @click="open"
                >
                  <!-- <v-icon>mdi-logout</v-icon> -->
                  Compare
                </v-btn>
              </template>
              <v-card v-if="getCompareDialogStatus" >
                  <CompareView />
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
            <BuildingCard
              class="ma-3 pa-2"
              v-bind:id="1"
              v-bind:src="buildings[0].src"
              v-bind:name="buildings[0].name"
              outlined
              tile
            />
            <BuildingCard
              class="ma-3 pa-2"
              v-bind:id="2"
              v-bind:src="buildings[1].src"
              v-bind:name="buildings[1].name"
              outlined
              tile
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container> 
</template>

 <script src='./Buildings.js' />
 <style scoped lang="scss" src="./Buildings.scss"></style>