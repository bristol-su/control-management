<template>
    <div>
        <div v-if="!loading && tags.length === 0">
            This user has no tags
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
                <b-button variant="secondary" size="sm"
                          @click="$router.push({name: 'userTag', params: {userTagId: data.item.id}})">
                    View
                </b-button>
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

    export default {
        name: "UserTags",
        components: {VPagination},
        props: {
            userId: {
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
            userId() {
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
            fetchTags() {
                this.loading = true;
                this.$control.user().tags(this.userId, this.currentPage, this.perPage)
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