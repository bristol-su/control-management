<template>
    <div>
        <the-title :title="groupName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Group ID">
                        {{group.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{groupName}}
                    </v-data-list-item>

                    <v-data-list-item title="Email">
                        <span v-if="groupEmail">
                            <a :href="'mailto:' + groupEmail">{{groupEmail}}</a>
                        </span>
                        <span v-else>
                            No email on record
                        </span>
                    </v-data-list-item>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Memberships" sub-title="Groups the group is a member of">
                            <b-card-text>
                                <group-members :group-id="group.id"></group-members>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Roles" sub-title="Roles that belong to the group">
                            <b-card-text>
                                <group-roles :group-id="group.id"></group-roles>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags the group is tagged with">
                            <b-card-text>
                                <group-tags :group-id="group.id"></group-tags>
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
    import GroupTags from "../../components/group/GroupTags";
    import GroupRoles from "../../components/group/GroupRoles";
    import GroupMembers from "../../components/group/GroupMembers";

    export default {
        name: "GroupShow",
        components: {GroupMembers, GroupRoles, GroupTags, VDataListItem, VDataList, TheTitle},
        props: {
            group: {
                required: true,
                type: Object
            }
        },

        filters: {

        },

        computed: {
            groupName() {
                return this.group.data.name;
            },
            groupEmail() {
                return this.group.data.email;
            },
        }
    }
</script>

<style scoped>

</style>