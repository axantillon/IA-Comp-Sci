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
          ></v-select>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="this.volunteers"
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
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
    ],
    select: null,
    weeks: [],
  }),

  mounted() {
    this.getArchivedWeeks();
  },

  methods: {

    async getArchivedWeeks() {
      const response = await weekService.getWeeks();
      this.weeks = response.data;
    },
  },

  computed: {

    volunteers() {
      if(this.select === null){
        return []
      }else{
        return this.select.volunteers
      }
    },
    
    ...mapState(["error", "loaded"])
  }
};
</script>
