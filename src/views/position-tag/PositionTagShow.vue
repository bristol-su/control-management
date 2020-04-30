<template>
    <div>
        <the-title :title="positionTag.name"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Tag ID">
                        {{positionTag.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="positionTag.name"
                            @update="update({name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Description"
                            :value="positionTag.description"
                            @update="update({description: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Reference"
                            :value="positionTag.reference"
                            @update="update({reference: $event})">
                    </v-data-list-item-editable>

                    <v-data-list-item title="Full Reference">
                        {{positionTag.full_reference}}
                    </v-data-list-item>


                    <v-data-list-item-editable
                            title="Category"
                            :value="positionTag.tag_category_id"
                            @update="update({tag_category_id: $event})">

                        <div>
                            <position-tag-category-name
                                    :position-tag-category-id="positionTag.tag_category_id">
                            </position-tag-category-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <position-tag-category-dropdown
                                    :value="newValue"
                                    @input="updateValue">
                            </position-tag-category-dropdown>
                        </template>

                    </v-data-list-item-editable>
                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Positions" sub-title="Positions that belong to the tag">
                                <template v-slot:icons>
                                    <router-link
                                            :to="{name: 'create-positionTag-position', params: {positionTagId: positionTag.id}}">
                                        <v-button-add></v-button-add>
                                    </router-link>

                                    <router-link
                                            :to="{name: 'positionTag-position', params: {positionTagId: positionTag.id}}">
                                        <i class="fa fa-external-link-alt"></i>
                                    </router-link>
                                </template>
                                <v-position-tag-positions :tag-id="positionTag.id"></v-position-tag-positions>
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
    import PositionTagCategoryName from "../../components/tag-category/PositionTagCategoryName";
    import VPositionTagPositions from "../../components/tag/VPositionTagPositions";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import PositionTagCategoryDropdown from "../../components/common/VPositionTagCategoryDropdown";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";
    export default {
        name: "PositionTagShow",
        components: {
            VButtonAdd,
            VCard,
            PositionTagCategoryDropdown,
            VDataListItemEditable,
            VPositionTagPositions, PositionTagCategoryName, VDataListItem, VDataList, TheTitle},
        methods: {
            ...mapActions('positionTag', ['update'])
        },
        computed: {
            ...mapState('positionTag', ['positionTag'])
        }

    }
</script>

<style scoped>

</style>