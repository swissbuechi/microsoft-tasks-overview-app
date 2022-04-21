<template>
  <v-app v-if="isAuthenticated">
    <v-app-bar :color="color" app clipped-left dark>
      <router-link class="d-flex align-center" style="text-decoration: none; color: white" to="/">
        <v-img alt="Roller Shutter Logo" class="shrink mr-2" contain src="@/assets/logo.png"
               transition="scale-transition" width="40"/>
        <strong>Microsoft Tasks Overview</strong>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if="!$vuetify.theme.dark" class="mr-3" icon small @click="toggleThemeButton()">
        <v-icon>mdi-weather-sunny</v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.theme.dark" class="mr-3" icon small @click="toggleThemeButton()">
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>
      <v-btn class="mr-3" icon small to="about">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" class="mr-3" icon small to="Settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" class="mr-3" icon small @click="signOut()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <SnackBar></SnackBar>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import SnackBar from "@/components/SnackBar"
import GraphService from "@/service/GraphService"

@Component({
  components: {
    SnackBar,
  }
})
export default class App extends Vue {
  private theme: any
  private me = ''

  public get color(): any {
    if (this.currentTheme) {
      return '#1E1E1E'
    }
    return 'primary'
  }

  public get currentTheme(): any {
    return this.$vuetify.theme.dark
  }

  mounted() {
    this.signInRedirect()
    this.toggleThemeFromStorage()
    this.getMe()
  }

  public get isAuthenticated(): boolean {
    return this.$msal.isAuthenticated;
  }

  @Watch('isAuthenticated')
  onPropertyChanged(value: boolean, oldValue: boolean) {
    this.getMe()
    // console.log("Changed Authenticated Test")
    // Do stuff with the watcher here.
  }


  public signInRedirect() {
    this.$msal.signInRedirect();

  }

  public async signOut() {
    await this.$msal.signOut();
  }

  public async getMe() {
    if (this.isAuthenticated) {
      this.me = await GraphService.getSelf()
    }
  }

  public toggleThemeFromStorage() {
    this.theme = localStorage.getItem("dark_theme");
    if (this.theme) {
      this.$vuetify.theme.dark = this.theme === "true";
    }
  }

  public toggleThemeButton() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
  }

}
</script>
