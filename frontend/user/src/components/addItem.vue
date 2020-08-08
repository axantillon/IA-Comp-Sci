<template>
    <div class="addItem">
        <v-card
            class="mx-auto"
            max-width="800"
            tile
        >
            <v-card-title>
                Add an Item
            </v-card-title>
            <hr>
            <div class="form-addItem" style="padding: 0px 40px">
                <form>
                    <v-select
                        v-model="select"
                        :items="main_items"
                        item-text="name"
                        item-value="_id"
                        label="Item Name"
                        :return-object="true"
                        required
                        :error-messages="selectErrors"
                        @change="$v.select.$touch()"
                        @blur="$v.select.$touch()"
                    ></v-select>
                    <v-text-field
                        v-model="amount_needed"
                        :error-messages="amount_neededErrors"
                        label="Amount Needed"
                        required
                        @input="$v.amount_needed.$touch()"
                        @blur="$v.amount_needed.$touch()"
                    ></v-text-field>

                    <v-btn class="justify-center mb-3" @click="add">
                        <div v-if="!loading">
                            Add
                        </div>
                        <div v-else>
                            <v-progress-circular
                                indeterminate
                            ></v-progress-circular>
                        </div>
                    </v-btn>
                </form>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import { archiveWeekService } from '../services/archiveService'

export default {
    mixins: [validationMixin],

    validations: {
      amount_needed: { required, numeric },
      select: { required },
    },

    data: () => ({
      amount_needed: '',
      select: null,
      loading: false,
      week_id: "26Jun"
    }),
    
    computed: {
        amount_neededErrors () {
            const errors = []
            if (!this.$v.amount_needed.$dirty) return errors
            !this.$v.amount_needed.numeric && errors.push('Quantity needed must be a numeric value')
            !this.$v.amount_needed.required && errors.push('Quantity needed is required')
            return errors
        },
        selectErrors () {
            const errors = []
            if (!this.$v.select.$dirty) return errors
            !this.$v.select.required && errors.push('Item Name is required')
            return errors
        },
        ...mapState([
            'main_items', 'error', 'loaded' 
        ])
    },
 
    methods: {
        async add() {
            this.loading = true,
            this.$v.$touch()
            const item_id = this.select._id
            const item_name = this.select.name
            const amount_needed = parseInt(this.amount_needed)

            this.$v.$reset()
            this.select = null
            this.amount_needed = ''

            await archiveWeekService.insertWeekItem(this.week_id, item_id, item_name, amount_needed)
            this.$store.dispatch('loadWeekItems', this.week_id)
            this.loading = false
        }
    },

    mounted() {
        this.$store.dispatch('loadMainItems')
    },
}
</script>