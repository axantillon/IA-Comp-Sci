<template>
    <div class="addPetition">
        <v-card flat>
            <v-card-title> Create New Petition List</v-card-title>
            <v-card-text>
                <v-card class="datePicker" max-width=600 >
                    <v-col cols="1" sm="5" md="5">
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateRangeText"
                                label="Pick Date Range"
                                prepend-icon="mdi-calendar-today"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateRangeTextErrors"
                                @change="$v.dateRangeText.$touch()"
                                @blur="$v.dateRangeText.$touch()"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="dates" range>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu=false">Ok</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-card>

                <v-card class="addItem" max-width=800 style="padding: 0px 40px">
                    <form class="mt-4 py-2">
                        <v-select
                            v-model="select"
                            :items="main_items"
                            item-text="name"
                            item-value="_id"
                            label="Item Name"
                            :return-object="true"
                            required
                            clearable
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
                            Add
                        </v-btn>
                    </form>
                </v-card>

                <v-card class="itemList mt-4" tile max-width=600>
                    <v-card-title> Items: </v-card-title>
                    <v-card-text>
                        <itemList 
                            :items="items"
                            v-on:removeItem="removeItem"
                        />
                    </v-card-text>
                </v-card>

            </v-card-text>
            <v-card-actions>
                <v-btn @click="createNewList">
                    <div v-if="!loading">
                        Create New List
                    </div>
                    <div v-else>
                        <v-progress-circular
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import itemList from "./itemList"
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import { archiveWeekService, weekService } from "../services/mainServices"

export default {

    mixins: [validationMixin],

    validations: {
        dateRangeText: { required },
        amount_needed: { required, numeric },
        select: { required },
    },

    components: {
        itemList,
    },

    data: () => ({
        items: [],
        dates: [],
        menu: false,
        loading: false,
        amount_needed: '',
        select: null,
    }),

    computed: {
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
        dateRangeTextErrors () {
            const errors = []
            if (!this.$v.dateRangeText.$dirty) return errors
            !this.$v.dateRangeText.required && errors.push('Required')
            return errors
        },
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
        async createNewList() {
            this.loading = true
            const week = this.dateRangeText

            this.dates = []

            await weekService.addWeek(week)

            for(var i = 0; i < this.items.length; i += 1) {
                await archiveWeekService.insertWeekItem(week, this.items[i].item_id, parseInt(this.items[i].amount_needed))

            }

            this.items = []
            this.loading = false
        },
        add() {
            this.$v.$touch()
            const item_id = this.select._id
            const item_name = this.select.name
            const amount_needed = parseInt(this.amount_needed)

            this.$v.$reset()
            this.select = null
            this.amount_needed = ''

            const element = {item_id: item_id, name: item_name, amount_needed: amount_needed}
            this.items.push(element)
        },
        removeItem(item_id){
            this.items = this.items.filter(item=>item.item_id != item_id)
        }
    },

    mounted() {
        this.$store.dispatch('loadMainItems')
    },

}
</script>