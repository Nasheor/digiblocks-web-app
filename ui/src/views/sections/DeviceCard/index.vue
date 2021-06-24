<template>
    <v-card
      class="d-flex flex-column justify-space-between pa-0"
      max-width="250"
    >
        <v-img
            :src="require(`../../../assets/images/${src}`)"
            height="200px"
            dark           
        ></v-img>      
        <v-card-subtitle class="overline">
            {{name}}
        </v-card-subtitle>    
        <v-card-subtitle class="overline">
            Location: Nimbus Center
        </v-card-subtitle>    
    </v-card>
</template>

 <script src='./DeviceCard.js' />
 <style scoped lang="scss" src="./DeviceCard.scss"></style>