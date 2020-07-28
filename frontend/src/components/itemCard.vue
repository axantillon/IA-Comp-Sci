<template>
  <div class="itemCard ma-6">

      <donateCard v-bind:item_name=this.item_name
      v-bind:quantityNeeded=this.quantity 
      v-bind:entry_id=this.entry_id
      v-bind:week_id=this.week_id
      v-bind:overlay=this.overlay
      v-on:changeOverlayChild="changeOverlay"
      />

      <v-card width="250" height="175">
            <v-card-title class="card_title">{{ item_name }}</v-card-title>
            <v-card-subtitle> Amount Needed : {{ quantity }}</v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn @click="overlay = !overlay"> Donate </v-btn>
            </v-card-actions>
      </v-card>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
import donateCard from './donateCard'


export default {
  name: "itemCard",

  components: {
    donateCard,
  },

  props: ['item_name', 'quantity', 'entry_id', 'week_id'],

  data: () => ({
    overlay: false,
  }),
  
  computed: mapState([
    
  ]),

  methods: {
      changeOverlay () {
        this.overlay = !this.overlay
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>