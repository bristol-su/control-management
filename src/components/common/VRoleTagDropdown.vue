<template>
    <v-select :reduce="option => option.value" :loading="loading" :options="options" v-model="roleTagId"
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
                No results found for role tag <em>{{ search }}</em>.
            </template>
            <em style="opacity: 0.5;" v-else>Start typing to search for a role tag.</em>
        </template>
        <template v-slot:spinner="{loading}">
            <b-spinner label="Searching" small v-if="loading"></b-spinner>
        </template>
    </v-select>
</template>

<script>

    export default {
        name: "VRoleTagDropdown",
        props: {
            value: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                roleTagCategories: [],
                currentRoleTag: null,
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
                this.$control.roleTag().all(this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            searchOptions() {
                this.loading = true;
                this.$control.roleTag().getAllWhere({name: this.search}, this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            parseResponse(response) {
                this.roleTagCategories = response.data;
                this.pages = response.last_page;
            },
            refreshOptions() {
                if(this.shouldSearch) {
                    this.searchOptions();
                } else {
                    this.fetchOptions();
                }
            },
            loadCurrentRoleTag() {
                if(this.value !== null) {
                    let roleTag = this.options.find(p => p.value === this.value);
                    if(roleTag) {
                        this.currentRoleTag = roleTag;
                    } else {
                        this.$control.roleTag().get(this.value)
                            .then(response => this.currentRoleTag = {
                                label: response.data.name, value: response.data.id
                            });
                    }
                }
            }
        },
        computed: {
            options() {
                return this.roleTagCategories.map(roleTag => {
                    return {label: roleTag.name, value: roleTag.id}
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
            roleTagId: {
                get: function() {
                    let roleTag = this.currentRoleTag;
                    if(roleTag) {
                        return roleTag;
                    }
                    this.loadCurrentRoleTag();
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