<template>
  <div>
    <v-snackbar
        v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
        :key="snackbar.text + Math.random()"
        v-model="snackbar.showing"
        :color="snackbar.color"
        :style="`bottom: ${(index * 60) + 8}px`"
        timeout="2000">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-icon
            v-bind="attrs"
            @click="snackbar.showing = false">
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  computed: {
    snackbars() {
      return this.$store.state.message.snackbars;
    },
  }
}
</script>