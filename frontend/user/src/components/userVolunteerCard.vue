<template>
    <div class="userVolunteerCard">
        <v-card class="pa-2">
            <v-card-title class="justify-center">
                Volunteer to attend this week!
            </v-card-title>
            <v-card-actions class="justify-center">
                <v-btn @click="volunteerUser">
                    <div v-if="!loading">
                        Volunteer!
                    </div>
                    <div v-else-if="error" class="red">
                        You already volunteered!
                    </div>
                    <div v-else>
                        <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
//import { weekService } from "../services/mainServices"

export default {

    data: () => ({
        loading: false,
        error: false,
    }),

    methods: {
        volunteerUser() {

        }
    }
    
}
</script>