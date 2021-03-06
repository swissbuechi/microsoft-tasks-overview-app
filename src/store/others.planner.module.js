import GraphService from "@/service/GraphService";

export const otherTask = {
    namespaced: true,
    state: {
        user: {},
        tasks: [],
        status: {
            tasks: {
                loading: false
            }
        }
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },
        SET_TASKS_LOADING(state, status) {
            state.status.tasks.loading = status
        }
    },
    actions: {
        loadPlannerTasks({commit}, userId) {
            commit('SET_TASKS_LOADING', true)
            GraphService.getPlannerTasks(userId).then(response => {
                commit('SET_TASKS', response.value.filter(t => !t.completedDateTime))
                commit('SET_TASKS_LOADING', false)
            }).catch(e => {
                this.dispatch('message/setSnackbar', {color: 'error', text: e.response.data.message})
                commit('SET_TASKS_LOADING', false)
            })
        },
    }
}