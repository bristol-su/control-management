<template>
    <div>
        <the-title :title="positionTagCategory.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag Category ID">
                        {{positionTagCategory.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="positionTagCategory.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="positionTagCategory.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="positionTagCategory.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Tags" sub-title="Tags that belong to the category">
                            <template v-slot:icons>
                                <router-link
                                        :to="{name: 'positionTagCategory-tag', params: {positionTagCategoryId: positionTagCategory.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-position-tag-category-tags :position-tag-category-id="positionTagCategory.id"></v-position-tag-category-tags>
                        </v-card>
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
    import VPositionTagCategoryTags from "../../components/tag-category/VPositionTagCategoryTags";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VCard from "../../components/common/VCard";
    export default {
        name: "PositionTagCategoryShow",
        components: {VCard, VDataListItemEditable, VPositionTagCategoryTags, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('positionTagCategory', ['update'])
        },
        computed: {
            ...mapState('positionTagCategory', ['positionTagCategory'])
        }
    }
</script>

<style scoped>

</style>