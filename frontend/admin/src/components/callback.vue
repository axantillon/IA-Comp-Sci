<template>
  <div class="callback">
    <h1 class="red">Unauthorized Access</h1>
    <v-btn @click="reset"> Go back to Home</v-btn>
  </div>
</template>
<script>
import { setSession } from "../services/auth";
export default {
  name: "",
  mounted() {
    this.$nextTick(() => {
      setSession();
      window.location.href = "/dashboard";
    });
  },

  methods: {
    reset() {
      localStorage.clear();
      window.location.href = "/";
    }
  }
};
</script>
