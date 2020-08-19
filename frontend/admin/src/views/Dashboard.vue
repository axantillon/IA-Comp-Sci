<template>
  <div class="dashboard">
    <div class="tabs">
      <v-tabs>
        <div class="d-flex justify-center">
          <v-tab>
            New Petition List
          </v-tab>
          <v-tab>
            Inspect Previous Lists
          </v-tab>
          <v-tab>
            Catalogue of Items
          </v-tab>
        </div>
        <v-tab-item>
          <addPetition />
        </v-tab-item>
        <v-tab-item>
          <petitionPage />
        </v-tab-item>
        <v-tab-item>
          <itemCatalogue />
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import addPetition from "../components/addPetition";
import petitionPage from "../components/petitionPage";
import itemCatalogue from "../components/itemCatalogue";

export default {
  name: "Dashboard",

  components: {
    addPetition,
    petitionPage,
    itemCatalogue
  },

  data: () => ({
    //
  }),

  methods: {}
};
</script>
