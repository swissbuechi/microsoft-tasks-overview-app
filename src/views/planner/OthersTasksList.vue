<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar class="elevation-1">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-autocomplete
              class="mt-6"
              v-model="user"
              :items="items"
              :loading="isLoading"
              :search-input.sync="userSearch"
              hide-no-data
              item-text="displayName"
              prepend-icon="mdi-account-group"
              return-object
              clearable
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
            :loading="plannterTasksLoading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TasksListComponent from "@/components/planner/TasksListComponent";
import GraphService from "@/service/GraphService";

export default {
  data: () => ({

    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    user: null,
    userSearch: null,

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

    plannterTasksLoading() {
      return this.$store.state.otherTask.status.tasks.loading
    },

    fields() {
      if (!this.user) return []

      return Object.keys(this.user).map(key => {
        return {
          key,
          value: this.user[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries
    },
  },

  watch: {
    userSearch(val) {
      if (val === '') return
      this.isLoading = true
      GraphService.searchUsers(val).then(response => {
        this.entries = response.value
        this.isLoading = false
      })
    },
    user() {
      this.retrieveTasks()
    }
  },

  methods: {
    retrieveTasks() {
      this.$store.dispatch("otherTask/loadPlannerTasks", this.user.id)
    }
  }
}
</script>