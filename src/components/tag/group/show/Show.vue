<template>
    <b-container>
        <b-card no-body v-if="hasTag">
            <b-tabs pills card vertical>
                <b-tab title="Tag Details" active>
                    <tag-details :tag="tag"></tag-details>
                </b-tab>
                <b-tab title="Groups"><groups :tag="tag"></groups></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import TagDetails from './TagDetails';
    import Groups from './group/Groups';

    export default {
        name: "Show",
        components: {TagDetails, Groups},
        mounted() {
            this.$control.groupTag().get(this.$route.params.groupTagId)
                .then(response => this.tag = response.data)
                .catch(error => this.$notify.alert('Could not load the group tag: ' + error.message));
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
