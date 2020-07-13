<template>
    <v-card
      class="d-flex flex-column justify-space-between pa-0"
      max-width="350"
    >
        <v-list-item-action>
            <v-checkbox
                color="secondary"
               v-model="isSelected"
            />
        </v-list-item-action>
        <div class="mt-4">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                    <v-img
                        :src="require(`../../../assets/images/${src}`)"
                        height="200px"
                        dark 
                        v-on="on"
                    ></v-img> 
                </template>
                <v-card  >
                    <v-toolbar dark  color="#f79026">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="dialog = false">Save</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <BCard />
                </v-card>
            </v-dialog>
        </div>
      
        <v-card-subtitle class="overline">
            {{name}}
        </v-card-subtitle>
    
        <v-card-actions>  
            <v-btn
                @click="deleteBuilding"
                color="purple"
                text
            >
                Delete
            </v-btn>    
            <v-spacer></v-spacer>    
            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
    
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-list shaped>
                    <v-list-item>
                        <v-list-item-title>
                            Energy Status
                        </v-list-item-title>
                        <v-card-subtitle>
                            Not Verified
                        </v-card-subtitle>
                    </v-list-item>
                </v-list>
            </div>
        </v-expand-transition>
    </v-card>
</template>

 <script src='./BuildingCard.js' />
 <style scoped lang="scss" src="./BuildingCard.scss"></style>