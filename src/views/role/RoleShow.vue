<template>
    <div>
        <the-title :title="roleName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Role ID">
                        {{role.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Name">
                        {{roleName}}
                    </v-data-list-item>

                    <v-data-list-item title="Group Name">
                        <group-name :group-id="role.group_id"></group-name>
                    </v-data-list-item>

                    <v-data-list-item title="Position Name">
                        <position-name :position-id="role.position_id"></position-name>
                    </v-data-list-item>

                    <v-data-list-item title="Email">
                        <span v-if="roleEmail">
                            <a :href="'mailto:' + roleEmail">{{roleEmail}}</a>
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
                        <b-card title="Users" sub-title="Users that are assigned to the role">
                            <b-card-text>
                                <role-owners :role-id="role.id"></role-owners>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags the role is tagged with">
                            <b-card-text>
                                <role-tags :role-id="role.id"></role-tags>
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
    import GroupName from "../../components/common/GroupName";
    import PositionName from "../../components/common/PositionName";
    import RoleTags from "../../components/role/RoleTags";
    import RoleOwners from "../../components/role/RoleOwners";

    export default {
        name: "RoleShow",
        components: {
            RoleOwners, RoleTags, PositionName, GroupName, VDataListItem, VDataList, TheTitle},
        props: {
            role: {
                required: true,
                type: Object
            }
        },

        filters: {

        },

        computed: {
            roleName() {
                return this.role.data.role_name;
            },
            roleEmail() {
                return this.role.data.email;
            },
        }
    }
</script>

<style scoped>

</style>