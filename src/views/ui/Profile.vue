<template>
  <div>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="justify-center">Profile</v-card-title>
      <v-card-text class=text-center>
        <img v-if="photo"
             height="100px"
             :src="photo"
             alt="user"
             style="border-radius: 360px"
        />
        <h4>Hello, {{ name }}!</h4>
      </v-card-text>
    </v-card>
    <Dashboard
        :items="items">
    </Dashboard>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Dashboard from "@/components/ui/Dashboard.vue";
import GraphService from "@/service/GraphService"

@Component({
  components: {
    Dashboard
  }
})
export default class Profile extends Vue {
  private photo: any = null
  private items: Array<unknown> = [
    {
      title: "Account Settings",
      // icon: "mdi-account",
      link: "/myaccount",
    },
  ]

  mounted() {
    this.getGraphPhoto()
  }


  public get name(): string {
    return this.$msal.getName()
  }

  // public get roles(): any {
  //   this.$msal.getRoles()
  //   return this.$msal.getRoles()
  // }

  // public get isAuthenticated(): boolean {
  //   return this.$msal.isAuthenticated;
  // }

  public async getGraphPhoto(): Promise<any> {
    this.photo = await GraphService.getPhoto()
  }

  // @Watch('isAuthenticated')
  // onPropertyChanged(value: boolean, oldValue: boolean) {
  //   this.getGraphPhoto()
  // }

}
</script>