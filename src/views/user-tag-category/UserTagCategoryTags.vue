<template>
    <div>
        <the-title title="Tags">

        </the-title>
        <v-user-tag-category-tags :user-tag-category-id="userTagCategoryId">

        </v-user-tag-category-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserTagCategoryTags from "../../components/tag-category/VUserTagCategoryTags";
    export default {
        name: "UserTagCategoryTags",
        components: {VUserTagCategoryTags, TheTitle},
        props: {
            userTagCategoryId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>