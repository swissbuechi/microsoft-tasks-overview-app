import Vue from 'vue';
import Vuex from 'vuex';

import {message} from '@/store/message.module'
import {myTask} from '@/store/me.planner.module'
import {otherTask} from '@/store/others.planner.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        message,
        myTask,
        otherTask
    }
});
