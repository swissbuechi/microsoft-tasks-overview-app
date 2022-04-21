import {msalPluginInstance} from "@/plugins/msal-plugin";
import axios from "axios";

export const API = axios.create({})

export default {
    async getAuthHeader(scopes) {
        const idToken = await msalPluginInstance.acquireToken(scopes);
        return {
            headers: {
                authorization: `bearer ${idToken}`
            }
        }
    }
}