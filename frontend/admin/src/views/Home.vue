<template>
  <div class="Home d-flex justify-center">
    <v-card class="ma-10" width="600" height="800">
      <v-card-title>
        Test
      </v-card-title>
      <v-card-text>
        hwjfhjefwhg
      </v-card-text>
      <v-btn to="/dashboard"> View Admin </v-btn>
      <!-- <v-card-actions class="justify-center">
        <v-btn @click="handleLogin()">
          Log In
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </div>
</template>  

<script>
import { login } from "../services/auth"

export default {
  name: "Home",

  components: {
    
  },

  data: () => ({
  }),

  mounted() {
  },

  methods: {
    handleLogin() {
        login();
      },
  }
};
</script>
