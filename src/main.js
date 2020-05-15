import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const Parser = require("rss-parser");
const parser = new Parser();

Vue.prototype.$parser = parser;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
