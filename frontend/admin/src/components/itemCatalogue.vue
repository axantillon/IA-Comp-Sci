<template>
    <div class="itemCatalogue">
        <v-card>
            <v-card-title>
                Item Catalogue
            </v-card-title>
            <v-card-text>
                <v-card class="addItem">
                    <div class="form-addItem" style="padding: 0px 40px">
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
                                v-model="item_description"
                                :error-messages="item_descriptionErrors"
                                label="Item Description"
                                required
                                @input="$v.item_description.$touch()"
                                @blur="$v.item_description.$touch()"
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

                <v-card class="itemTable">
                    <v-data-table class="elevation-1"
                        :headers="headers"
                        :items="main_items"
                        hide-default-footer
                    ></v-data-table>
                </v-card>
            </v-card-text>
        </v-card>
    </div>

</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { itemService } from '../services/mainServices'

export default {
    mixins: [validationMixin],

    validations: {
      item_description: { required },
      name: { required },
    },

    data: () => ({
        name: '',
        item_description: '',
        loading: false,
        headers: [
            {text: "Item Name", value: "name"},
            {text: "Item Description", value: "description"},
        ]
    }),
    
    computed: {
        item_descriptionErrors () {
            const errors = []
            if (!this.$v.item_description.$dirty) return errors
            !this.$v.item_description.required && errors.push('Description is required')
            return errors
        },
        nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name of item is required')
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
            const name = this.name
            const item_description = this.item_description

            this.$v.$reset()
            this.name = ''
            this.item_description = ''

            await itemService.insertItem(name, item_description)
            this.loading = false
            this.$store.dispatch('loadMainItems')
        }
    },

    mounted() {
        this.$store.dispatch('loadMainItems')
    },
}
</script>