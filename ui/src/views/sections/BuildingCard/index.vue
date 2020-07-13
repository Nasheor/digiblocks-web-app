<template>
    <v-card
      class="d-flex flex-column justify-space-between pa-0"
      max-width="275"
    >
        <v-list-item-action>
            <v-checkbox
                color="secondary"
               @click.stop="isSelected=!isSelected"
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
    </v-card>
</template>

 <script src='./BuildingCard.js' />
 <style scoped lang="scss" src="./BuildingCard.scss"></style>