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
                        v-model="name"
                        :error-messages="nameErrors"
                        label="Name of Item"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                    ></v-text-field>
                    <v-text-field
                        v-model="quantity"
                        :error-messages="quantityErrors"
                        label="Quantity to Volunteer"
                        required
                        @input="$v.quantity.$touch()"
                        @blur="$v.quantity.$touch()"
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
import ItemService from '../services/ItemService'

export default {
    mixins: [validationMixin],

    validations: {
      name: { required},
      quantity: { required, numeric },
    },

    data: () => ({
      name: '',
      quantity: '',
      loading: false,
    }),
    
    computed: {
        nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name of item is required')
        return errors
      },
      quantityErrors () {
        const errors = []
        if (!this.$v.quantity.$dirty) return errors
        !this.$v.quantity.numeric && errors.push('Quantity must be a numeric value')
        !this.$v.quantity.required && errors.push('Quantity is required')
        return errors
      },
    },

    methods: {
        async update() {
            this.loading = true

            this.$v.$touch()
            const name = this.name
            const quantity = parseInt(this.quantity)

            this.$v.$reset()
            this.name = ''
            this.quantity = ''

            await ItemService.updateItem(name, quantity)
            this.$store.dispatch('loadItems')
            this.loading = false
        }
    },
}
</script>