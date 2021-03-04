/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Vuex from "vuex";
import Vue from "vue";
import actions from "@/store/actions.js";
import products from "@/store/modules/products.js";
import cart from "@/store/modules/cart.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  modules: {
    products,
    cart,
  },

  getters: {},

  actions,

  mutations: {},
});
