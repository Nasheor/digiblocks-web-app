<template>
    <v-container fluid dark class="mx-auto mt-0">
      <v-app-bar
        app
        flat
        fixed
      >
        <v-spacer />

        <div class="mx-3" />

        <v-btn
          class="ml-2"
          min-width="0"
          large
          color="success"
          to="/"
        >
          <!-- <v-icon>mdi-logout</v-icon> -->
          Compare
        </v-btn>
      </v-app-bar>      
      <v-row>
        <v-col cols="84">
          <v-row
            align="start"
            justify="start"
          >
            <BuildingCard
              class="ma-3 pa-2"
              outlined
              tile
            />
            <BuildingCard
              class="ma-3 pa-2"
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