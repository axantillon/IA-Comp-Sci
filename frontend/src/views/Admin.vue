<template>
  <div class="home">
    <v-tabs>
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
    <div class="ma-2">
        <itemList/>
    </div>
    <hr/>
  </div>
</template> 

<script>
import addItem from "../components/addItem"
import updateItem from "../components/updateItem"
import itemList from "../components/itemList"

export default {
  name: "Home",
  components: {
      addItem,
      updateItem,
      itemList,
  }
};
</script>