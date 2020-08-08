<template>
  <div class="home">

    <div class="tabs">
      <v-tabs>
        <div class="d-flex justify-center">
          <v-tab>
            Add New Week
          </v-tab>
          <v-tab>
            Add Items
          </v-tab>
          <v-tab>
            Update Items
          </v-tab>
        </div>
        <v-tab-item>
          <addWeek/>
        </v-tab-item>
        <v-tab-item>
          <addItem/>
        </v-tab-item>
        <v-tab-item>
          <updateItem/>
        </v-tab-item>
      </v-tabs>
    </div>
    <hr class="my-3">
    <div class="content ma-2">
        <tableWeeks/>
    </div>
  </div>
</template> 

<script>
import addItem from "../components/addItem"
import updateItem from "../components/updateItem"
import tableWeeks from "../components/tableWeeks"
import addWeek from "../components/addWeek"

export default {
  name: "Home",
  components: {
      addItem,
      updateItem,
      tableWeeks,
      addWeek,
  }
};
</script>