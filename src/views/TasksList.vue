<template>
  <v-container>
    <v-row>
      <v-col>
        <!--        <v-card>-->
        <!--          <v-card-text>-->
        <!--            <v-text-field-->
        <!--                v-model="search"-->
        <!--                append-icon="mdi-magnify"-->
        <!--                label="Suche"-->
        <!--                single-line-->
        <!--                clearable>-->
        <!--            </v-text-field>-->
        <!--          </v-card-text>-->
        <!--        </v-card>-->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TasksListComponent
            title="Tasks"
            :headers="headers"
            :items="tasks"
            :retrieve-items="retrieveTasks"
            :site-size="siteSize"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import TasksListComponent from "@/components/TasksListComponent";

export default {
  data: () => ({
    search: '',
    headers: [
      {text: 'Title', value: 'title'},
      {text: 'Created at', value: 'createdDateTime'},
      {text: 'Due at', value: 'dueDateTime'},
    ],
    siteSize: 13
  }),
  components: {
    TasksListComponent,
  },
  computed: {
    tasks() {
      return this.$store.state.task.tasks
    }
  },
  methods: {
    retrieveTasks() {
      this.$store.dispatch("task/loadTasks")
    }
  }
}
</script>