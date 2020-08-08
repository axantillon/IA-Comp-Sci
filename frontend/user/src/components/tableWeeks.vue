<template>
    <div class="tableWeeks elevation-1 mx-2">
        <v-select
            v-model="select"
            :items="this.weeks"
            item-text="archive_week_id"
            item-value="_id"
            label="Weeks Archived"
            :return-object="true"
            :clearable="true"
            required
            @focus="getArchivedWeeks()"
            @change="$v.select.$touch(), loadWeekItems()"
            @blur="$v.select.$touch()"
        ></v-select>
        <v-data-table class="elevation-1"
            :headers="headers"
            :items="items"
            hide-default-footer
        >

        </v-data-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import { weekService } from "../services/mainService"


export default {
    
    data: () => ({
        headers: [
           {text: "Item Name", value: "item_name"},
           {text: "Description", value: "item_description"},
           {text: "Amount Requested", value: "original_amount"},
           {text: "Amount Still Needed", value: "amount_needed"},
           {text: "Users Who Volunteered", value: "volunteers"}
        ],
        select: null,
        weeks: [],
    }),

    mixins: [validationMixin],

    validations: {
      amount_needed: { required, numeric },
      select: { required },
    },

    mounted() {
        this.getArchivedWeeks()
    },

    methods: {
        async getArchivedWeeks(){
        const response = await weekService.getWeeks()
        this.weeks = response.data
        },
        loadWeekItems(){
            this.$store.dispatch('loadWeekItems', this.select.archive_week_id)
            this.$store.dispatch('changeWeek', this.select.archive_week_id)
        }
    },

    computed: mapState([
    'items' 
  ])
}
</script>