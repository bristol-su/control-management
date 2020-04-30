import store from './../store/store';

export default class Notify {

    static create(text, type = 'info', title = '') {
        store.dispatch('notifications/create', {
            title: title,
            text: text,
            type: type
        });
    }

    static alert(text, title = 'An error occured') {
        Notify.create(text, 'alert', title);
    }

    static warning(text, title = 'Warning') {
        Notify.create(text, 'warning', title);
    }

    static success(text, title = 'Success') {
        Notify.create(text, 'success', title);
    }

    static info(text, title = '') {
        Notify.create(text, 'info', title);
    }
}