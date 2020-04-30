<template>
    <v-select :reduce="option => option.value" :loading="loading" :options="options" v-model="userId" @search="search = $event" :filterable="false">
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
                No results found for user <em>{{ search }}</em>.
            </template>
            <em style="opacity: 0.5;" v-else>Start typing to search for a user by email.</em>
        </template>
        <template v-slot:spinner="{loading}">
            <b-spinner label="Searching" small v-if="loading"></b-spinner>
        </template>
    </v-select>
</template>

<script>
    import {debounce} from 'lodash';

    export default {
        name: "VUserDropdown",
        props: {
            value: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                users: [],
                currentUser: null,
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
                this.$control.user().all(this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            },
            searchOptions: debounce(function() {
                this.loading = true;
                this.$control.user().getAllWhere({email: this.search}, this.page, this.perPage)
                    .then(response => this.parseResponse(response.data))
                    .catch(() => {})
                    .then(() => this.loading = false);
            }, 1000),
            parseResponse(response) {
                this.users = response.data;
                this.pages = response.last_page;
            },
            refreshOptions() {
                if(this.shouldSearch) {
                    this.searchOptions();
                } else {
                    this.fetchOptions();
                }
            },
            loadCurrentUser() {
                if(this.value !== null) {
                    let user = this.options.find(p => p.value === this.value);
                    if(user) {
                        this.currentUser = user;
                    } else {
                        this.$control.user().get(this.value)
                            .then(response => this.currentUser = this.parseUser(response.data));
                    }
                }
            },
            parseUser(user) {
                return {label: user.data.email + " (" + user.data.preferred_name + ")", value: user.id};
            }
        },
        computed: {
            options() {
                return this.users.map(this.parseUser);
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
            userId: {
                get: function() {
                    let user = this.currentUser;
                    if(user) {
                        return user;
                    }
                    this.loadCurrentUser();
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