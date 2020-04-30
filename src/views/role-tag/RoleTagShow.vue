<template>
    <div>
        <the-title :title="roleTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{roleTag.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="roleTag.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="roleTag.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="roleTag.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>

                    <v-data-list-item title="Full Reference">
                        {{roleTag.full_reference}}
                    </v-data-list-item>


                    <v-data-list-item-editable
                            title="Category"
                            :value="roleTag.tag_category_id"
                            @update="update({tag_category_id: $event})">

                        <div>
                            <role-tag-category-name
                                    :role-tag-category-id="roleTag.tag_category_id">
                            </role-tag-category-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <role-tag-category-dropdown
                                    :value="newValue"
                                    @input="updateValue">
                            </role-tag-category-dropdown>
                        </template>

                    </v-data-list-item-editable>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Roles" sub-title="Roles that belong to the tag">
                                <template v-slot:icons>
                                    <router-link
                                            :to="{name: 'create-roleTag-role', params: {roleTagId: roleTag.id}}">
                                        <v-button-add></v-button-add>
                                    </router-link>

                                    <router-link
                                            :to="{name: 'roleTag-role', params: {roleTagId: roleTag.id}}">
                                        <i class="fa fa-external-link-alt"></i>
                                    </router-link>
                                </template>
                                <v-role-tag-roles :tag-id="roleTag.id"></v-role-tag-roles>
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
    import RoleTagCategoryName from "../../components/tag-category/RoleTagCategoryName";
    import VRoleTagRoles from "../../components/tag/VRoleTagRoles";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import RoleTagCategoryDropdown from "../../components/common/VRoleTagCategoryDropdown";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";
    export default {
        name: "RoleTagShow",
        components: {
            VButtonAdd,
            VCard,
            RoleTagCategoryDropdown,
            VDataListItemEditable, VRoleTagRoles, RoleTagCategoryName, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('roleTag', ['update'])
        },
        computed: {
            ...mapState('roleTag', ['roleTag'])
        }

    }
</script>

<style scoped>

</style>