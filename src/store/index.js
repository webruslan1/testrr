import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    invPagination: null,
    invPage: 1,
    userInventory: {
      items: null,
      selected: {
        items: {},
        price: 0.0,
      },
    },
    support: null,
    tickets: null
  },
  mutations: {
    setInventory(state, payload) {
      state.userInventory.items = payload.items;
      state.invPagination = payload.links;
    },
    updateInventory(state) {
      state.userInventory.items = state.userInventory.items.sort();
    },
    setSelectedClear(state) {
      state.userInventory.selected.items = {};
      state.userInventory.selected.price = 0.0;
    },
    setSelectInventory(state, payload) {
      if (typeof state.userInventory.selected.items[payload.inventId] !== 'undefined') {
        delete state.userInventory.selected.items[payload.inventId];
        state.userInventory.selected.price = parseFloat(
          (state.userInventory.selected.price - payload.price).toFixed(2),
        );
      } else {
        state.userInventory.selected.items[payload.inventId] = payload;
        state.userInventory.selected.price = parseFloat(
          (state.userInventory.selected.price + payload.price).toFixed(2),
        );
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setSelectAll(state, payload) {
      if (payload === true && state.userInventory.items !== null) {
        state.userInventory.selected.items = {};
        state.userInventory.selected.price = 0.0;
        state.userInventory.items.forEach(item => {
          state.userInventory.selected.items[item.inventId] = item;
          state.userInventory.selected.price = parseFloat(
            (state.userInventory.selected.price + item.price).toFixed(2),
          );
        })

      }
      if (payload === false) {
        state.userInventory.selected.items = {};
        state.userInventory.selected.price = 0.0;
      }
    },
    setBalance(state, payload) {
      state.user.balance = payload.balance;
      state.user.bonusBalance = payload.bonusBalance;
    },
    setPushInventory(state, payload) {
      state.userInventory.items.push(...payload.items);
      state.invPagination = payload.links;
      state.invPage = state.invPage + 1;
    },
    setSupport(state, payload){
      state.support = {folder: payload.filter(item => item.isFolder === true), question: payload.filter(item => item.isFolder === false)};
    },
    setTickets(state, payload){
      state.tickets = payload;
    },
    removeItems(state, payload){
      state.userInventory.items = state.userInventory.items.filter(item => !payload.includes(item.inventId))
    }
  },
  getters: {},
  actions: {
    async getInventory({ commit }) {
      var inventoryData;
      await axios.get('/api/inventory?page=1&limit=25').then((resp) => {
        
        resp.data.items = resp.data.items.map(item => {
          item.item['inventId'] = item.id;
          item.item.canBet = item.canBet;
          item.item.canSell = item.canSell;
          item.item.canSwap = item.canSwap;
          item.item.canWithdraw = item.canWithdraw;
          return item.item;
        }).sort((a, b) => b.price - a.price);
        inventoryData = resp.data;
        this.state.invPage = 1;
      });
      commit('setInventory', inventoryData);
    },
    async pushInventory({ commit }) {
      var inventoryData;
      await axios.get(`/api/inventory?page=${this.state.invPage + 1}&limit=25`).then((resp) => {
        resp.data.items = resp.data.items.map(item => {
          item.item['inventId'] = item.id;
          item.item.canBet = item.canBet;
          item.item.canSell = item.canSell;
          item.item.canSwap = item.canSwap;
          item.item.canWithdraw = item.canWithdraw;
          return item.item;
        }).sort((a, b) => b.price - a.price);
        inventoryData = resp.data;
      });
      commit('setPushInventory', inventoryData);
    },
    removeInventoryItems({commit}, array){
      commit('removeItems', array);
    },
    updateInventory({ commit }) {
      commit('updateInventory');
    },
    async selectInventory({ commit }, inv) {
      commit('setSelectInventory', inv);
    },
    clearSelect({ commit }) {
      commit('setSelectedClear');
    },
    async getUser({ commit }) {
      var user;
      await axios.get('/api/user').then((resp) => {
        user = resp.data;
        
      });
      commit('setUser', user);
    },
    selectAll({ commit }, bool) {
      commit('setSelectAll', bool)
    },
    async updateBalance({ commit }) {
      var objBalance;
      await axios.get('/api/user/balance').then((resp) => {
        objBalance = resp.data;
      })
      commit('setBalance', objBalance);
    },
    async getSupport({commit}){
      var supportDate;
      await axios.get('/api/support').then((resp) => {
        supportDate = resp.data;
      });
      commit('setSupport', supportDate);
    },
    async getTickets({commit}){
      var ticketsData;
      await axios.get('/api/support/ticket').then((resp) => {
        ticketsData = resp.data;
      });
      commit('setTickets', ticketsData);
    }
  },
});


