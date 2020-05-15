<template>
  <v-navigation-drawer class="navbar pt-0 pl-0" :floating="false" height="100%"
    ><v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-school</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Uppsala</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-school</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>KTH</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-school</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>SU</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="addFeed()">
        <v-list-item-action>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Add RSS Feed</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({}),
};
</script>
