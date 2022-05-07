<template>
  <v-app-bar
      app
      :color="color"
      dark
      clipped-left
      height="50"
  >
    <router-link class="d-flex align-center" style="text-decoration: none; color: white" to="/">
      <v-img alt="MSP Overview Logo" class="shrink mr-2" contain src="@/assets/logo.png"
             transition="scale-transition" width="40"/>
      <strong>Microsoft Tasks Overview</strong>
    </router-link>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn icon small v-if="!$vuetify.theme.dark" @click="toggleTheme()" class="mr-3">
      <v-icon>mdi-weather-sunny</v-icon>
    </v-btn>
    <v-btn icon small v-if="$vuetify.theme.dark" @click="toggleTheme()" class="mr-3">
      <v-icon>mdi-weather-night</v-icon>
    </v-btn>
    <v-btn class="mr-3" icon small to="/about">
      <v-icon>mdi-information</v-icon>
    </v-btn>
    <v-btn class="mr-3" icon small to="/profile">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn class="mr-3" icon small @click="signOut()">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      search: '',
      theme: '',
    }
  },
  mounted() {
    this.theme = localStorage.getItem("dark_theme");
    if (this.theme) {
      if (this.theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$vuetify.theme.dark
    },
    color() {
      if (this.currentTheme) {
        return '#363636'
      }
      return 'primary'
    },
    name() {
      return this.$msal.getName()
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    signOut() {
      this.$msal.signOut();
    }
  }
};
</script>