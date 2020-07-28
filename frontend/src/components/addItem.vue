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
                    <v-text-field
                        v-model="item_id"
                        :error-messages="item_idErrors"
                        label="Id of Item"
                        required
                        @input="$v.item_id.$touch()"
                        @blur="$v.item_id.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="item_name"
                        :error-messages="item_nameErrors"
                        label="Name of Item"
                        required
                        @input="$v.item_name.$touch()"
                        @blur="$v.item_name.$touch()"
                    ></v-text-field>
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
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import ItemService from '../services/ItemService'

export default {
    mixins: [validationMixin],

    validations: {
      item_name: { required},
      item_id: { required},
      amount_needed: { required, numeric },
    },

    data: () => ({
      item_id: '',
      item_name: '',
      amount_needed: '',
      loading: false,
      week_id: "26Jun"
    }),
    
    computed: {
        item_nameErrors () {
            const errors = []
            if (!this.$v.item_name.$dirty) return errors
            !this.$v.item_name.required && errors.push('Item Name is required')
            return errors
        },
        item_idErrors () {
            const errors = []
            if (!this.$v.item_id.$dirty) return errors
            !this.$v.item_id.required && errors.push('Item ID is required')
            return errors
        },
        amount_neededErrors () {
            const errors = []
            if (!this.$v.amount_needed.$dirty) return errors
            !this.$v.amount_needed.numeric && errors.push('Quantity needed must be a numeric value')
            !this.$v.amount_needed.required && errors.push('Quantity needed is required')
            return errors
        },
    },

    methods: {
        async add() {
            this.loading = true,
            this.$v.$touch()
            const item_id = this.item_id
            const item_name = this.item_name
            const amount_needed = parseInt(this.amount_needed)

            this.$v.$reset()
            this.item_id = ''
            this.item_name = ''
            this.amount_needed = ''

            await ItemService.insertItem(this.week_id, item_id, item_name, amount_needed)
            this.$store.dispatch('loadItems', this.week_id)
            this.loading = false
        }
    },
}
</script>