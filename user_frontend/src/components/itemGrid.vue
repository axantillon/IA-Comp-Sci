<template>
  <div class="itemGrid">
    <v-container fluid>
      <v-row>

        <v-skeleton-loader class="ma-6"
          v-if="!loaded & !error"
          height=175
          width=250
          type="card"
        ></v-skeleton-loader>
        <v-card v-else-if="error" height=175 width=250 class="error ma-6" > <v-card-title>{{error.message}}</v-card-title> </v-card>

        <div v-for="(items, index) in items" 
          v-bind:item="items"
          v-bind:index="index"
          v-bind:key="items.id"
        >
          <itemCard 
            v-bind:entry_id=items._id 
            v-bind:item_name=items.item_name 
            v-bind:item_desc=items.item_description 
            v-bind:quantity=items.amount_needed 
            v-bind:week_id=week_id />
        </div>

      </v-row>
    </v-container>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
import itemCard from '../components/itemCard'

export default {
  name: "itemGrid",

  components: {
    itemCard,
  },

  data: () => ({
    overlay: false,
    week_id: "26Jun"
  }),

  mounted() {
    this.$store.dispatch('loadWeekItems', this.week_id)
  },

  computed: mapState([
    'items', 'error', 'loaded' 
  ])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>