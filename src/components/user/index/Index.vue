<template>
    <div>
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8"><h2 style="text-align: center">Users</h2></b-col>
            <b-col cols="2">
                <b-button size="md" variant="info" @click="createUser"><i class="fa fa-plus"/> New User
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-table :fields="fields" :items="users" :busy="loading">
                    <template v-slot:table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>

                    <template v-slot:cell(actions)="data">
                        <b-button size="sm" variant="outline-info" @click="editUser(data.item)">Edit</b-button>
                        <router-link :to="{ name: 'user', params: { userId: data.item.id }}">
                            <b-button size="sm" variant="outline-secondary">View</b-button>
                        </router-link>
                        <b-button size="sm" variant="outline-danger" @click="deleteUser(data.item)">Delete
                        </b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-pagination
                :value="page"
                @input="setPage"
                :total-rows="userCount"
                :per-page="perPage"
                first-number
                last-number
                align="fill"
        ></b-pagination>

        <b-modal id="edit-user">
            <edit :user="editingUser" @input="updatedUser"></edit>
        </b-modal>
    </div>
</template>

<script>
    import Edit from './Edit';
    import {mapState} from 'vuex';

    export default {
        name: "Index",

        components: {
            Edit
        },

        created() {
            this.$store.dispatch('user/loadUsers');
        },

        data() {
            return {
                editingUser: null,
                fields: [
                    {key: 'id', label: 'User ID'},
                    {key: 'data.preferred_name', label: 'Name'},
                    {key: 'data.email', label: 'Email'},
                    {key: 'actions', label: 'Actions'}
                ]
            }
        },

        methods: {
            deleteUser(user) {
                this.$bvModal.msgBoxConfirm('Are you sure you want to delete this user?', {
                    title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(confirmed => {
                        if (confirmed) {
                            this.$control.user().delete(user.id)
                                .then(() => {
                                    this.$notify.success('User deleted!');
                                    this.users.splice(this.users.indexOf(user), 1);
                                })
                                .catch(error => this.$notify.alert('User could not be deleted: ' + error.message))
                        }
                    });
            },
            editUser(user) {
                this.editingUser = user;
                this.$bvModal.show('edit-user');
            },
            createUser() {
                this.editingUser = null;
                this.$bvModal.show('edit-user');
            },

            updatedUser(user) {
                this.users.splice(this.users.indexOf(this.editingUser), 1, user);
                this.$bvModal.hide('edit-user');
                this.editingUser = null;
            },
            setPage(page) {
                if (page !== null) {
                    this.$store.dispatch('user/setPage', page);
                }
            }
        },
        computed: {
            ...mapState('user', {
                users: 'users',
                loading: 'loadingAllUsers',
                page: 'page',
                userCount: 'userCount',
                perPage: 'perPage'
            })
        }
    }
</script>

<style scoped>

</style>
