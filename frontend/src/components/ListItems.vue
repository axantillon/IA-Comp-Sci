<template>
  <div class="listItems">
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
import { mapState } from 'vuex'

export default {
  name: "listItems",

  data: () => ({

  }),

  mounted() {
    this.$store.dispatch('loadThings')
  },

  computed: mapState([
    'things', 'error', 'loaded'
  ])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>