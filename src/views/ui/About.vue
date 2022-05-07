<template>
  <div>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="justify-center">About</v-card-title>
      <v-card-text class=text-center>
        <h4>Microsoft Tasks Overview</h4>
        <span>View Microsoft Tasks assigned to other people</span>
        <v-row align="center" class="justify-center">
          <v-img alt="MSP Logo" class="shrink mt-10 mb-10" src="@/assets/logo.png" width="100px"/>
        </v-row>
        <h4>Version</h4>
        <span>0.2.0</span>
        <br>
        <br>
        <h4>Developer</h4>
        <span>Raphael Büchi</span>
        <br>
        <a href="mailto:raphael.buechi@netider.ch">raphael.buechi@netider.ch </a>
        <br>
        <v-row align="center" class="justify-center">
          <a href="https://netider.ch" target="_blank">
            <v-img alt="netider.ch it solutions Logo" class="shrink mt-5 mb-5" src="@/assets/netider.png"
                   width="120px"/>
          </a>
        </v-row>
        <br>
        <h4>Credits</h4>
        <span>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a
            href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </span>
        <br>
        <br>
        <h4>License</h4>
        <span style="font-size: 12px;">&copy; </span>
        <span>netider.ch it solutions | {{ getDate() }}</span>
      </v-card-text>
    </v-card>
  </div>
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