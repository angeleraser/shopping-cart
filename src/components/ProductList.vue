<template>
  <div>
    <h1>Product list</h1>

    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading" />

    <ul v-else>
      <li v-for="product in allproducts" :key="product.id">
        {{
          `${product.title} - ${product.price} Items left: ${product.inventory}`
        }}
        <button
          :disabled="!productInStock(product.id)"
          @click="addProductToCart(product)"
        >
          Add product to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ProductList",

  data() {
    return {
      loading: true,
    };
  },

  created() {
    // eslint-disable-next-line prettier/prettier
    this.getProducts().then(() => {
      this.loading = false;
    });
  },

  computed: {
    ...mapState("products", {
      allproducts: ({ items }) => items,
    }),

    ...mapGetters("products", {
      productInStock: "productInStock",
    }),
  },

  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",

      getProducts: "products/fetchProducts",
    }),
  },
};
</script>

<style></style>
