<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ `${product.title} - ${product.price} - ${product.quantity}` }}
      </li>
    </ul>
    <h2>TOTAL: {{ cartTotal }}</h2>

    <button :disabled="!products.length" @click="$store.dispatch('checkout')">
      Checkout
    </button>

    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ShoppingCart",

  computed: {
    ...mapGetters("cart", {
      products: "cartProducts",

      cartTotal: "cartTotal",
    }),

    ...mapState("cart", {
      checkoutStatus: (state) => state.checkoutStatus,
    }),
  },

  methods: {
    ...mapActions("cart", {
      checkout: "checkout",
    }),
  },
};
</script>

<style></style>
