<template>
  <v-card class="mb-4 pl-4 pr-4">
    <v-row class="pa-0">
      <v-col :cols="10" class="pa-0">
        <v-card-title ref="title">
          <a
            :href="post.link"
            target="_blank"
            class="title-link"
            v-html="post.title"
          ></a>
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
        <div
          ref="OverflowDiv"
          class="rss-card--overflow-div"
          id="rss-card--overflow-div-wine"
          :style="styleObject"
        >
          <v-card-text ref="descBox" v-html="longDesc"> </v-card-text>
        </div>
      </v-col>

      <v-col class="pa-0">
        <v-card-actions>
          <v-btn icon @click="setActiveId()">
            <v-icon>
              {{
                activeId === post.guid ? "mdi-chevron-up" : "mdi-chevron-down"
              }}
            </v-icon>
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
    post: Object,
  },
  data: function() {
    return {
      isOverflowing: false,
      descBoxFullHeight: 0,
      descBoxMinHeight: 150,
    };
  },
  methods: {
    resizeInfoBox: function() {
      //Event listener that resizes info box heights dynamically
      this.descBoxFullHeight = this.$refs.descBox.clientHeight;
    },
    setActiveId: function() {
      if (this.activeId !== this.post.guid) {
        this.$store.dispatch("setShowId", this.post.guid);
        this.scrollToTop();
      } else {
        this.$store.dispatch("setShowId", null);
      }
    },
    scrollToTop: function() {
      setTimeout(() => {
        const offset = -50;
        const y =
          this.$refs.title.getBoundingClientRect().top +
          window.pageYOffset +
          offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 600);
    },
  },
  computed: {
    styleObject: function() {
      return {
        height:
          this.activeId == this.post.guid
            ? this.descBoxFullHeight + "px"
            : this.descBoxMinHeight + "px",
        overflow: "hidden",
        transition: "height 0.5s ease",
      };
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
    },
  },
  watch: {
    //Watch the heights of info box to see if they overflow infoBoxMinHeight
    descBoxFullHeight: {
      handler: function(height) {
        this.isOverflowing = height > this.descBoxMinHeight;
      },
      immediate: true,
    },
  },
  mounted() {
    //Assign height to info boxes from refs
    this.descBoxFullHeight = this.$refs.descBox.clientHeight;
  },
  created() {
    //Add event listener on windows resize. This way, we can change height on info boxes dynamically
    window.addEventListener("resize", this.resizeInfoBox);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeInfoBox);
  },
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
