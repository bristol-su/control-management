<template>
    <div>
        <the-title :title="userTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{userTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                        title="Name"
                        :value="userTagCategory.name"
                        @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="userTagCategory.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="userTagCategory.reference"
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
                                        :to="{name: 'userTagCategory-tag', params: {userTagCategoryId: userTagCategory.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-user-tag-category-tags :user-tag-category-id="userTagCategory.id"></v-user-tag-category-tags>
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
    import VUserTagCategoryTags from "../../components/tag-category/VUserTagCategoryTags";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import {mapActions, mapState} from "vuex";
    import VCard from "../../components/common/VCard";

    export default {
        name: "UserTagCategoryShow",
        components: {VCard, VDataListItemEditable, VUserTagCategoryTags, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('userTagCategory', ['update'])
        },
        computed: {
            ...mapState('userTagCategory', ['userTagCategory'])
        }

    }
</script>

<style scoped>

</style>