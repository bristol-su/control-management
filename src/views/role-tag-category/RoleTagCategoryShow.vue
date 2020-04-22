<template>
    <div>
        <the-title :title="roleTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{roleTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{roleTagCategory.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{roleTagCategory.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{roleTagCategory.reference}}
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags that belong to the category">
                            <b-card-text>
                                <role-tag-category-tags :role-tag-category-id="roleTagCategory.id"></role-tag-category-tags>
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
    import RoleTagCategoryTags from "../../components/tag-category/RoleTagCategoryTags";
    export default {
        name: "RoleTagCategoryShow",
        components: {RoleTagCategoryTags, VDataListItem, VDataList, TheTitle},
        props: {
            roleTagCategory: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>