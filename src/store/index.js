import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Feed contains an array of objects which contains an array of feed items
    feed: [],
    show_id: null,
  },
  getters: {
    getFeed: (state) => {
      const sortFn = function(a, b) {
        return b.isoDate - a.isoDate;
      };

      const mergeSortedArray = function(a, b) {
        var sorted = [],
          indexA = 0,
          indexB = 0;

        while (indexA < a.length && indexB < b.length) {
          if (sortFn(a[indexA], b[indexB]) > 0) {
            sorted.push(b[indexB++]);
          } else {
            sorted.push(a[indexA++]);
          }
        }

        if (indexB < b.length) {
          sorted = sorted.concat(b.slice(indexB));
        } else {
          sorted = sorted.concat(a.slice(indexA));
        }

        return sorted;
      };

      try {
        return mergeSortedArray(state.feed[0].feed, state.feed[1].feed);
      } catch {
        return [];
      }
    },

    getShowId: (state) => {
      return state.show_id;
    },
  },
  mutations: {
    SET_FEED: (state, { uni, feed }) => {
      state.feed.push({ university: uni, feed: feed });
    },
    SET_SHOW_ID: (state, id) => {
      state.show_id = id;
    },
  },
  actions: {
    async getFeed({ commit }, { uni, url }) {
      try {
        var feed = await this._vm.$parser.parseURL(url);
      } catch (e) {
        console.log("Error, reading local file");
        feed = this._vm.$parser.parseURL("@/assets/example.xml");
      }
      feed = feed.items.filter((item) => item.categories.includes("Doktorand"));
      for (var item of feed) {
        item.university = uni;
        item.isoDate = new Date(item.isoDate);
      }
      commit("SET_FEED", { uni, feed });
    },
    setShowId({ commit }, id) {
      commit("SET_SHOW_ID", id);
    },
  },
  modules: {},
});
