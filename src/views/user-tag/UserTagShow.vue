<template>
    <div>
        <the-title :title="userTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{userTag.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{userTag.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{userTag.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{userTag.full_reference}}
                    </v-data-list-item>

                    <v-data-list-item title="Category">
                        <user-tag-category-name :user-tag-category-id="userTag.tag_category_id"></user-tag-category-name>
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Users" sub-title="Users that belong to the tag">
                            <b-card-text>
                                <user-tag-users :tag-id="userTag.id">

                                </user-tag-users>
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
    import UserTagCategoryName from "../../components/tag-category/UserTagCategoryName";
    import UserTagUsers from "../../components/tag/UserTagUsers";
    export default {
        name: "UserTagShow",
        components: {UserTagUsers, UserTagCategoryName, VDataListItem, VDataList, TheTitle},
        props: {
            userTag: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>