<template>
    <div>
        <the-title :title="positionName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Position ID">
                        {{position.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                        title="Name"
                        :value="positionName"
                        @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="position.data.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Roles" sub-title="Roles that have the position">
                            <template v-slot:icons>
                                <router-link
                                        :to="{name: 'position-role', params: {positionId: position.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-position-roles :position-id="position.id"></v-position-roles>
                        </v-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <v-card title="Tags" sub-title="Tags the position is tagged with">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-position-tag', params: { positionId: position.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>
                                <router-link
                                        :to="{name: 'position-tag', params: {positionId: position.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-position-tags :position-id="position.id"></v-position-tags>
                        </v-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VDataList from "../../components/common/VDataList";
    import VDataListItem from "../../components/common/VDataListItem";
    import VPositionTags from "../../components/position/VPositionTags";
    import VPositionRoles from "../../components/position/VPositionRoles";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";

    export default {
        name: "PositionShow",
        components: {
            VButtonAdd,
            VCard, VDataListItemEditable, VPositionRoles, VPositionTags, VDataListItem, VDataList, TheTitle},
        computed: {
            ...mapState('position', ['position']),
            positionName() {
                return this.position.data.name;
            }
        },
        methods: {
            ...mapActions('position', ['update'])
        }
    }
</script>

<style scoped>

</style>