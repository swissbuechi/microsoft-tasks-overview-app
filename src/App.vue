<template>
  <div>
    <Login v-if="!isAuthenticated"></Login>
    <v-app v-if="isAuthenticated">
      <AppBar/>
      <Navigation/>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
      <Footer/>
      <SnackBar></SnackBar>
    </v-app>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import SnackBar from "@/components/ui/SnackBar"
import AppBar from "@/components/ui/AppBar"
import Navigation from "@/components/ui/Navigation"
import Footer from "@/components/ui/Footer"
import Login from "@/components/ui/Login.vue";

@Component({
  components: {
    Login,
    SnackBar,
    AppBar,
    Navigation,
    Footer
  }
})
export default class App extends Vue {

  public get isAuthenticated(): boolean {
    return this.$msal.isAuthenticated;
  }

}
</script>
