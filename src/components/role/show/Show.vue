<template>
    <b-container>
        <b-card no-body v-if="hasRole">
            <b-tabs pills card vertical>
                <b-tab title="Role Details" active>
                    <role-details :role="role"></role-details>
                </b-tab>
                <b-tab title="Tags"><tags :role="role"></tags></b-tab>
                <b-tab title="Users"><users :role="role"></users></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import RoleDetails from './RoleDetails';
    import Tags from './tag/Tags';
    import Users from './user/Users';

    export default {
        name: "Show",
        components: {RoleDetails, Tags, Users},

        data() {
            return {
                role: null
            }
        },

        mounted() {
            this.$control.role().get(this.$route.params.roleId)
                .then(response => this.role = response.data)
                .catch(error => this.$notify.alert('Could not load the role: ' + error.message));
        },
        
        methods: {},

        computed: {
            hasRole() {
                return this.role !== null;
            }
        }
    }
</script>

<style scoped>

</style>
