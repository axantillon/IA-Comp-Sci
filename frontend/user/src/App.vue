<template>
  <v-app>
    <appTopBar/>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import appTopBar from "../src/components/layout/appTopBar"

export default {
  name: 'App',

  components: {
    appTopBar,
  },

  data: () => ({
    //
  }),

};

</script>
