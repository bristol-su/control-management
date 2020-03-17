<template>
    <b-container>
        <b-card no-body v-if="hasTag">
            <b-tabs pills card vertical>
                <b-tab title="Tag Details" active>
                    <tag-details :tag="tag"></tag-details>
                </b-tab>
                <b-tab title="Users"><users :tag="tag"></users></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import TagDetails from './TagDetails';
    import Users from './user/Users';

    export default {
        name: "Show",
        components: {TagDetails, Users},
        mounted() {
            this.$control.userTag().get(this.$route.params.userTagId)
                .then(response => this.tag = response.data)
                .catch(error => this.$notify.alert('Could not load the user tag: ' + error.message));
        },

        data() {
            return {
                tag: null
            }
        },

        methods: {},

        computed: {
            hasTag() {
                return this.tag !== null;
            }
        }
    }
</script>

<style scoped>

</style>
