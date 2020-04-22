<template>
    <div>
        <the-title :title="positionTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{positionTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{positionTagCategory.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{positionTagCategory.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{positionTagCategory.reference}}
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags that belong to the category">
                            <b-card-text>
                                <position-tag-category-tags :position-tag-category-id="positionTagCategory.id"></position-tag-category-tags>
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
    import PositionTagCategoryTags from "../../components/tag-category/PositionTagCategoryTags";
    export default {
        name: "PositionTagCategoryShow",
        components: {PositionTagCategoryTags, VDataListItem, VDataList, TheTitle},
        props: {
            positionTagCategory: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>