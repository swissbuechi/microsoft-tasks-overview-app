import GraphService from "@/service/GraphService";

export const task = {
    namespaced: true,
    state: {
        tasks: [],
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },
    },
    actions: {
        loadTasks({commit}) {
            GraphService.getMyTasks().then(response => {
                commit('SET_TASKS', response.value.filter(t => !t.completedDateTime))
            }).catch(e => {
                this.dispatch('message/setSnackbar', {color: 'error', text: e.response.data.message})
            })
        },
    }
}