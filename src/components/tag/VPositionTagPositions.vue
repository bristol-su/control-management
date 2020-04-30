<template>
    <div>
        <div v-if="!loading && positions.length === 0">
            This tag has no positions
        </div>
        <position-table :positions="positions" :loading="loading"
                        :deletable="true" delete-text="Untag the position?" @delete="deletePosition" v-else>
        </position-table>
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
    import PositionTable from "../position/PositionTable";
    import ControlService from "../../service/ControlService";
    import Notify from "../../service/Notify";
    export default {
        name: "VPositionTagPositions",
        components: {PositionTable, VPagination},
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
                positions: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchPositions();
        },

        watch: {
            tagId() {
                this.fetchPositions();
            },
            currentPage() {
                this.fetchPositions();
            },
            perPage() {
                this.fetchPositions();
            }
        },

        methods: {
            deletePosition(positionId) {
                this.loading = true;
                this.$control.positionTag().untagPosition(this.tagId, positionId)
                    .then(() => {
                        Notify.success('Untagged Position');
                        this.fetchPositions();
                    })
                    .catch(() => this.loading = false);
            },
            fetchPositions() {
                this.loading = true;
                return ControlService.getService().positionTag().positions(this.tagId, this.currentPage, this.perPage)
                    .then(response => {
                        this.positions = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not load tagged positions: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>