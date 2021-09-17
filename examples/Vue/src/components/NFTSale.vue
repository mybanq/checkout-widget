<template class="container">
  <div class="left-container">
    <div class="nft-img"></div>
    <ListItem title="description" />
    <ListItem title="properties" />
    <ListItem title="statisticks" />
    <ListItem title="about" />
    <ListItem title="details" />
  </div>
  <div class="right-container">
    <div class="category">banqCats</div>
    <div class="nft-name">banqbandito</div>
    <div class="owned-by">
      Owned by <span class="category">banq-cats-auction</span>
    </div>
    <BuySection />
    <ListItem title="price history" />
    <ListItem title="listings" />
    <ListItem title="offers" />
  </div>
</template>

<script lang="ts">
import BuySection from "@/components/BuySection.vue";
import ListItem from "@/components/ListItem.vue";

export default {
  name: "NFTSale",
  components: {
    BuySection,
    ListItem,
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left-container {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  width: 100%;
  max-width: 285px;
}
.right-container {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  width: 100%;
  max-width: 400px;
  margin-left: 13px;
}
.nft-img {
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  width: 284px;
  height: 284px;
  background: url("../assets/nft-image.svg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
}

.category {
  font-family: SansSerif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #2081e2;
  padding-bottom: 13px;
}

.nft-name {
  font-family: SansSerif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 25px;
  color: #353840;
  padding-bottom: 13px;
}

.owned-by {
  font-family: SansSerif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #caced1;
  padding-bottom: 13px;
}
</style>
