<template>
  <div class="itemCard ma-6">
      <v-card width="250">
            <v-card-title> Example </v-card-title>
            <v-card-subtitle> Quantity : #</v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn class="mb-4 mt-n4"> Donate </v-btn>
            </v-card-actions>
      </v-card>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "itemCard",

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