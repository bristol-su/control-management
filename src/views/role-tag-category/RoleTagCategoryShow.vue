<template>
    <div>
        <the-title :title="roleTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{roleTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="roleTagCategory.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="roleTagCategory.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="roleTagCategory.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Tags" sub-title="Tags that belong to the category">
                            <template v-slot:icons>
                                <router-link
                                        :to="{name: 'roleTagCategory-tag', params: {roleTagCategoryId: roleTagCategory.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-role-tag-category-tags :role-tag-category-id="roleTagCategory.id"></v-role-tag-category-tags>
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
    import VRoleTagCategoryTags from "../../components/tag-category/VRoleTagCategoryTags";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VCard from "../../components/common/VCard";
    export default {
        name: "RoleTagCategoryShow",
        components: {VCard, VDataListItemEditable, VRoleTagCategoryTags, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('roleTagCategory', ['update'])
        },
        computed: {
            ...mapState('roleTagCategory', ['roleTagCategory'])
        }

    }
</script>

<style scoped>

</style>