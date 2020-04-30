export const namespaced = true;

export const state = {
    notifications: [],
}

export const mutations = {
    APPEND_NOTIFICATION(state, notification) {
        state.notifications.push(notification);
    },
    SET_NOTIFICATIONS(state, notifications) {
        state.notifications = notifications;
    }
}

export const actions = {
    popNotification({state, commit}) {
        let notifications = state.notifications;
        const notification = notifications.shift();
        commit('SET_NOTIFICATIONS', notifications);
        return notification;
    },
    create({commit}, {title = '', text = '', type = 'success'}) {
        commit('APPEND_NOTIFICATION', {
            title: title,
            text: text,
            type: type
        });
    }
}

export const getters = {
    notificationCount: state => {
        return state.notifications.length;
    }
}