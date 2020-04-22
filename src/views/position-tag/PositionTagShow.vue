<template>
    <div>
        <the-title :title="positionTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{positionTag.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{positionTag.name}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{positionTag.description}}
                    </v-data-list-item>

                    <v-data-list-item title="Reference">
                        {{positionTag.full_reference}}
                    </v-data-list-item>

                    <v-data-list-item title="Category">
                        <position-tag-category-name :position-tag-category-id="positionTag.tag_category_id"></position-tag-category-name>
                    </v-data-list-item>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Positions" sub-title="Positions that belong to the tag">
                            <b-card-text>
                                <position-tag-positions :tag-id="positionTag.id">

                                </position-tag-positions>
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
    import PositionTagCategoryName from "../../components/tag-category/PositionTagCategoryName";
    import PositionTagPositions from "../../components/tag/PositionTagPositions";
    export default {
        name: "PositionTagShow",
        components: {PositionTagPositions, PositionTagCategoryName, VDataListItem, VDataList, TheTitle},
        props: {
            positionTag: {
                required: true,
                type: Object
            }
        },

    }
</script>

<style scoped>

</style>