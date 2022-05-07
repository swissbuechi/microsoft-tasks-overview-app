<template>
  <div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"

@Component
export default class App extends Vue {

  mounted() {
    this.signInRedirect().then(r => {
      this.$router.push(this.$route.query.redirect.valueOf())
    })
  }

  public async signInRedirect() {
    await this.$msal.signInRedirect()
  }

}
</script>