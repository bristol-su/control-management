<template>
    <div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex";

    export default {
        name: "TheNotifications",
        methods: {
            process(notification) {
                let options = {labels: {}};
                options.labels[notification.type] = notification.title;

                this.$notify._addToast(notification.text, notification.type, options);
            },
            ...mapActions('notifications', ['popNotification'])
        },
        watch: {
            notifications() {
                if(this.notificationCount > 0) {
                    this.popNotification()
                        .then(notification => this.process(notification));
                }
            }
        },
        computed: {
            ...mapState('notifications', ['notifications']),
            ...mapGetters('notifications', ['notificationCount']),
        }
    }
</script>

<style scoped>

</style>