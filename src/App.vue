<template>
  <div id="app">
    <!-- Navigation Drawer -->
    <v-app>
      <v-navigation-drawer app v-model="drawer" :permanent="false" temporary>
        <v-list>
          <v-list-item>
            <v-list-item-title class="text-h6">Menu</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item link :to="'/'">
            <v-list-item-title>{{
              $t("menu.agreementTool")
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="'/agreement-history'">
            <v-list-item-title>{{
              $t("menu.agreementHistory")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- App Bar -->
      <v-app-bar app color="black" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>SoyGioco</v-toolbar-title>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <router-view />
      </v-main>

      <!-- Footer -->
      <v-footer app>
        <p class="mx-auto">Con amor para ti <3 </p>
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      drawer: false, // Controls the navigation drawer
    };
  },
});
</script>
