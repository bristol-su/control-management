<template>
    <b-container>
        <b-card no-body v-if="hasTag">
            <b-tabs pills card vertical>
                <b-tab title="Tag Details" active>
                    <tag-details :tag="tag"></tag-details>
                </b-tab>
                <b-tab title="Roles"><roles :tag="tag"></roles></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import TagDetails from './TagDetails';
    import Roles from './role/Roles';

    export default {
        name: "Show",
        components: {TagDetails, Roles},
        mounted() {
            this.$control.roleTag().get(this.$route.params.roleTagId)
                .then(response => this.tag = response.data)
                .catch(error => this.$notify.alert('Could not load the role tag: ' + error.message));
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
