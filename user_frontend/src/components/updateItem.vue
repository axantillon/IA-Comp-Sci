<template>
    <div class="updateItem">
        <v-card
            class="mx-auto"
            max-width="800"
            tile
        >
            <v-card-title>
                Update an Item
            </v-card-title>
            <hr/>
            <div class="form-updateItem" style="padding: 0px 40px">
                <form>
                    <v-text-field
                        v-model="entry_id"
                        :error-messages="entry_idErrors"
                        label="Id of Entry"
                        required
                        @input="$v.entry_id.$touch()"
                        @blur="$v.entry_id.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="user_id"
                        :error-messages="user_idErrors"
                        label="Id of User to Volunteer"
                        required
                        @input="$v.user_id.$touch()"
                        @blur="$v.user_id.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="amount_volunteer"
                        :error-messages="amount_volunteerErrors"
                        label="Amount to Volunteer"
                        required
                        @input="$v.amount_volunteer.$touch()"
                        @blur="$v.amount_volunteer.$touch()"
                    ></v-text-field>

                    <v-btn class="justify-center mb-3" @click="update">
                        <div v-if="!loading" >
                            Update
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
import {archiveWeekService} from '../services/archiveService'

export default {
    mixins: [validationMixin],

    validations: {
      entry_id: { required},
      user_id: {required},
      amount_volunteer: { required, numeric },
    },

    data: () => ({
      entry_id: '',
      user_id: '',
      amount_volunteer: '',
      loading: false,
      week_id: "26Jun"
    }),
    
    computed: {
        entry_idErrors () {
        const errors = []
        if (!this.$v.entry_id.$dirty) return errors
        !this.$v.entry_id.required && errors.push('Entry Id is required')
        return errors
      },
      user_idErrors () {
        const errors = []
        if (!this.$v.user_id.$dirty) return errors
        !this.$v.user_id.required && errors.push('Id of User is required')
        return errors
      },
      amount_volunteerErrors () {
        const errors = []
        if (!this.$v.amount_volunteer.$dirty) return errors
        !this.$v.amount_volunteer.numeric && errors.push('Quantity must be a numeric value')
        !this.$v.amount_volunteer.required && errors.push('Quantity is required')
        return errors
      },
    },

    methods: {
        async update() {
            this.loading = true

            this.$v.$touch()
            const entry_id = this.entry_id
            const user_id = this.user_id
            const amount_volunteer = parseInt(this.amount_volunteer)

            this.$v.$reset()
            this.entry_id = ''
            this.user_id = ''
            this.amount_volunteer = ''

            await archiveWeekService.updateWeekItem(this.week_id, entry_id, user_id, amount_volunteer)
            this.$store.dispatch('loadWeekItems', this.week_id)
            this.loading = false
        }
    },
}
</script>