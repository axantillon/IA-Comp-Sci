<template>
  <div class="itemCard ma-6">

      <donateCard v-bind:item=this.item 
      v-bind:quantityNeeded=this.quantity 
      v-bind:overlay=this.overlay
      v-on:changeOverlayChild="changeOverlay"
      />

      <v-card width="250" height="175">
            <v-card-title class="card_title">{{ item }}</v-card-title>
            <v-card-subtitle> Quantity : {{ quantity }}</v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn class="mb-4 mt-n4" @click="overlay = !overlay"> Donate </v-btn>
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

  props: ['item', 'quantity'],

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