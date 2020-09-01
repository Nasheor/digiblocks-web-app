<template>
  <v-app-bar
    id="app-bar"
    app
    flat
    height="75"
    fixed
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <v-menu bottom center offset-y origin="top right" min-width="300px" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="mr-1">
          <v-badge>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list class="pa-5 pl-9">
        <h4 class="px-5 py-3 pt-2 font-weight-medium">Notifications</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(notification, i) in notifications" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div>
                    <v-avatar class="mr-3">
                        <img :src="require('@/assets/images/'+ notification.image)" />
                    </v-avatar>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ notification.name }}</h4>
                <span class="text--secondary caption descpart d-block text-truncate">{{notification.value}}</span>
                <small class="text--secondary">{{notification.time}} {{notification.unit}} ago</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-list-item-avatar
            class="align-self-center"
            color="white"
            contain
          >
            <v-img
              src="https://i.ibb.co/T16ZtGW/homer.png"
              max-height="30"
            />
          </v-list-item-avatar>
        </v-btn>
      </template>
      <v-list
        :tile="false"
        nav
      >
        <v-list-item
          v-for="(item,index) in items"
          :key="index"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          :disabled="item.disabled"
          :target="item.target"
          @click="item.click"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

 <script src='./AppBar.js' />
 <style scoped lang="scss" src="./AppBar.scss"></style>
