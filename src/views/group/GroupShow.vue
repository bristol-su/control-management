<template>
    <div>
        <the-title :title="groupName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="Group ID">
                        {{group.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="Name"
                            :value="groupName"
                            @update="$store.dispatch('group/update', {name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Email"
                            :value="groupEmail"
                            @update="$store.dispatch('group/update', {email: $event})">

                        <div>
                            <span v-if="groupEmail">
                                <a :href="'mailto:' + groupEmail">{{groupEmail}}</a>
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
                        <v-card title="Memberships" sub-title="Groups the group is a member of">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-group-member', params: { groupId: group.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'group-member', params: {groupId: group.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-group-members :group-id="group.id"></v-group-members>
                        </v-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <v-card title="Roles" sub-title="Roles that belong to the group">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-group-role', params: { groupId: group.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'group-role', params: {groupId: group.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-group-roles :group-id="group.id"></v-group-roles>
                        </v-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <v-card title="Tags" sub-title="Tags the group is tagged with">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-group-tag', params: { groupId: group.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'group-tag', params: {groupId: group.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-group-tags :group-id="group.id"></v-group-tags>
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
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VGroupTags from "../../components/group/VGroupTags";
    import VGroupRoles from "../../components/group/VGroupRoles";
    import VGroupMembers from "../../components/group/VGroupMembers";
    import {mapState} from "vuex";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";

    export default {
        name: "GroupShow",
        components: {
            VButtonAdd,
            VCard,
            VGroupMembers, VGroupRoles, VGroupTags, VDataListItem, VDataList, TheTitle, VDataListItemEditable},

        filters: {},

        computed: {
            ...mapState('group', ['group']),
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