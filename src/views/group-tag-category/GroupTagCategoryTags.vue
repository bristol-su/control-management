<template>
    <div>
        <the-title title="Tags">

        </the-title>
        <v-group-tag-category-tags :group-tag-category-id="groupTagCategoryId">

        </v-group-tag-category-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupTagCategoryTags from "../../components/tag-category/VGroupTagCategoryTags";
    export default {
        name: "GroupTagCategoryTags",
        components: {VGroupTagCategoryTags, TheTitle},
        props: {
            groupTagCategoryId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>