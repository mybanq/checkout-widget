<template>
  <checkout-widget-dialog
      :open="isOpen"
      :environment="getEnv()"
      :paymentLink="getPaymentLink()"
      :mode='"pre-register-flow"'
      v-on:close="setClose"
      v-on:paymentSuccess="onPaymentSuccess"

  />
  <pay-with-banq-button class="banqButton" @click="setOpen">Pay with banq</pay-with-banq-button>
</template>

<script lang="ts">
import "@banq/checkout-widget";
import { ref } from 'vue';
export default {
  name: "PayButton",
  setup() {
    const isOpen = ref(false);

    const setOpen = () => {
      isOpen.value = true;
    };
    const setClose = () => {
      isOpen.value = false;
    };

    //example of function to get environment
    const getEnv = () => {
      return 'development'
    }

    // example of function to get paymentLink
    const getPaymentLink = () => {
      return 'https://link.banq.com/4x1t09WiOjb'
    }

    // example of function which will be triggered on payment success
    const onPaymentSuccess = () => {
      console.log('Payment success')
    }
    return {
      isOpen,
      setOpen,
      setClose,
      getEnv,
      getPaymentLink,
      onPaymentSuccess
    };
  },
}
</script>

<style scoped>
.banqButton {
  width: 200px;
  height: 24px;
  border: none;
  color: #ffffff;
  background: #353840;
}
</style>
