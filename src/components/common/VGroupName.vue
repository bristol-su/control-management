<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="group">
            <router-link :to="{name: 'group', params: {groupId: groupId}}">
                {{group.data.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>
    </div>
</template>

<script>
    export default {
        name: "VGroupName",
        props: {
            groupId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                group: null,
                loading: false
            }
        },
        mounted() {
            this.fetchGroup();
        },
        watch: {
            groupId() {
                this.fetchGroup();
            }
        },
        methods: {
            fetchGroup() {
                this.loading = true;
                this.$store.dispatch('group/loadGroup', this.groupId)
                    .then(group => this.group = group)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>