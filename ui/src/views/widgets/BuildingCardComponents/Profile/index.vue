<template>
  <v-card>
    <v-card-text class="pa-7">
      <div class="d-flex justify-center mt-3">
        <div class="text-center">
          <img
            src="../../../../assets/images/cit.jpg"
            alt="user"
            width="150px"
            class="img-fluid rounded-circle shadow-sm"
          />
          <h4 class="mt-2 title font-weight-regular">Bishopstown Campus</h4>
          <h6 class="subtitle-2 font-weight-light">Cork Institute of Technology</h6>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="py-5">
        <small class="blue-grey--text text--lighten-2">Email address</small>
        <h6 class="body-2">cit@gmail.com</h6>
        <small class="blue-grey--text text--lighten-2 pt-4 d-block">Address</small>
        <h6 class="body-2">Bishopstown, Cork</h6>
      </div>
      <div class="map-box">
        <iframe
          src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=51.8839904, -8.53398985310417&amp;q=+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=13&amp;iwloc=B&amp;output=embed"
          height="300"
          class="w-100"
          style="border:0"
          allowfullscreen
        ></iframe>
      </div>
      <small class="blue-grey--text text--lighten-2 py-4 d-block">Social Profile</small>

      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue darken-4">
        <i class="fab fa-facebook-f" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="light-blue accent-3">
        <i class="fab fa-twitter" dark></i>
      </v-btn>
      <v-btn class="mx-2 elevation-0" fab dark small color="red darken-3">
        <i class="fab fa-youtube" dark></i>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script src='./Profile.js' />
<style scoped lang="scss" src="./Profile.scss"></style>