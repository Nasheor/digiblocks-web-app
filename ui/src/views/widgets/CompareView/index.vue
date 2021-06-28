<template>
    <div>
        <v-tabs
            v-model="tab"
            dark
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
                        <Tabular :compare_buildings="buildings"/>
                    </template>
                    <template v-else>
                       <Graphical :compare_buildings="buildings" />
                    </template>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <v-footer class="d-flex justify-center" padless>
            <v-btn align-center dark @click="close">
                Close
            </v-btn>
        </v-footer>
    </div>
</template>

 <script src='./CompareView.js' />
 <style scoped lang="scss" src="./CompareView.scss"></style>