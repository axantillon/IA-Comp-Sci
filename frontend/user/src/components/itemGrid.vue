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

      <div v-if="loaded" class="userVolunteerCard">
        <v-card v-if="!already_volunteered" class="pa-2">
          <v-card-title class="justify-center">
              Volunteer to attend this week!
          </v-card-title>
          <v-card-actions class="justify-center">
              <v-btn @click="volunteerUser">
                  <div v-if="!loading">
                      Volunteer!
                  </div>
                  <div v-else>
                      <v-progress-circular indeterminate></v-progress-circular>
                  </div>
              </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title class="justify-center mb-2">
            You already volunteered to attend this week!
          </v-card-title>
        </v-card>
      </div>

      <v-row>
        <v-skeleton-loader
          class="ma-6"
          v-if="!loaded"
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
import { getUserData } from "../services/auth";

export default {
  name: "itemGrid",

  components: {
    itemCard,
  },

  data: () => ({
    overlay: false,
    select: null,
    weeks: [],
    loading: false,
    already_volunteered: false,
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
      this.checkAlreadyVolunteered();
    },

    volunteerUser() {
      this.loading = true

      const name = getUserData().given_name + " " + getUserData().family_name
      const email = getUserData().email

      weekService.addUserVolunteer(this.select.archive_week_id, name, email)
      this.already_volunteered = true
      this.loading = false

    },

    checkAlreadyVolunteered() {
      const email = getUserData().email    
      
      const registered_volunteers = this.select.volunteers
      registered_volunteers.forEach(user => {
        if(user.email === email){
          this.already_volunteered = true
        }
      });
    }
  },

  computed: {

    ...mapState(["error", "items", "loaded"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
