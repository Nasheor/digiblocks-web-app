<template>
  <v-app
  >
    <v-content>
      <v-row>
        <v-col cols="12" lg="7" xl="6" class="info d-none d-md-flex align-center justify-center" fill-width>
          <v-container class="flex-grow-1" >
            <div>
              <v-row justify="center">
                <v-col cols="8" xl="5">
                    <div class="layout column align-center login-logo">                 
                      <v-img src="../../../assets/images/digilogo.png" height="100%"></v-img>
                    </div>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-col>
        <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
        <v-container align-center justify-center>
            <v-card class="pa-sm-12 elevation-2" align-center>
            <v-row>
                <v-col cols="12" lg="9" xl="6">
                    <v-img src="../../../assets/images/no_tagline.png"></v-img>
                    <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign Up</h2>
                    <h6 class="subtitle-1">
                        Already have an account?
                        <a @click="goToLogin" class>Sign in</a>
                    </h6>

                    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin">
                        <v-text-field
                        v-model="fname"
                        :rules="fnameRules"
                        label="Full Name"
                        class="mt-4"
                        required
                        outlined
                        ></v-text-field>
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required outlined></v-text-field>
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

                        <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                        <v-checkbox
                            v-model="checkbox"
                            :rules="[v => !!v || 'You must agree to continue!']"
                            label="I agree to the terms and privacy"
                            required
                        ></v-checkbox>
                        </div>
                        <v-btn
                            :disabled="!valid"
                            color="#f79026"
                            block
                            class="mr-4"
                            submit
                            @click="submit"
                        >Register</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            </v-card>
        </v-container>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="showResult"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script src='./Register.js' />
<style scoped lang="scss" src="./Register.scss"></style>