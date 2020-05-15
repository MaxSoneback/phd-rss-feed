<template>
  <v-card class="mb-2">
    <v-card-title> {{ post.title }}</v-card-title>
    <v-card-subtitle> {{ post.university }}</v-card-subtitle>
    <v-card-text>{{ shortDesc }}</v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "RssCard",
  props: {
    post: Object,
  },
  computed: {
    shortDesc: function() {
      return `${this.post.contentSnippet.substring(0, 250)}...`;
    },
  },
};
</script>
