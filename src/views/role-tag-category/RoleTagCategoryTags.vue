<template>
    <div>
        <the-title title="Tags">

        </the-title>
        <v-role-tag-category-tags :role-tag-category-id="roleTagCategoryId">

        </v-role-tag-category-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VRoleTagCategoryTags from "../../components/tag-category/VRoleTagCategoryTags";
    export default {
        name: "RoleTagCategoryTags",
        components: {VRoleTagCategoryTags, TheTitle},
        props: {
            roleTagCategoryId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>