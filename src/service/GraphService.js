import AuthService from '@/service/AuthService'

const GRAPH_BASE = 'https://graph.microsoft.com/v1.0'
const GRAPH_SCOPES = ['user.read', 'user.readbasic.all']

export default {

    async getMyPlannerTasks() {
        let resp = await callGraph('/me/planner/tasks', ['Tasks.Read'])
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

    async getPlannerTasks(userId) {
        let resp = await callGraph('/users/' + userId + '/planner/tasks', ['Tasks.Read'])
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

    async getPlannerTask(id) {
        let resp = await callGraph('/planner/tasks/' + id, ['Tasks.Read'])
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

    async getMyToDoTaskLists() {
        let resp = await callGraph('/me/todo/lists', ['Tasks.Read'])
        if (resp) {
            let data = await resp.json()
            return data
        }
    },
    async getMyToDoTasks(listId) {
        let resp = await callGraph('/me/todo/lists/' + listId + '/tasks', ['Tasks.Read'])
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

    //
    // Get details of user, and return as JSON
    // https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
    //
    async getSelf() {
        let resp = await callGraph('/me')
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

    //
    // Get user's photo and return as a blob object URL
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    //
    async getPhoto() {
        let resp = await callGraph('/me/photos/240x240/$value')
        if (resp) {
            let blob = await resp.blob()
            return URL.createObjectURL(blob)
        }
    },

    //
    // Search for users
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    //
    async searchUsers(searchString, max = 50) {
        let resp = await callGraph(
            `/users?$filter=startswith(displayName, '${searchString}') or startswith(userPrincipalName, '${searchString}')&$top=${max}`
        )
        if (resp) {
            let data = await resp.json()
            return data
        }
    },

}

//
// Common fetch wrapper (private)
//
async function callGraph(apiPath, socpes = GRAPH_SCOPES) {
    // Acquire an access token to call APIs (like Graph)
    // Safe to call repeatedly as MSAL caches tokens locally
    // accessToken = await auth.acquireToken(GRAPH_SCOPES)

    let resp = await fetch(`${GRAPH_BASE}${apiPath}`,
        await AuthService.getAuthHeader(socpes))
    // headers: {authorization: `bearer ${accessToken}`})

    if (!resp.ok) {
        throw new Error(`Call to ${GRAPH_BASE}${apiPath} failed: ${resp.statusText}`)
    }

    return resp
}