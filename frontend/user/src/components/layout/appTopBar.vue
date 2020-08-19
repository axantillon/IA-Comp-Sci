<template>
  <div class="appTopBar">
    <div class="appBar">
      <v-app-bar app color="primary" dark>
        <v-toolbar-title> User Page </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-avatar size="38" v-show="isLoggedIn()">
          <img v-bind:src="profilePicture" />
        </v-avatar>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title> User Details </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title> Settings </v-list-item-title>
            </v-list-item>

            <v-list-item v-show="!isLoggedIn()" @click="handleLogin()">
              <v-list-item-title>Log In</v-list-item-title>
            </v-list-item>
            <v-list-item v-show="isLoggedIn()" @click="handleLogout()">
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
import { isLoggedIn, login, logout, getUserData } from "../../services/auth";

export default {
  name: "appTopBar",

  components: {},

  data: () => ({}),

  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    }
  },

  computed: {
    profilePicture() {
      if (isLoggedIn()) {
        return getUserData().picture;
      }
      return null;
    }
  }
};
</script>

<style scoped></style>
