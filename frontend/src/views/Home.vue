<template>
  <div class="home">
    <router-view/>
    <hr/>
    <itemGrid/>
  </div>
</template> 

<script>
import itemGrid from "../components/itemGrid"

export default {
  name: "Home",
  components: {
      itemGrid,
  }
};
</script>
