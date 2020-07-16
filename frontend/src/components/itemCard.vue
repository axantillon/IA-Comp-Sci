<template>
  <div class="itemCard ma-6">
      <v-card width="250" height="175">
            <v-card-title class="card_title">{{ item }}</v-card-title>
            <v-card-subtitle> Quantity : {{quantity}}</v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn class="mb-4 mt-n4"> Donate </v-btn>
            </v-card-actions>
      </v-card>
  </div>
  
</template>

<script>

export default {
  name: "itemCard",

  props: ['item', 'quantity'],

  data: () => ({

  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>