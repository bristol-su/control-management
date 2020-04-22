<template>
    <div>
        <the-title :title="positionName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Position ID">
                        {{position.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{positionName}}
                    </v-data-list-item>

                    <v-data-list-item title="Description">
                        {{position.data.description}}
                    </v-data-list-item>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Roles" sub-title="Roles that have the position">
                            <b-card-text>
                                <position-roles :position-id="position.id"></position-roles>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags the position is tagged with">
                            <b-card-text>
                                <position-tags :position-id="position.id"></position-tags>
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
    import PositionTags from "../../components/position/PositionTags";
    import PositionRoles from "../../components/position/PositionRoles";

    export default {
        name: "PositionShow",
        components: {PositionRoles, PositionTags, VDataListItem, VDataList, TheTitle},
        props: {
            position: {
                required: true,
                type: Object
            }
        },
        computed: {
            positionName() {
                return this.position.data.name;
            }
        }
    }
</script>

<style scoped>

</style>