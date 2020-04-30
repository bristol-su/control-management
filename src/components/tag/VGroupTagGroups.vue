<template>
    <div>
        <div v-if="!loading && groups.length === 0">
            This tag has no groups
        </div>
        <group-table :groups="groups" :loading="loading" :deletable="true" delete-text="Untag the group?" @delete="deleteGroup" v-else>
        </group-table>
        <v-pagination
                :per-page="perPage"
                :current-page="currentPage"
                :number-of-pages="numberOfPages"
                @setPerPage="perPage = $event"
                @setPage="currentPage = $event">
        </v-pagination>
    </div>
</template>

<script>
    import VPagination from "../common/VPagination";
    import GroupTable from "../group/GroupTable";
    import ControlService from "../../service/ControlService";
    import Notify from "../../service/Notify";
    export default {
        name: "VGroupTagGroups",
        components: {GroupTable, VPagination},
        props: {
            tagId: {
                required: true,
                type: Number
            }
        },

        data() {
            return {
                loading: false,
                currentPage: 1,
                perPage: 10,
                groups: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchGroups();
        },

        watch: {
            tagId() {
                this.fetchGroups();
            },
            currentPage() {
                this.fetchGroups();
            },
            perPage() {
                this.fetchGroups();
            }
        },

        methods: {
            deleteGroup(groupId) {
                this.loading = true;
                this.$control.groupTag().untagGroup(this.tagId, groupId)
                    .then(() => {
                        Notify.success('Untagged Group');
                        this.fetchGroups();
                    })
                    .catch(() => this.loading = false);
            },
            fetchGroups() {
                this.loading = true;
                return ControlService.getService().groupTag().groups(this.tagId, this.currentPage, this.perPage)
                    .then(response => {
                        this.groups = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not load tagged groups: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>