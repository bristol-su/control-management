<template>
    <div>
        <the-title :title="userTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{userTag.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="userTag.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="userTag.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="userTag.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>

                    <v-data-list-item title="Full Reference">
                        {{userTag.full_reference}}
                    </v-data-list-item>


                    <v-data-list-item-editable
                            title="Category"
                            :value="userTag.tag_category_id"
                            @update="update({tag_category_id: $event})">

                        <div>
                            <user-tag-category-name
                                    :user-tag-category-id="userTag.tag_category_id">
                            </user-tag-category-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <user-tag-category-dropdown
                                    :value="newValue"
                                    @input="updateValue">
                            </user-tag-category-dropdown>
                        </template>

                    </v-data-list-item-editable>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Users" sub-title="Users that belong to the tag">
                            <template v-slot:icons>
                                <router-link
                                        :to="{name: 'create-userTag-user', params: {userTagId: userTag.id}}">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'userTag-user', params: {userTagId: userTag.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-user-tag-users :tag-id="userTag.id"></v-user-tag-users>
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
    import UserTagCategoryName from "../../components/tag-category/UserTagCategoryName";
    import VUserTagUsers from "../../components/tag/VUserTagUsers";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import UserTagCategoryDropdown from "../../components/common/VUserTagCategoryDropdown";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";
    export default {
        name: "UserTagShow",
        components: {
            VButtonAdd,
            VCard,
            UserTagCategoryDropdown,
            VDataListItemEditable, VUserTagUsers, UserTagCategoryName, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('userTag', ['update'])
        },
        computed: {
            ...mapState('userTag', ['userTag'])
        }

    }
</script>

<style scoped>

</style>