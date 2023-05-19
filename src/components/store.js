import {createStore} from "vuex";

export default createStore({
    state: {
        subjectDictionary: {},
        objectDictionary: {},
        toastNotification: {
            show: false,
            message: '',
            type: ''
        },
        tableData: {},
    },
    actions: {
        setDictionary({commit}, {dictionary, type}) {
            if (type === 'Subject') {
                commit('setSubjectDictionary', dictionary);
            } else if (type === 'Object') {
                commit('setObjectDictionary', dictionary);
            }
        },
        setToastNotification({commit}, payload) {
            commit('setToastNotification', payload);
        },
        setTableData({commit}, payload) {
            commit('setTableData', payload);
        }
    },
    mutations: {
        setTableData: (state, data) => {
            state.tableData = data;
        },
        setSubjectDictionary: (state, dictionary) => {
            state.subjectDictionary = dictionary;
        },
        setObjectDictionary: (state, dictionary) => {
            state.objectDictionary = dictionary;
        },
        setToastNotification: (state, {show, message, type}) => {
            state.toastNotification.show = show;
            state.toastNotification.message = message;
            state.toastNotification.type = type;
            console.log(state.toastNotification);
        },
    }
});