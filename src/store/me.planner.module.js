import GraphService from "@/service/GraphService";

export const myTask = {
    namespaced: true,
    state: {
        tasks: [],
        status: {
            tasks: {
                loading: false
            }
        }
    },
    mutations: {
        SET_PLANNER_TASKS(state, tasks) {
            state.tasks = tasks
        },
        SET_PLANNER_TASKS_LOADING(state, status) {
            state.status.tasks.loading = status
        }
    },
    actions: {
        loadPlannerTasks({commit}) {
            commit('SET_PLANNER_TASKS_LOADING', true)
            GraphService.getMyPlannerTasks().then(response => {
                commit('SET_PLANNER_TASKS', response.value.filter(t => !t.completedDateTime))
                commit('SET_PLANNER_TASKS_LOADING', false)
            }).catch(e => {
                this.dispatch('message/setSnackbar', {color: 'error', text: e.response.data.message})
                commit('SET_PLANNER_TASKS_LOADING', false)
            })
        },
    }
}