<template>
  <div class="home">
    <v-tabs v-model="tab">
      <div class="d-flex justify-center">
        <v-tab>
          Add
        </v-tab>
        <v-tab>
          Update
        </v-tab>
      </div>
      <v-tab-item>
        <addItem/>
      </v-tab-item>
      <v-tab-item>
        <updateItem/>
      </v-tab-item>
    </v-tabs>
    <router-view/>
    <hr/>
    <listItems/>
  </div>
</template> 

<script>
import listItems from "../components/listItems"
import addItem from "../components/addItem"
import updateItem from "../components/updateItem"

export default {
  name: "Home",
  components: {
      listItems,
      addItem,
      updateItem,
  }
};
</script>
