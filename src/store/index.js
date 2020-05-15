import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Feed contains an array of objects which contains an array of feed items
    feed: [],
  },
  getters: {
    getFeed: (state) => {
      const sortFn = function(a, b) {
        return a.isoDate - b.isoDate;
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
  },
  mutations: {
    setFeed: (state, { uni, feed }) => {
      state.feed.push({ university: uni, feed: feed });
    },
  },
  actions: {
    async getFeed({ commit }, { uni, url }) {
      var feed = await this._vm.$parser.parseURL(url);
      feed = feed.items.filter((item) => item.categories.includes("Doktorand"));
      for (var item of feed) {
        item.university = uni;
      }
      commit("setFeed", { uni, feed });
    },
  },
  modules: {},
});
