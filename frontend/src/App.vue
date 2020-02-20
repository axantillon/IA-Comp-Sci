<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 
    </v-app-bar>

    <v-content>
      <div class="d-flex align-center">
        <router-link to="/">Add</router-link> |
        <router-link to="/update">Update</router-link>
      </div>
      <router-view/>
      <hr/>
      <ListItems/>
    </v-content>
  </v-app>
</template>

<script>
import ListItems from './components/ListItems';

export default {
  name: 'App',

  components: {
    ListItems,
  },

  data: () => ({
    //
  }),
};
</script>
