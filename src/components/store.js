import {createStore} from "vuex";

export default createStore({
    state: {
        subjectDictionary: {},
        objectDictionary: {},
        showNotification: false,
        showNotificationMessage: "",
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
        setShowNotification({commit}, payload) {
            commit('setShowNotification', payload);
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
        setShowNotification: (state, {show, message}) => {
            state.showNotification = show;
            state.showNotificationMessage = message;
        },
    }
});