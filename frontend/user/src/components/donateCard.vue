<template>
  <div class="donateCard">
    <v-overlay :value="overlay" light>
      <v-card min-width="300" min-height="200">
        <div class="d-flex justify-end">
          <v-btn class="ma-2" fab x-small @click="emitChangeOverlay(), cleardata()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-title class="justify-center"> Help Us Out! </v-card-title>
        <v-card-subtitle class=" h1 justify-center ">
          {{ item_name }}
        </v-card-subtitle>
        <v-card-text>
          <div class="">We still need {{ quantityNeeded }} for this week!</div>
          <div class="">
            {{ item_desc }}
          </div>
          <div class="form-updateItem pa-2">
            <form>
              <v-text-field
                v-model="quantity"
                :error-messages="quantityErrors"
                label="Quantity to Volunteer"
                required
                @input="$v.quantity.$touch()"
                @blur="$v.quantity.$touch()"
              ></v-text-field>
            </form>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn class="justify-center mb-3" :disabled="this.$v.quantity.$invalid || quantityLimit" @click="donate">
            <div v-if="!loading">
              Donate
            </div>
            <div v-else>
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import { archiveWeekService } from "../services/mainServices";
import { getUserData } from "../services/auth";


export default {
  name: "donateCard",

  props: [
    "item_name",
    "item_desc",
    "quantityNeeded",
    "entry_id",
    "week_id",
    "overlay"
  ],

  mixins: [validationMixin],

  validations: {
    quantity: { required, numeric }
  },

  data: () => ({
    quantity: "",
    loading: false
  }),

  computed: {
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.numeric &&
        errors.push("Quantity must be a numeric value");
      !this.$v.quantity.required && errors.push("Quantity is required");
      !(this.quantity <= this.quantityNeeded) && errors.push("Quantity has to be less than what is needed");
      return errors;
    },
    quantityLimit() {
      return !(this.quantity <= this.quantityNeeded)
    }
  },

  methods: {
    async donate() {

      this.loading = true;
      this.$v.$touch();
      const user_email = getUserData().email;
      const entry_id = this.entry_id;
      const quantity = parseInt(this.quantity);

      this.cleardata()

      await archiveWeekService.updateWeekItem(
        this.week_id,
        entry_id,
        user_email,
        quantity
      );
      this.$store.dispatch("loadWeekItems", this.week_id);

      this.emitChangeOverlay();
      this.loading = false;
    },
    emitChangeOverlay() {
      this.$emit("changeOverlayChild");
    },
    cleardata() {
      this.$v.$reset();
      this.quantity = "";
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
