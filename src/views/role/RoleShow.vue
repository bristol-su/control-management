<template>
    <div>
        <the-title :title="roleName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Role ID">
                        {{role.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                        title="Name"
                        :value="roleName"
                        @update="update({role_name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Group Name"
                            :value="role.group_id"
                            @update="update({group_id: $event})">

                        <div>
                            <group-name :group-id="role.group_id"></group-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <group-dropdown
                                    :value="newValue"
                                    @input="updateValue">

                            </group-dropdown>
                        </template>

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Position Name"
                            :value="role.position_id"
                            @update="update({position_id: $event})">

                        <div>
                            <position-name :position-id="role.position_id"></position-name>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <position-dropdown
                                    :value="newValue"
                                    @input="updateValue">

                            </position-dropdown>
                        </template>

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Email"
                            :value="roleEmail"
                            @update="update({email: $event})">

                        <div>
                            <span v-if="roleEmail">
                                <a :href="'mailto:' + roleEmail">{{roleEmail}}</a>
                            </span>
                            <span v-else>
                                No email on record
                            </span>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <b-input type="email" :value="newValue" @input="updateValue"></b-input>
                        </template>

                    </v-data-list-item-editable>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <v-card title="Users" sub-title="Users that are assigned to the role">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-role-user', params: { roleId: role.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'role-owner', params: {roleId: role.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-role-owners :role-id="role.id"></v-role-owners>
                        </v-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <v-card title="Tags" sub-title="Tags the role is tagged with">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-role-tag', params: { roleId: role.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'role-tag', params: {roleId: role.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-role-tags :role-id="role.id"></v-role-tags>
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
    import GroupName from "../../components/common/VGroupName";
    import PositionName from "../../components/common/VPositionName";
    import VRoleTags from "../../components/role/VRoleTags";
    import VRoleOwners from "../../components/role/VRoleOwners";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import PositionDropdown from "../../components/common/VPositionDropdown";
    import GroupDropdown from "../../components/common/VGroupDropdown";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";

    export default {
        name: "RoleShow",
        components: {
            VButtonAdd,
            VCard,
            GroupDropdown,
            PositionDropdown,
            VDataListItemEditable,
            VRoleOwners, VRoleTags, PositionName, GroupName, VDataListItem, VDataList, TheTitle},

        methods: {
            ...mapActions('role', ['update'])
        },

        computed: {
            ...mapState('role', ['role']),
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