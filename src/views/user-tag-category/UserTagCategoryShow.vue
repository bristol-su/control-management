<template>
    <div>
        <the-title :title="userTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{userTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{userTagCategory.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{userTagCategory.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{userTagCategory.reference}}
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags that belong to the category">
                            <b-card-text>
                                <user-tag-category-tags :user-tag-category-id="userTagCategory.id"></user-tag-category-tags>
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
    import UserTagCategoryTags from "../../components/tag-category/UserTagCategoryTags";
    export default {
        name: "UserTagCategoryShow",
        components: {UserTagCategoryTags, VDataListItem, VDataList, TheTitle},
        props: {
            userTagCategory: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>