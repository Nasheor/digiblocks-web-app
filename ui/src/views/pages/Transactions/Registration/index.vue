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
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="../../../../assets/images/cit.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      John Doe
                      <span class="subtitle-2 mx-1 font-weight-light">5 minutes ago</span>
                    </v-card-title>
                    <v-card-text class="px-0">
                      assign a new task
                      <a href="javascript:void(0)">Energy web app design</a>
                    </v-card-text>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="../../../../assets/images/cit.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Jacky Chain
                      <span class="subtitle-2 mx-1 font-weight-light">14 minutes ago</span>
                    </v-card-title>
                    <v-row class="mt-4">
                      <v-col lg="9" cols="12" sm="12">
                        <div class="subtitle-2 font-weight-regular mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer nec odio. Praesent libero. Sed cursus
                          ante.
                        </div>
                      </v-col>
                    </v-row>
                    <v-divider class="my-4"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="../../../../assets/images/cit.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Emma John
                      <span class="subtitle-2 mx-1 font-weight-light">23 minutes ago</span>
                    </v-card-title>
                    <div class="subtitle-2 font-weight-regular mt-4">
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Integer nec odio. Praesent libero. Sed
                      cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                      elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                      Fusce nec tellus sed augue semper
                    </div>
                    <v-divider class="mb-4 mt-7"></v-divider>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item class="align-start" large>
                  <template v-slot:icon>
                    <v-avatar>
                      <img src="../../../../assets/images/cit.jpg" />
                    </v-avatar>
                  </template>
                  <v-card class="elevation-0">
                    <v-card-title class="subtitle-1 pa-0">
                      Charlotte Smith
                      <span class="subtitle-2 mx-1 font-weight-light">1 hour ago</span>
                    </v-card-title>
                    <div class="subtitle-2 font-weight-regular mt-4 pa-4 border">
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Integer nec odio. Praesent libero. Sed
                      cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                      elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                      Fusce nec tellus sed augue semper
                    </div>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item :key="settings">
          <v-card flat>
            <v-card-text>
              <form>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Full Name"
                      :rules="rules"
                      hide-details="auto"
                      v-model="name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Phone No"
                      :rules="rules"
                      hide-details="auto"
                      placeholder="123 456 7890"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Message"
                      row="2"
                      :rules="rules"
                      hide-details="auto"
                      placeholder
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :rules="rules"
                      v-model="select"
                      :items="items"
                      label="Country"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-btn color="success" class="elevation-0">Update Profile</v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-tab-item> -->
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script src='./Registration.js' />
<style scoped lang="scss" src="./Registration.scss"></style>