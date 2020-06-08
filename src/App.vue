<template>
  <v-app>
    <v-app-bar app color="primary" dark id="navbar">
      <h1>PhD RSS</h1>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="home">
      <RssFeed />
    </v-content>
  </v-app>
</template>

<script>
import RssFeed from "@/components/RssFeed.vue";
export default {
  name: "App",

  components: {
    RssFeed,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped></style>
