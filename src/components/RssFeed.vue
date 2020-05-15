<template>
  <v-container>
    <div v-for="item in feed" :key="item.guid">
      <RssCard :post="item" />
    </div>
  </v-container>
</template>

<script>
import RssCard from "./RssCard";
export default {
  name: "RssFeed",
  components: {
    RssCard,
  },
  data: () => ({}),
  beforeMount() {
    const rss_uppsala =
      "http://cors-anywhere.herokuapp.com/https://uu.varbi.com/what:rssfeed/";
    const rss_kth =
      "http://cors-anywhere.herokuapp.com/https://kth.varbi.com/what:rssfeed/";
    this.addFeed("Uppsala Universitet", rss_uppsala);
    this.addFeed("KTH", rss_kth);
  },
  methods: {
    addFeed: function(university, url_rss) {
      this.$store.dispatch("getFeed", { uni: university, url: url_rss });
    },
  },
  computed: {
    feed: function() {
      return this.$store.getters.getFeed;
    },
  },
};
</script>
