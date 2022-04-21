<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      multi-sort
      class="elevation-1"
      :loading="loading"
      :footer-props="{'items-per-page-options': [siteSize, 30, 50, -1]}"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-regular">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Suche"
            single-line
            hide-details
            clearable>
        </v-text-field>
        <v-spacer></v-spacer>
        <v-icon
            @click="retrieveItems"
            class="ml-4">
          mdi-refresh
        </v-icon>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
    </template>
  </v-data-table>
</template>
<script>

export default {
  data: () => ({}),
  props: {
    title: null,
    headers: [],
    items: [],
    retrieveItems: null,
    search: null,
    siteSize: null
  },
  computed: {
    loading() {
      if (this.items.length > 0) return false
      else return true
    }
  },
  mounted() {
    this.retrieveItems()
  },
}
</script>