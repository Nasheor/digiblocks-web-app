<template>
<v-app  id="particles-js">
  <v-container class="fill-height fill-width justify-center loc" min-width="900px">
        <v-card class="align-center" width="900px">
          <v-row>
            <v-col lg="7" class="info d-none d-md-flex align-center justify-center">
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10">
                  <div>
                    <v-img class="ml-12" max-height="450" max-width="450" src="@/assets/images/logo-icon.png" />
                    <h2
                      class="display-1 white--text font-weight-medium"
                    >DLT for smarter energy communities</h2>
                    <h6
                      class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                    >DigiBlocks will help facilitate the transformation of the energy sector through digitisation and support the fundamental shift in the energy landscape from a rigid centralised infrastructure towards decentralisation and energy-based communities, motivated in part by the increasing penetration of renewables and need for cities to move towards being positive energy districts.</h6>
                    <v-btn @click="openWebsite" class="mt-4 text-capitalize" x-large outlined color="white">Learn More</v-btn>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col lg="5">
              <div class="pa-4 pa-sm-12">
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign in</h2>
                <!-- <h6 class="subtitle-1">
                  Don't have an account?
                  <a href="#/register">Sign Up</a>
                </h6> -->

                <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
                  <v-text-field
                    v-model="userEmail"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :counter="10"
                    :rules="passwordRules"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>

                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        label="Remember me?"
                        required
                      ></v-checkbox>
                    </v-col>
                    <!-- <v-col>
                    <v-checkbox
                      v-model="admin"
                      label="Admin"
                    ></v-checkbox>
                    </v-col> -->
                  </v-row>
                  <v-btn
                    color="orange"
                    block
                    class="mr-4"
                    submit
                    @click="login"
                  >Sign In</v-btn>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
  </v-container>
</v-app>
</template>

<script src='./Login.js' />
<style scoped lang="scss" src="./Login.scss"></style>