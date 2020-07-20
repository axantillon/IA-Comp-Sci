<template>
  <div class="itemList">
    <v-card
    class="mx-auto"
    max-width="400"
    tile
    >
      <v-card-title> Items </v-card-title>
      <v-skeleton-loader
        v-if="!loaded"
        height=100
        type="list-item-two-line"
      >
      </v-skeleton-loader>
      <p class="error" v-if="error"> {{error.message}} </p>
      <v-list-item v-for="(items, index) in items"
                v-bind:item="items"
                v-bind:index="index"
                v-bind:key="items._id"
      >
        <v-list-item-content>
          <v-list-item-title> {{items.name}} </v-list-item-title>
          <v-list-item-subtitle>
            {{`Week: ${items.week}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Quantity: ${items.quantity}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Created On: ${items.createdAt}`}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "itemList",
  data: () => ({
  }),
  mounted() {
    this.$store.dispatch('loadItems')
  },
  computed: mapState([
    'items', 'error', 'loaded'
  ])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>