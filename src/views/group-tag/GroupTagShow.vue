<template>
    <div>
        <the-title :title="groupTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{groupTag.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="groupTag.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="groupTag.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="groupTag.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>
                    
                    <v-data-list-item title="Full Reference">
                        {{groupTag.full_reference}}
                    </v-data-list-item>


                    <v-data-list-item-editable
                            title="Category"
                            :value="groupTag.tag_category_id"
                            @update="update({tag_category_id: $event})">

                        <div>
                            <group-tag-category-name
                                    :group-tag-category-id="groupTag.tag_category_id">
                            </group-tag-category-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <group-tag-category-dropdown
                                    :value="newValue"
                                    @input="updateValue">
                            </group-tag-category-dropdown>
                        </template>

                    </v-data-list-item-editable>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Groups" sub-title="Groups that belong to the tag">
                                <template v-slot:icons>
                                    <router-link
                                            :to="{name: 'create-groupTag-group', params: {groupTagId: groupTag.id}}">
                                        <v-button-add></v-button-add>
                                    </router-link>
                                    <router-link
                                            :to="{name: 'groupTag-group', params: {groupTagId: groupTag.id}}">
                                        <i class="fa fa-external-link-alt"></i>
                                    </router-link>
                                </template>
                                <v-group-tag-groups :tag-id="groupTag.id"></v-group-tag-groups>
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
    import GroupTagCategoryName from "../../components/tag-category/GroupTagCategoryName";
    import VGroupTagGroups from "../../components/tag/VGroupTagGroups";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import GroupTagCategoryDropdown from "../../components/common/VGroupTagCategoryDropdown";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";
    export default {
        name: "GroupTagShow",
        components: {
            VButtonAdd,
            VCard,
            GroupTagCategoryDropdown,
            VDataListItemEditable, VGroupTagGroups, GroupTagCategoryName, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('groupTag', ['update'])
        },
        computed: {
            ...mapState('groupTag', ['groupTag'])
        }
    }
</script>

<style scoped>

</style>