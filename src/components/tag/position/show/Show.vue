<template>
    <b-container>
        <b-card no-body v-if="hasTag">
            <b-tabs pills card vertical>
                <b-tab title="Tag Details" active>
                    <tag-details :tag="tag"></tag-details>
                </b-tab>
                <b-tab title="Positions"><positions :tag="tag"></positions></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script> 
    import TagDetails from './TagDetails';
    import Positions from './position/Positions';

    export default {
        name: "Show",
        components: {TagDetails, Positions},
        mounted() {
            this.$control.positionTag().get(this.$route.params.positionTagId)
                .then(response => this.tag = response.data)
                .catch(error => this.$notify.alert('Could not load the position tag: ' + error.message));
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
