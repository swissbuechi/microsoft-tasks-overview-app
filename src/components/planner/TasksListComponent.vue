<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      multi-sort
      class="elevation-1 row-pointer"
      :loading="loading"
      :footer-props="{'items-per-page-options': [siteSize, 30, 50, -1]}"
      @click:row="handleClick"
  >
    <template v-slot:[`item.createdDateTime`]="{ item }">
      <v-chip v-if="item.createdDateTime">
        {{ formatDate(item.createdDateTime) }}
      </v-chip>
    </template>
    <template v-slot:[`item.dueDateTime`]="{ item }">
      <v-chip v-if="item.dueDateTime"
              :color="getDueAtColor(item.dueDateTime)">
        {{ formatDate(item.dueDateTime) }}
      </v-chip>
    </template>
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

import dayjs from "dayjs";

export default {
  data: () => ({}),
  props: {
    title: null,
    headers: [],
    items: [],
    retrieveItems: null,
    search: null,
    siteSize: null,
    loading: null
  },
  mounted() {
    this.retrieveItems()
  },
  methods: {
    handleClick(value) {
      this.$router.push("/planner/task/" + value.id)
    },
    formatDate(date) {
      return date.substr(0, 10)
    },
    getDueAtColor(date) {
      let dueDate = dayjs(date)
      let nowDate = dayjs(new Date())
      if (dueDate.isAfter(nowDate)) return ''
      if (dueDate.isBefore(nowDate)) return 'orange'
    },
  },

}
</script>
<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>