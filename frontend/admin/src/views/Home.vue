<template>
  <div class="Home d-flex justify-center">
    <v-card class="ma-10" width="600" height="400">
      <v-card-title>
        Administrator Page
      </v-card-title>
      <v-card-subtitle>
        Log In To Manage and Review <b>Donations App</b>
      </v-card-subtitle>
      <v-card-actions class="justify-center">
        <v-btn @click="handleLogin()">
          Log In
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { login, logout, isLoggedIn } from "../services/auth";

export default {
  name: "Home",

  components: {},

  data: () => ({

  }),

  created() {
    if(isLoggedIn()){
      logout()
    }
  },

  methods: {
    handleLogin() {
      login()
    }
  },
};
</script>
