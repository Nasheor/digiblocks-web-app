<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-0">
      <v-tabs v-model="tab" color="info">
        <v-tab :key="activity" class="text-capitalize font-weight-light subtitle-1">
          <v-icon class="d-block d-md-none">mdi-access-point</v-icon>
          <span class="d-none d-md-block">Activity</span>
        </v-tab>
        <!-- <v-tab :key="settings" class="text-capitalize font-weight-light subtitle-1">
          <v-icon class="d-block d-md-none">mdi-cog</v-icon>
          <span class="d-none d-md-block">Settings</span>
        </v-tab> -->
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Activity Tabs -->
        <v-tab-item :key="activity">
          <v-card flat>
            <v-card-text>
              <v-timeline :reverse="reverse" dense>
                <v-expansion-panels popout>
                <v-timeline-item 
                    v-for="(transaction, index) of transaction_data"
                    :key="index"
                    class="align-start" 
                    large
                >
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="../../../../assets/images/cit.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      {{transaction.Timestamp}}
                    </v-card-title>
                      <v-expansion-panel
                          v-for="(item,i) in 1"
                          :key="i"
                      >
                          <v-expansion-panel-header>{{transaction.TxId}}</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            {{getValues}}
                          </v-expansion-panel-content>
                      </v-expansion-panel>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                </v-expansion-panels>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script src='./Dec.js' />
<style scoped lang="scss" src="./Dec.scss"></style>