<template>
  <div class="home">
    <NFTSale />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NFTSale from "@/components/NFTSale.vue";

export default defineComponent({
  name: "Home",
  components: {
    NFTSale,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
