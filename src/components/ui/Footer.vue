<template>
  <v-footer
      :color="color"
      padless
  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-col
          class="py-1 text-center white--text"
          cols="12"
      >
        Microsoft Tasks Overview
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "app",
  data() {
    return {}
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
  }
}

</script>