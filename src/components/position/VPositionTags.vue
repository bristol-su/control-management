<template>
    <div>
        <div v-if="!loading && tags.length === 0">
            This position has no tags
        </div>
        <b-table :items="tags" :fields="fields" :busy="loading" small v-else>
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(name)="data">
                <span v-b-tooltip.hover :title="data.item.description">
                    {{data.item.name}}
                </span>
            </template>
            <template v-slot:cell(actions)="data">
                <v-button-view @view="$router.push({name: 'positionTag', params: {positionTagId: data.item.id}})"></v-button-view>
                <v-button-delete :delete-text="'Untag position from tag ' + data.item.name + '?'" @delete="deleteTag(data.item.id)">
                </v-button-delete>
            </template>
        </b-table>
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
    import VButtonDelete from "../common/VButtonDelete";
    import Notify from "../../service/Notify";
    import VButtonView from "../common/VButtonView";
    export default {
        name: "VPositionTags",
        components: {VButtonView, VButtonDelete, VPagination},
        props: {
            positionId: {
                required: true,
                type: Number
            },
        },

        data() {
            return {
                fields: [
                    {key: 'id', label: 'Tag ID', sortable: true},
                    {key: 'name', label: 'Tag Name', sortable: true},
                    {key: 'full_reference', label: 'Reference', sortable: true},
                    {key: 'actions', label: '', sortable: false}
                ],
                loading: false,
                currentPage: 1,
                perPage: 10,
                tags: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchTags();
        },

        watch: {
            positionId() {
                this.fetchTags();
            },
            perPage() {
                this.fetchTags();
            },
            currentPage() {
                this.fetchTags();
            }
        },

        methods: {
            deleteTag(id) {
                this.$control.position().untag(this.positionId, id)
                    .then(() => {
                        Notify.success('Position untagged from tag');
                        this.fetchTags();
                    });
            },
            fetchTags() {
                this.loading = true;
                this.$control.position().tags(this.positionId, this.currentPage, this.perPage)
                    .then(response => {
                        this.tags = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch((error) => this.$notify.alert('Could not load position tags: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>