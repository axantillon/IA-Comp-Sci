<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
//import ListItems from './components/ListItems';

export default {
  name: 'App',

  components: {
    //ListItems,
  },

  data: () => ({
    //
  }),
};
</script>
