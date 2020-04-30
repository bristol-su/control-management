<template>
    <div>
        <the-title title="Tags">

        </the-title>
        <v-position-tag-category-tags :position-tag-category-id="positionTagCategoryId">

        </v-position-tag-category-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VPositionTagCategoryTags from "../../components/tag-category/VPositionTagCategoryTags";
    export default {
        name: "PositionTagCategoryTags",
        components: {VPositionTagCategoryTags, TheTitle},
        props: {
            positionTagCategoryId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>