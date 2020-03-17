<template>
    <b-container>
        <b-card no-body v-if="hasPosition">
            <b-tabs pills card vertical>
                <b-tab title="Position Details" active>
                    <position-details :position="position"></position-details>
                </b-tab>
                <b-tab title="Tags"><tags :position="position"></tags></b-tab>
                <b-tab title="Roles"><roles :position="position"></roles></b-tab>
            </b-tabs>
        </b-card>
        <div v-else>
            Loading...
        </div>
    </b-container>
</template>

<script>
    import PositionDetails from './PositionDetails';
    import Tags from './tag/Tags';
    import Roles from './Roles';

    export default {
        name: "Show",
        components: {Roles, Tags, PositionDetails},

        data() {
            return {
                position: null
            }
        },

        mounted() {
            this.$control.position().get(this.$route.params.positionId)
                .then(response => this.position = response.data)
                .catch(error => this.$notify.alert('Could not load the position: ' + error.message));
        },
        
        computed: {
            hasPosition() {
                return this.position !== null;
            }
        }
    }
</script>

<style scoped>

</style>
