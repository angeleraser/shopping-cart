/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import shop from "@/api/shop.js";

export default {
  namespaced: true,

  state: {
    checkoutStatus: null,
    items: [],
  },

  actions: {
    // virst argument is called Context
    addProductToCart({ commit, state, rootState, rootGetters }, product) {
      const productInStock = rootGetters["products/productInStock"];

      if (productInStock(product.id)) {
        const cartItem = state.items.find((item) => item.id === product.id);

        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }

        commit("products/decrementItemInventory", product, { root: true });
      }
    },

    checkout({ commit, state, rootState, rootGetters }) {
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

  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((item) => {
        const { title, price, id } = rootState.products.items.find(
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

    cartTotal(state, { cartProducts }, rootState) {
      return `$ ${Math.round(
        cartProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        )
      )}`;
    },
  },

  mutations: {
    pushProductToCart(state, id) {
      state.items.push({ id, quantity: 1 });
    },

    incrementItemQuantity(state, product) {
      product.quantity++;
    },

    emptyCart(state, payload) {
      state.items = [];
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
  },
};
