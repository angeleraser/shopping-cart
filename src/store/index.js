/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // data
    products: [],
    cart: [],
    checkoutStatus: null,
  },

  getters: {
    // computed

    cartProducts(state, _getters) {
      return state.cart.map((item) => {
        const { title, price, id } = state.products.find(
          (el) => el.id === item.id
        );

        return {
          quantity: item.quantity,
          title,
          price,
          id,
        };
      });
    },

    cartTotal(_, { cartProducts }) {
      return `$ ${Math.round(
        cartProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        )
      )}`;
    },

    productsInStock(state, getters) {
      return (id) => !state.products.find((item) => item.id === id).inventory;
    },
  },

  actions: {
    // methods
    fetchProducts({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        shop.getProducts((data) => {
          commit("setProducts", data);

          resolve();
        });
      });
    },

    addProductToCart({ commit, state }, product) {
      if (product.inventory > 0) {
        const cartItem = state.cart.find((item) => item.id === product.id);

        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", product);
        }

        commit("decrementItemInventory", product);
      }
    },

    checkout({ commit, state }) {
      shop.buyProducts(
        state.cart,
        () => {
          //On success
          commit("emptyCart");

          commit("setCheckoutStatus", "success");
        },
        () => {
          // On Failed
          commit("setCheckoutStatus", "failed");
        }
      );
    },
  },

  mutations: {
    setProducts(state, payload) {
      // update products
      state.products = payload;
    },

    pushProductToCart(state, id) {
      state.cart = [...state.cart, { id, quantity: 1 }];
    },

    incrementItemQuantity(state, product) {
      state.cart = state.cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },

    decrementItemInventory(state, product) {
      state.products = state.products.map((item) =>
        item.id === product.id
          ? { ...item, inventory: item.inventory - 1 }
          : item
      );
    },

    emptyCart(state, payload) {
      state.cart = [];
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
  },
});
