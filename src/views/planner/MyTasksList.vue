<template>
  <v-container>
    <TasksListComponent
        title="Planner Tasks"
        :headers="headers"
        :items="plannerTasks"
        :retrieve-items="retrieveTasks"
        :site-size="siteSize"
        :loading="loading"
    />
  </v-container>
</template>
<script>
import TasksListComponent from "@/components/planner/TasksListComponent";

export default {
  data: () => ({
    search: '',
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
  mounted() {
    this.retrieveTasks()
  },
  computed: {
    plannerTasks() {
      return this.$store.state.myTask.tasks
    },
    loading() {
      return this.$store.state.myTask.status.tasks.loading
    }
  },
  methods: {
    retrieveTasks() {
      this.$store.dispatch("myTask/loadPlannerTasks")
    }
  }
}
</script>