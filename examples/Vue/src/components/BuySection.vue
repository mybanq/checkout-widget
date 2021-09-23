<template>
  <div class="container-buy-section">
    <div class="title">Current Price</div>
    <div class="price">
      <img src="@/assets/etherium.svg" />
      0.15
      <span class="title converted-price">($349.91)</span>
    </div>
    <PayButton/>
  </div>
</template>

<script lang="ts">
import PayButton from "./PayButton.vue";
export default {
  name: "BuySection",
  components: {PayButton},
};
</script>

<style scoped>
.container-buy-section {
  max-width: 400px;
  display: flex;
  flex-direction: column !important;
  align-items: flex-start;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  background: #fbfdff;
  padding: 10px;
}

.price {
  display: flex;
  align-items: center;
  font-family: SansSerif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 25px;
  color: #353840;
  padding: 13px 0;
}

img {
  width: 30px;
  height: 30px;
}

.title {
  font-family: SansSerif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #caced1;
}

.converted-price {
  padding-left: 5px;
}

.banqButton {
  width: 200px;
  height: 24px;
  border: none;
  color: #ffffff;
  background: #353840;
}
</style>
