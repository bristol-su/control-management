<template>
    <b-table :items="tags" :fields="fields" :busy="loading" small>
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
            <v-button-view
                    @view="$router.push(generateViewLink(data.item.id))">
            </v-button-view>
        </template>
    </b-table>
</template>

<script>
    import VButtonView from "../common/VButtonView";
    export default {
        name: "TagTable",
        components: {VButtonView},
        props: {
            tags: {
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
                    {key: 'id', label: 'Tag ID'},
                    {key: 'name', label: 'Name'},
                    {key: 'full_reference', label: 'Reference'},
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