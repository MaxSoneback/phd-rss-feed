<template>
  <v-card class="mb-2 pl-4 pr-4">
    <v-row class="pa-0">
      <v-col :cols="10" class="pa-0">
        <v-card-title>{{ post.title }}</v-card-title>
      </v-col>

      <v-col class="pa-0">
        <v-card-subtitle class="sub-date">{{ getDate }}</v-card-subtitle>
      </v-col>
    </v-row>

    <v-card-subtitle class="sub-uni">{{ post.university }}</v-card-subtitle>
    <v-divider></v-divider>

    <v-row>
      <v-col :cols="11">
        <v-card-text v-show="!show">{{ shortDesc }}</v-card-text>
        <v-expand-transition>
          <div v-show="show">
            <v-card-text>{{post.contentSnippet}}</v-card-text>
          </div>
        </v-expand-transition>
      </v-col>

      <v-col>
        <v-card-actions>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "RssCard",
  props: {
    post: Object
  },
  data: function() {
    return {
      show: false
    };
  },
  computed: {
    shortDesc: function() {
      return `${this.post.contentSnippet.substring(0, 250)}...`;
    },
    getDate: function() {
      return `${this.post.isoDate.getDate()}/${this.post.isoDate.getMonth()}/${this.post.isoDate.getFullYear()}`;
    }
  }
};
</script>

<style scoped>
.sub-uni {
  margin-top: -20px;
}

.sub-date {
  text-justify: right;
}
</style>