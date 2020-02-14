<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
    </v-app-bar>

    <v-content>
      <AddPost/>
      <hr/>
      <ListItems/>
    </v-content>
  </v-app>
</template>

<script>
import AddPost from './components/AddPost';
import ListItems from './components/ListItems';

export default {
  name: 'App',

  components: {
    ListItems,
    AddPost
  },

  data: () => ({
    //
  }),
};
</script>
