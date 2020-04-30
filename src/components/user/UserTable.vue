<template>
    <b-table small :fields="fields" :items="users" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <v-button-view
                @view="$router.push({ name: 'user', params: { userId: data.item.id }})">
            </v-button-view>
            <v-button-delete :delete-text="deleteText" v-if="deletable" @delete="$emit('delete', data.item.id)">

            </v-button-delete>
        </template>
    </b-table>
</template>

<script>
    import VButtonDelete from "../common/VButtonDelete";
    import VButtonView from "../common/VButtonView";
    export default {
        name: "UserTable",
        components: {VButtonView, VButtonDelete},
        props: {
            users: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            deletable: {
                type: Boolean,
                default: false
            },
            deleteText: {
                type: String,
                required: false,
                default: null
            }
        },
        data() {
            return {
                fields: [
                    {key: 'id', label: 'User ID'},
                    {key: 'data.first_name', label: 'First Name'},
                    {key: 'data.last_name', label: 'Last Name'},
                    {key: 'data.email', label: 'Email'},
                    {key: 'actions', label: 'Actions'}
                ],
            }
        }
    }
</script>

<style scoped>

</style>