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
                v-bind:key="items.item_id"
      >
        <v-list-item-content>
          <v-list-item-title> {{items.item_name}} </v-list-item-title>
          <v-list-item-subtitle>
            {{`Original Amount: ${items.original_amount}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Amount Needed: ${items.amount_needed}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Volunteers: ${items.volunteers}`}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{`Entry Id: ${items._id}`}}
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
    week_id: "26Jun"
  }),
  mounted() {
    this.$store.dispatch('loadItems',this.week_id)
  },
  computed: mapState([
    'items', 'error', 'loaded'
  ])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>