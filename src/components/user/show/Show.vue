<template>
    <b-container>
        <b-card no-body v-if="hasUser">
            <b-tabs pills card vertical>
                <b-tab title="User Details" active>
                    <user-details :user="user"></user-details>
                </b-tab>
                <b-tab title="Tags"><tags :user="user"></tags></b-tab>
                <b-tab title="Groups"><groups :user="user"></groups></b-tab>
                <b-tab title="Roles"><roles :user="user"></roles></b-tab>
            </b-tabs>
        </b-card>
        <b-card v-else>
            Loading...
        </b-card>
    </b-container>
</template>

<script> 
    import UserDetails from './UserDetails';
    import Tags from './tag/Tags';
    import Groups from './group/Groups';
    import Roles from './Roles';

    export default {
        name: "Show",
        components: {UserDetails, Tags, Groups, Roles},

        created() {
            return this.$control.user().get(this.$route.params.userId)
                .then(response => this.user = response.data)
                .catch(error => this.$notify.alert('Could not load user: ' + error.message));
        },
        
        data() {
            return {
                user: null
            }
        },

        methods: {},

        computed: {
            hasUser() {
                return this.user !== null;
            }
        }
    }
</script>

<style scoped>

</style>
