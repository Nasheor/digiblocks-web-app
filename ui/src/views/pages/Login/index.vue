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
                      <v-img src="../../../assets/images/digilogo.png" class="mt-12" height="100%"></v-img>
                    </div>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-col>
        <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-card class="elevation-1 mt-12 pa-4" min-height="100%">
                  <v-card-text>
                    <div class="align-center login-logo pl-5">                 
                      <v-img src="../../../assets/images/no_tagline.png"></v-img>
                    </div>
                    <v-form>
                      <v-text-field
                        append-icon="mdi-account"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="userEmail"
                        :error="error"
                        :rules="emailRules"/>
                      <v-text-field
                        :type="hidePassword ? 'password' : 'text'"
                        :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                        name="password"
                        label="Password"
                        id="password"
                        :rules="passwordRules"
                        v-model="password"
                        :error="error"
                        @click:append="hidePassword = !hidePassword"/>
                      <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                        <v-checkbox
                          v-model="checkbox"
                          :rules="[v => !!v || 'You must agree to continue!']"
                          label="Remember me?"
                          required
                        ></v-checkbox>
                        <div class="ml-auto">
                          <a href="javascript:void(0)" class="link mb-5">Forgot pwd?</a>
                        </div> 
                      </div>
                      <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                          <h6 class="subtitle-1">
                            Don't have an account?
                            <a @click="register" >Sign Up</a>
                          </h6>                        
                      </div>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block color="#f79026" @click="login" :loading="loading">Login</v-btn>
                  </v-card-actions>
                </v-card>
            </v-layout>
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

<script src='./Login.js' />
<style scoped lang="scss" src="./Login.scss"></style>