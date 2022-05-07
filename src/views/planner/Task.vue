<template>
  <TaskEditForm
      v-model="task"
      :loading="loading"
      :title="title"
      :readonly="true"
      :update-item="updateItem"/>
</template>
<script>
import TaskEditForm from "@/components/planner/TaskEditForm";
import GraphService from "@/service/GraphService";

export default {
  data() {
    return {
      title: 'Task',
      successMessage: 'Systemstatus erfolgreich aktualisiert',
      loading: false,
      task: {},
    }
  },
  components: {
    TaskEditForm
  },
  mounted() {
    this.retrieveItem(this.$route.params.id);
  },
  methods: {
    retrieveItem(id) {
      this.loading = true
      GraphService.getPlannerTask(id)
          .then((response) => {
            this.task = response
            this.loading = false
          })
          .catch((e) => {
            this.$store.dispatch('message/setSnackbar', {color: 'error', text: e.response.data.message})
          })
    },
    updateItem() {
      // SystemStatusService.update(this.systemStatus)
      //     .then(() => {
      //       this.$store.dispatch('message/setSnackbar', {text: this.successMessage})
      //       this.back()
      //     })
      //     .catch((e) => {
      //       this.$store.dispatch('message/setSnackbar', {color: 'error', text: e.response.data.message})
      //       this.retrieveItem(this.$route.params.id)
      //     })
    },
    back() {
      this.$router.back()
    }
  },
}
</script>