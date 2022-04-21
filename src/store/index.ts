import Vue from 'vue';
import Vuex from 'vuex';

import {message} from '@/store/message.module'
import {task} from '@/store/task.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        message,
        task
    }
});
