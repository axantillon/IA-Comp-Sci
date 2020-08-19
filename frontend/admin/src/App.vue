<template>
  <v-app>
    <appTopBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import appTopBar from "../src/components/layout/appTopBar";

export default {
  name: "App",

  components: {
    appTopBar
  },

  data: () => ({
    //
  })
};
</script>
