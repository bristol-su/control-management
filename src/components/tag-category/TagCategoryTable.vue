<template>
    <b-table small :items="categories" :fields="fields" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <v-button-view
                    @view="$router.push(generateViewLink(data.item.id))">
            </v-button-view>
        </template>
    </b-table>
</template>

<script>
    import VButtonView from "../common/VButtonView";
    export default {
        name: "TagCategoryTable",
        components: {VButtonView},
        props: {
            categories: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            viewRouteName: {
                required: true,
                type: String
            },
            viewRouteParameter: {
                required: true,
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                fields: [
                    {key: 'id', label: 'Tag Category ID'},
                    {key: 'name', label: 'Name'},
                    {key: 'reference', label: 'Reference'},
                    {key: 'actions', label: ''},
                ]
            }
        },
        methods: {
            generateViewLink(id) {
                let route = {name: this.viewRouteName, params: {}}
                route.params[this.viewRouteParameter] = id;
                return route;
            }
        }
    }
</script>

<style scoped>

</style>