<template>
    <b-container>
        <b-card no-body v-if="hasGroup">
            <b-tabs pills card vertical>
                <b-tab title="Group Details" active>
                    <group-details :group="group"></group-details>
                </b-tab>
                <b-tab title="Members">
                    <users :group="group"></users>
                </b-tab>
                <b-tab title="Tags"><tags :group="group"></tags></b-tab>
                <b-tab title="Roles"><roles :group="group"></roles></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script>
    import GroupDetails from './GroupDetails';
    import Users from './user/Users';
    import Tags from './tag/Tags';
    import Roles from './Roles';

    export default {
        name: "Show",
        components: {Roles, Tags, Users, GroupDetails},

        mounted() {
            this.$control.group().get(this.$route.params.groupId)
                .then(response => this.group = response.data)
                .catch(error => this.$notify.alert('Could not load the group: ' + error.message));
        },
        
        data() {
            return {
                group: null
            }
        },

        methods: {},

        computed: {
            hasGroup() {
                return this.group !== null;
            }
        }
    }
</script>

<style scoped>

</style>
