<template>
  <div class="dashboard">
    <div class="">
      <itemGrid/>
    </div>
  </div>
</template> 

<script>
import itemGrid from "../components/itemGrid"

export default {
  name: "Dashboard",
  components: {
      itemGrid,
  }
};
</script>
