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

    <v-card class="UpdateList">

      <v-card-title>
        Update this list by adding new items
      </v-card-title>

      <v-card-text>
        <v-card class="Add Item" max-width="800" style="padding: 0px 40px">
          <form class="mt-4 py-2">
            <v-select
              v-model="item_select"
              :items="main_items"
              item-text="name"
              item-value="_id"
              label="Item Name"
              :return-object="true"
              required
              clearable
              :error-messages="item_selectErrors"
              @change="$v.item_select.$touch()"
              @blur="$v.item_select.$touch()"
            ></v-select>
            <v-text-field
              v-model="amount_needed"
              :error-messages="amount_neededErrors"
              label="Amount Needed"
              required
              @input="$v.amount_needed.$touch()"
              @blur="$v.amount_needed.$touch()"
            ></v-text-field>

            <v-btn class="justify-center mb-3"  @click="add">
              Add
            </v-btn>
          </form>
        </v-card>

        <v-card class="itemList mt-4" tile max-width="600">
          <v-card-title> Items: </v-card-title>
          <v-card-text>
            <itemList :items="new_items" v-on:removeItem="removeItem" />
          </v-card-text>
          <v-card-actions>
            <v-btn @click="updateList" :disabled="denySubmit">
              <div v-if="!loading">
                Update List
              </div>
              <div v-else>
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import itemList from "./itemList";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import { archiveWeekService, weekService } from "../services/mainServices";

export default {

  mixins: [validationMixin],

  validations: {
    amount_needed: { required, numeric },
    item_select: { required }
  },

  components: {
    itemList
  },

  data: () => ({
    headers: [
      { text: "Item Name", value: "item_name" },
      { text: "Description", value: "item_description" },
      { text: "Amount Requested", value: "original_amount" },
      { text: "Amount Still Needed", value: "amount_needed" },
      { text: "Users Who Volunteered to Donate", value: "formattedVolunteers" }
    ],
    select: null,
    weeks: [],
    item_select: null,
    new_items: [],
    loading: false,
    amount_needed: "",
  }),

  mounted() {
    this.getArchivedWeeks();
    this.$store.dispatch("loadMainItems");
  },

  methods: {

    async getArchivedWeeks() {
      const response = await weekService.getWeeks();
      this.weeks = response.data;
    },

    loadWeekItems() {
      this.$store.dispatch("loadWeekItems", this.select.archive_week_id);
      this.$store.dispatch("changeWeek", this.select.archive_week_id);
    },

    async updateList() {
      this.loading = true;
      const week = this.select.archive_week_id;

      for (var i = 0; i < this.new_items.length; i += 1) {
          await archiveWeekService.insertWeekItem(
          week,
          this.new_items[i].item_id,
          parseInt(this.new_items[i].amount_needed)
          );
      }

      this.new_items = [];
      this.loading = false;

      this.$store.dispatch("loadWeekItems", this.select.archive_week_id);
    },

    add() {
      this.$v.$touch();
      const item_id = this.item_select._id;
      const item_name = this.item_select.name;
      const amount_needed = parseInt(this.amount_needed);

      this.$v.$reset();
      this.item_select = null;
      this.amount_needed = "";

      const element = {
          item_id: item_id,
          name: item_name,
          amount_needed: amount_needed
      };
      this.new_items.push(element);
    },

    removeItem(item_id) {
      this.new_items = this.new_items.filter(item => item.item_id != item_id);
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

    amount_neededErrors() {
      const errors = [];
      if (!this.$v.amount_needed.$dirty) return errors;
      !this.$v.amount_needed.numeric &&
          errors.push("Quantity needed must be a numeric value");
      !this.$v.amount_needed.required &&
          errors.push("Quantity needed is required");
      return errors;
    },

    item_selectErrors() {
        const errors = [];
        if (!this.$v.item_select.$dirty) return errors;
        !this.$v.item_select.required && errors.push("Item Name is required");
        return errors;
    },

    denySubmit(){
        return (this.items.length == 0)
    },

    ...mapState(["main_items", "items", "error", "loaded"])
  }
};
</script>
