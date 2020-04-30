<template>
    <v-select :reduce="option => option.value" :loading="loading" :options="options" v-model="groupId" @search="search = $event" :filterable="false">
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
                No results found for group <em>{{ search }}</em>.
            </template>
            <em style="opacity: 0.5;" v-else>Start typing to search for a group.</em>
        </template>
        <template v-slot:spinner="{loading}">
            <b-spinner label="Searching" small v-if="loading"></b-spinner>
        </template>
    </v-select>
</template>

<script>

    export default {
        name: "VGroupDropdown",
        props: {
            value: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                groups: [],
                currentGroup: null,
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
                this.$control.group().all(this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            searchOptions() {
                this.loading = true;
                this.$control.group().getAllWhere({name: this.search}, this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            parseResponse(response) {
                this.groups = response.data;
                this.pages = response.last_page;
            },
            refreshOptions() {
                if(this.shouldSearch) {
                    this.searchOptions();
                } else {
                    this.fetchOptions();
                }
            },
            loadCurrentGroup() {
                if(this.value !== null) {
                    let group = this.options.find(p => p.value === this.value);
                    if(group) {
                        this.currentGroup = group;
                    } else {
                        this.$control.group().get(this.value)
                            .then(response => this.currentGroup = {
                                label: response.data.data.name, value: response.data.id
                            });
                    }
                }
            }
        },
        computed: {
            options() {
                return this.groups.map(group => {
                    return {label: group.data.name, value: group.id}
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
            groupId: {
                get: function() {
                    let group = this.currentGroup;
                    if(group) {
                        return group;
                    }
                    this.loadCurrentGroup();
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