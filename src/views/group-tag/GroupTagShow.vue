<template>
    <div>
        <the-title :title="groupTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{groupTag.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{groupTag.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{groupTag.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{groupTag.full_reference}}
                    </v-data-list-item>

                    <v-data-list-item title="Category">
                        <group-tag-category-name :group-tag-category-id="groupTag.tag_category_id"></group-tag-category-name>
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Groups" sub-title="Groups that belong to the tag">
                            <b-card-text>
                                <group-tag-groups :tag-id="groupTag.id">

                                </group-tag-groups>
                            </b-card-text>
                        </b-card>
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
    import GroupTagGroups from "../../components/tag/GroupTagGroups";
    export default {
        name: "GroupTagShow",
        components: {GroupTagGroups, GroupTagCategoryName, VDataListItem, VDataList, TheTitle},
        props: {
            groupTag: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>