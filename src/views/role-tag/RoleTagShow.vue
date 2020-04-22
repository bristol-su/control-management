<template>
    <div>
        <the-title :title="roleTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{roleTag.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{roleTag.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{roleTag.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{roleTag.full_reference}}
                    </v-data-list-item>

                    <v-data-list-item title="Category">
                        <role-tag-category-name :role-tag-category-id="roleTag.tag_category_id"></role-tag-category-name>
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Roles" sub-title="Roles that belong to the tag">
                            <b-card-text>
                                <role-tag-roles :tag-id="roleTag.id">

                                </role-tag-roles>
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
    import RoleTagCategoryName from "../../components/tag-category/RoleTagCategoryName";
    import RoleTagRoles from "../../components/tag/RoleTagRoles";
    export default {
        name: "RoleTagShow",
        components: {RoleTagRoles, RoleTagCategoryName, VDataListItem, VDataList, TheTitle},
        props: {
            roleTag: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>