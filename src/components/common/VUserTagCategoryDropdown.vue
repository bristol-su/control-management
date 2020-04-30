<template>
    <v-select :reduce="option => option.value" :loading="loading" :options="options" v-model="userTagCategoryId"
              :searchable="false" :filterable="false">
        <template v-slot:list-footer>
            <li class="pagination">
                <b-button size="sm" variant="outline-secondary" @click="page -= 1" :disabled="!hasPrevPage">
                    <i class="fas fa-caret-left"></i> Prev</b-button>
                <b-button size="sm" variant="outline-secondary" @click="page += 1" :disabled="!hasNextPage">
                    Next <i class="fas fa-caret-right"></i>
                </b-button>
            </li>
        </template>
        <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
                No results found for user tag category <em>{{ search }}</em>.
            </template>
            <em style="opacity: 0.5;" v-else>Start typing to search for a user tag category.</em>
        </template>
        <template v-slot:spinner="{loading}">
            <b-spinner label="Searching" small v-if="loading"></b-spinner>
        </template>
    </v-select>
</template>

<script>

    export default {
        name: "VUserTagCategoryDropdown",
        props: {
            value: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                userTagCategories: [],
                currentUserTagCategory: null,
                page: 1,
                pages: 1,
                perPage: 10,
                search: '',
                loading: false
            }
        },
        mounted() {
            this.fetchOptions();
        },
        watch: {
            page() {
                this.refreshOptions();
            },
            perPage() {
                this.refreshOptions();
            },
            search() {
                this.refreshOptions();
            }
        },
        methods: {
            fetchOptions() {
                this.loading = true;
                this.$control.userTagCategory().all(this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            searchOptions() {
                this.loading = true;
                this.$control.userTagCategory().getAllWhere({name: this.search}, this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            parseResponse(response) {
                this.userTagCategories = response.data;
                this.pages = response.last_page;
            },
            refreshOptions() {
                if(this.shouldSearch) {
                    this.searchOptions();
                } else {
                    this.fetchOptions();
                }
            },
            loadCurrentUserTagCategory() {
                if(this.value !== null) {
                    let userTagCategory = this.options.find(p => p.value === this.value);
                    if(userTagCategory) {
                        this.currentUserTagCategory = userTagCategory;
                    } else {
                        this.$control.userTagCategory().get(this.value)
                            .then(response => this.currentUserTagCategory = {
                                label: response.data.name, value: response.data.id
                            });
                    }
                }
            }
        },
        computed: {
            options() {
                return this.userTagCategories.map(userTagCategory => {
                    return {label: userTagCategory.name, value: userTagCategory.id}
                });
            },
            hasPrevPage() {
                return this.page > 1;
            },
            hasNextPage() {
                return this.page < this.pages;
            },
            shouldSearch() {
                return this.search !== null && this.search !== '';
            },
            userTagCategoryId: {
                get: function() {
                    let userTagCategory = this.currentUserTagCategory;
                    if(userTagCategory) {
                        return userTagCategory;
                    }
                    this.loadCurrentUserTagCategory();
                    return this.value
                },
                set: function(id) {
                    this.$emit('input', id);
                }
            }
        }

    }
</script>

<style scoped>
    .pagination {
        display: flex;
        margin: .25rem .25rem 0;
    }
    .pagination button {
        flex-grow: 1;
    }
    .pagination button:hover {
        cursor: pointer;
    }
</style>