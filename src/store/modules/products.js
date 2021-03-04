/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import shop from "@/api/shop.js";

export default {
  namespaced: true,

  state: {
    items: [],
  },

  actions: {
    fetchProducts(
      { commit, state, rootState, rootGetters } /* context */,
      payload
    ) {
      return new Promise((resolve, reject) => {
        shop.getProducts((data) => {
          commit("setProducts", data);

          resolve();
        });
      });
    },
  },

  getters: {
    productInStock(state, getters, rootState) {
      return (id) => state.items.find((item) => item.id === id).inventory;
    },
  },

  mutations: {
    setProducts(state, payload) {
      state.items = payload;
    },

    decrementItemInventory(state, product) {
      product.inventory -= 1;
    },
  },
};
