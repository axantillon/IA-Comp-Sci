<template>
  <v-card tile flat class="">
    <v-card-title>
      Donate Items
    </v-card-title>
    <v-card-subtitle>
      Choose the week with which you would like to help!
    </v-card-subtitle>
    <v-card class="selectWeek my-2 mx-4 pa-2">
      <v-select
        v-model="select"
        :items="this.weeks"
        item-text="archive_week_id"
        item-value="_id"
        label="Petitions Archived"
        :return-object="true"
        required
        @focus="getArchivedWeeks()"
        @change="loadWeekItems()"
      ></v-select>
    </v-card>

    <v-container class="itemGrid" fluid>
      <v-row>
        <v-skeleton-loader
          class="ma-6"
          v-if="!loaded & !error"
          height="175"
          width="250"
          type="card"
        ></v-skeleton-loader>
        <v-card v-else-if="error" height="175" width="250" class="error ma-6">
          <v-card-title>{{ error.message }}</v-card-title>
        </v-card>

        <div
          v-for="(items, index) in items"
          v-bind:item="items"
          v-bind:index="index"
          v-bind:key="items.id"
        >
          <itemCard
            v-bind:entry_id="items._id"
            v-bind:item_name="items.item_name"
            v-bind:item_desc="items.item_description"
            v-bind:quantity="items.amount_needed"
            v-bind:week_id="select.archive_week_id"
          />
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import itemCard from "../components/itemCard";
import { weekService } from "../services/mainServices";

export default {
  name: "itemGrid",

  components: {
    itemCard
  },

  data: () => ({
    overlay: false,
    select: null,
    weeks: []
  }),

  mounted() {
    this.getArchivedWeeks();
  },

  methods: {
    async getArchivedWeeks() {
      const response = await weekService.getWeeks();
      this.weeks = response.data;
    },
    loadWeekItems() {
      this.$store.dispatch("loadWeekItems", this.select.archive_week_id);
    }
  },

  computed: {
    ...mapState(["items", "error", "loaded"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
