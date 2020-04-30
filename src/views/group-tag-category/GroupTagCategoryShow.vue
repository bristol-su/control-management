<template>
    <div>
        <the-title :title="groupTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{groupTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="groupTagCategory.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="groupTagCategory.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="groupTagCategory.reference"
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
                                        :to="{name: 'groupTagCategory-tag', params: {groupTagCategoryId: groupTagCategory.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-group-tag-category-tags :group-tag-category-id="groupTagCategory.id"></v-group-tag-category-tags>
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
    import VGroupTagCategoryTags from "../../components/tag-category/VGroupTagCategoryTags";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VCard from "../../components/common/VCard";
    export default {
        name: "GroupTagCategoryShow",
        components: {VCard, VDataListItemEditable, VGroupTagCategoryTags, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('groupTagCategory', ['update'])
        },
        computed: {
            ...mapState('groupTagCategory', ['groupTagCategory'])
        }
    }
</script>

<style scoped>

</style>