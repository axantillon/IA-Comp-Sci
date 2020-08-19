<template>
  <div class="petitionPage">
    <v-card>
      <v-card-title>
        See Petitions For Previous Weeks
      </v-card-title>
      <v-card-text>
        <v-card class="petitionTable">
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
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="formattedItems"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { weekService } from "../services/mainServices";

export default {
  data: () => ({
    headers: [
      { text: "Item Name", value: "item_name" },
      { text: "Description", value: "item_description" },
      { text: "Amount Requested", value: "original_amount" },
      { text: "Amount Still Needed", value: "amount_needed" },
      { text: "Users Who Volunteered", value: "formattedVolunteers" }
    ],
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
      this.$store.dispatch("changeWeek", this.select.archive_week_id);
    }
  },

  computed: {
    formattedItems() {
      var formattedItems = this.items;

      formattedItems.forEach(item => {
        var entry = "";

        var volunteers = item.volunteers;
        volunteers.forEach(volunteer => {
          entry =
            entry +
            volunteer.amount_volunteered +
            " by " +
            volunteer.user_email +
            "; " +
            "\n";
        });

        item.formattedVolunteers = entry;
        delete item.volunteers;
      });
      return formattedItems;
    },

    ...mapState(["items", "error", "loaded"])
  }
};
</script>
