<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="justify-center">About</v-card-title>
      <v-card-text class=text-center>
        <h4>Microsoft Tasks Overview</h4>
        View Microsoft Tasks assigned to other people
        <v-row align="center" class="justify-center">
          <v-img alt="Roller Shutter Logo" class="shrink mt-10 mb-10" src="@/assets/logo.png" width="200px"/>
        </v-row>
        <h4>Version</h4>
        0.1.0
        <br>
        <br>
        <h4>Developer</h4>
        <a href="mailto:raphael.buechi@netider.ch" target="_blank">raphael.buechi@netider.ch </a>
        <br>
        <a href="https://netider.ch" target="_blank">netider.ch</a>
        <br>
        <br>
        <h4>Credits</h4>
        Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a
          href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        <br>
        <br>
        <h4>License</h4>
        <span style="font-size: 12px;">&copy; </span>
        <span>netider it solutions | {{ getDate() }}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class About extends Vue {

  public getDate(): string {
    return new Date().getFullYear().toString()
  }

}
</script>