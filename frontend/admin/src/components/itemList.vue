<template>
  <div class="itemList">
    <v-list>
      <v-list-item v-for="item in items" :key="item.name">
        <v-list-item-avatar>
          <v-icon>
            mdi-plus-circle-outline
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> {{ item.name }} </v-list-item-title>
          <v-list-item-subtitle>
            Amount Needed: {{ item.amount_needed }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn fab small @click="remove(item.item_id)">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ["items"],

  data: () => ({}),

  methods: {
    remove(item_id) {
      this.$emit("removeItem", item_id);
    }
  }
};
</script>
