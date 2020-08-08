<template>
    <div class="addWeek">
        <v-card class="mx-auto" max-width=800 tile>

            <v-card-title>
                Add New Week for Donations
            </v-card-title>

            <hr>

            <v-card-text>
                <!-- Date Picker-->
                <v-col class="datePicker" cols="1" sm="5" md="4">
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
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" range>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu=false">Ok</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn class="ma-2" @click="addNewWeek">
                    <div v-if="!loading">
                        Add
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
import { weekService } from "../services/mainService"

export default {

    data: () => ({
        dates: [new Date().toISOString().substr(0, 10)],
        menu: false,
        loading: false,
    }),

    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },

    methods: {
        async addNewWeek() {
            this.loading = true
            const week = this.dateRangeText

            this.dates = []

            await weekService.addWeek(week)
            this.loading = false
        }
    }

}

</script>