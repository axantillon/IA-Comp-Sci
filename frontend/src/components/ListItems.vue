<template>
  <div class="listItems">
    <h1> Items </h1>
    <hr>
    <p class="error" v-if="error"> {{error}} </p>
    <v-card
    class="mx-auto"
    max-width="400"
    tile
    >
      <v-list-item v-for="(things, index) in things"
                  v-bind:item="things"
                  v-bind:index="index"
                  v-bind:key="things._id"
      >
        <v-list-item-content>
          <v-list-item-title> {{things.name}} </v-list-item-title>
          <v-list-item-subtitle>
            {{`Week: ${things.week}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Quantity: ${things.quantity}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Created On: ${things.createdAt}`}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
  
</template>

<script>
import ItemService from '../ItemService';

export default {
  name: "listItems",
  data() {
    return {
      things: [],
      error: '',
      week: '',
      name: '',
      quantity: '',
    }
  },
  async created(){
    try {
      const response = await ItemService.getItems();
      this.things = response.data;
    } catch(err) {
      this.error = err.message;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
