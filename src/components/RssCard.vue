<template>
  <v-card class="mb-4 pl-4 pr-4">
    <v-row class="pa-0">
      <v-col :cols="10" class="pa-0">
        <v-card-title>
          <a :href="post.link" target="_blank" class="title-link">{{ post.title }}</a>
        </v-card-title>
      </v-col>

      <v-col class="col-date">
        <v-card-subtitle class="sub-date pa-0">{{ getDate }}</v-card-subtitle>
      </v-col>
    </v-row>

    <v-card-subtitle class="sub-uni">{{ post.university }}</v-card-subtitle>
    <v-divider></v-divider>

    <v-row>
      <v-col :cols="11" class="pa-0">
        <v-card-text v-show="activeId !== post.guid">{{ shortDesc }}</v-card-text>
        <v-expand-transition>
          <div v-show="activeId === post.guid">
            <v-card-text v-html="longDesc"></v-card-text>
          </div>
        </v-expand-transition>
      </v-col>

      <v-col class="pa-0">
        <v-card-actions>
          <v-btn icon @click="setActiveId()">
            <v-icon>{{ activeId === post.guid ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
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
  methods: {
    setActiveId: function() {
      if (this.activeId !== this.post.guid) {
        this.$store.dispatch("setShowId", this.post.guid);
      } else {
        this.$store.dispatch("setShowId", null);
      }
    }
  },
  computed: {
    shortDesc: function() {
      return `${this.post.contentSnippet.substring(0, 250)}...`;
    },
    longDesc: function() {
      const regex = /\n/g;
      return this.post.content.replace(regex, "</br>");
    },
    getDate: function() {
      return `${this.post.isoDate.getDate()}/${this.post.isoDate.getMonth()}/${this.post.isoDate.getFullYear()}`;
    },
    activeId: function() {
      return this.$store.getters.getShowId;
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
  align-self: center;
}

.col-date {
  display: flex;
  justify-content: flex-end;
}

.title-link {
  text-decoration: none;
  color: rgb(51, 51, 51);
}
</style>