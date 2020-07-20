<template>
  <div class="appTopBar">
    <div class="appBar">
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Prototype</v-toolbar-title>
        </v-app-bar>
    </div>

    <div class="appMenu">
        <v-navigation-drawer app clipped v-model="drawer">
        <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item to="/">
                <v-list-item-icon>
                <v-icon>mdi-home-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item to="/admin">
                <v-list-item-icon>
                <v-icon>mdi-account-star</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </div>
  </div>
</template>

<script>

export default {
    name: "appTopBar",
        
    components: {
        
    },

    data: () => ({
        drawer: false,
    }),

    methods: {

    },
};
</script>

<style scoped></style>