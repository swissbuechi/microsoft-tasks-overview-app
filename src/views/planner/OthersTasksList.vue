<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar class="elevation-1">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-autocomplete
              class="mt-6"
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              prepend-icon="mdi-account-group"
              return-object
          ></v-autocomplete>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TasksListComponent
            title="Planner Tasks"
            :headers="headers"
            :items="plannerTasks"
            :retrieve-items="retrieveTasks"
            :site-size="siteSize"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TasksListComponent from "@/components/planner/TasksListComponent";

export default {
  data: () => ({

    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,

    headers: [
      {text: 'Title', value: 'title'},
      {text: 'Created at', value: 'createdDateTime'},
      {text: 'Due at', value: 'dueDateTime'},
    ],
    siteSize: 15
  }),
  components: {
    TasksListComponent,
  },
  computed: {
    plannerTasks() {
      return this.$store.state.otherTask.tasks
    },

    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

        return Object.assign({}, entry, {Description})
      })
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const {count, entries} = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    },
  },

  methods: {
    retrieveTasks() {
      this.$store.dispatch("otherTask/loadPlannerTasks", "d3fc5acc-2ca2-4973-9282-615abff365f2")
    }
  }
}
</script>