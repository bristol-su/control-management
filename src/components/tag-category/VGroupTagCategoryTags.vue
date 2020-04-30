<template>
    <div>
        <div v-if="!loading && tags.length === 0">
            This tag category has no tags
        </div>
        <tag-table
                :tags="tags"
                :loading="loading"
                view-route-name="groupTag"
                view-route-parameter="groupTagId">
        </tag-table>
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
    import TagTable from "../tag/TagTable";

    export default {
        name: "VGroupTagCategoryTags",
        components: {TagTable, VPagination},
        props: {
            groupTagCategoryId: {
                required: true,
                type: Number
            },
        },

        data() {
            return {
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
            groupTagCategoryId() {
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
                this.$control.groupTagCategory().tags(this.groupTagCategoryId, this.currentPage, this.perPage)
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