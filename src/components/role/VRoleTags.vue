<template>
    <div>
        <div v-if="!loading && tags.length === 0">
            This role has no tags
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
                <v-button-delete :delete-text="'Remove the tag ' + data.item.name + ' from the role?'"
                    @delete="deleteTag(data.item.id)"></v-button-delete>
                <v-button-view
                          @view="$router.push({name: 'roleTag', params: {roleTagId: data.item.id}})">
                </v-button-view>
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
    import VButtonView from "../common/VButtonView";
    import VButtonDelete from "../common/VButtonDelete";
    import Notify from "../../service/Notify";

    export default {
        name: "VRoleTags",
        components: {VButtonDelete, VButtonView, VPagination},
        props: {
            roleId: {
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
                    {key: 'actions'}
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
            roleId() {
                this.fetchTags();
            },
            currentPage() {
                this.fetchTags();
            },
            perPage() {
                this.fetchTags();
            }
        },

        methods: {
            deleteTag(tagId) {
                this.loading = true;
                this.$control.role().untag(this.roleId, tagId)
                    .then(() => {
                        Notify.success('Removed the tag from the role')
                        this.fetchTags();
                    })
                    .catch(() => this.loading = false);
            },
            fetchTags() {
                this.loading = true;
                this.$control.role().tags(this.roleId, this.currentPage, this.perPage)
                    .then(response => {
                        this.tags = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not fetch tags: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>