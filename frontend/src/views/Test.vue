<template>
  <div class="test d-flex flex-wrap ">
    <itemCard/>
    <itemCard/>
    <itemCard/>
    <itemCard/>
    <itemCard/>
  </div>
</template> 

<script>
// @ is an alias to /src
import itemCard from "../components/itemCard"

export default {
  name: "Test",
  components: {
      itemCard,
  }
};
</script>
