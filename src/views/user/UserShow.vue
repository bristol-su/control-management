<template>
    <div>
        <the-title :title="userName"></the-title>
        <b-row>
            <b-col cols="4">
                <v-data-list>
                    <v-data-list-item title="User ID">
                        {{user.id}}
                    </v-data-list-item>

                    <v-data-list-item title="Data Provider ID">
                        {{user.data.id}}
                    </v-data-list-item>

                    <v-data-list-item-editable
                            title="First Name"
                            :value="user.data.first_name"
                            @update="update({first_name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Last Name"
                            :value="user.data.last_name"
                            @update="update({last_name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Preferred Name"
                            :value="user.data.preferred_name"
                            @update="update({preferred_name: $event})">

                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Email"
                            :value="userEmail"
                            @update="update({email: $event})">

                        <div>
                            <span v-if="userEmail">
                                <a :href="'mailto:' + userEmail">{{userEmail}}</a>
                            </span>
                            <span v-else>
                                No email on record
                            </span>
                        </div>

                        <template v-slot:editing="{newValue, updateValue}">
                            <b-input type="email" :value="newValue" @input="updateValue"></b-input>
                        </template>
                    </v-data-list-item-editable>

                    <v-data-list-item-editable
                            title="Date of Birth"
                            :value="formattedUserDateOfBirth"
                            @update="formattedUserDateOfBirth = $event">

                        {{userDateOfBirth | date}}

                        <template v-slot:editing="{newValue, updateValue}">
                            <b-form-datepicker
                                    :value="newValue"
                                    @input="updateValue"
                                    class="mb-2">

                            </b-form-datepicker>
                        </template>
                    </v-data-list-item-editable>

                    <v-data-list-item title="Age">
                        {{userDateOfBirth | age}}
                    </v-data-list-item>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row class="my-3">
                    <b-col>
                        <v-card
                            title="Memberships"
                            sub-title="Groups the user is a member of">

                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-user-membership', params: { userId: user.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'user-membership', params: {userId: user.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>

                            <v-user-memberships :user-id="user.id"></v-user-memberships>

                        </v-card>
                    </b-col>
                </b-row>
                <b-row class="my-3">
                    <b-col>
                        <v-card title="Roles" sub-title="Positions the user holds in a group">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-user-role', params: { userId: user.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'user-role', params: {userId: user.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-user-roles :user-id="user.id"></v-user-roles>
                        </v-card>
                    </b-col>
                </b-row>
                <b-row class="my-3">
                    <b-col>
                        <v-card title="Tags" sub-title="Tags the user is tagged with">
                            <template v-slot:icons>
                                <router-link :to="{ name: 'create-user-tag', params: { userId: user.id } }">
                                    <v-button-add></v-button-add>
                                </router-link>

                                <router-link
                                        :to="{name: 'user-tag', params: {userId: user.id}}">
                                    <i class="fa fa-external-link-alt"></i>
                                </router-link>
                            </template>
                            <v-user-tags :user-id="user.id"></v-user-tags>
                        </v-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import moment from 'moment';
    import VDataList from "../../components/common/VDataList";
    import VDataListItem from "../../components/common/VDataListItem";
    import VUserMemberships from "../../components/user/VUserMemberships";
    import VUserRoles from "../../components/user/VUserRoles";
    import VUserTags from "../../components/user/VUserTags";
    import {mapActions, mapState} from "vuex";
    import VDataListItemEditable from "../../components/common/VDataListItemEditable";
    import VCard from "../../components/common/VCard";
    import VButtonAdd from "../../components/common/VButtonAdd";

    export default {
        name: "UserShow",
        components: {
            VButtonAdd,
            VCard,
            VDataListItemEditable,
            VUserTags,
            VUserRoles,
            VUserMemberships,
            VDataListItem,
            VDataList,
            TheTitle
        },

        filters: {
            date(val) {
                if (val) {
                    return moment(val).format('MMMM Do YYYY')
                }
                return 'No date of birth found';
            },
            age(val) {
                if (val) {
                    return moment().diff(moment(val), 'years');
                }
                return 'No date of birth found';
            },
        },

        methods: {
            ...mapActions('user', ['update'])
        },

        computed: {
            ...mapState('user', ['user']),
            userName() {
                return this.user.data.first_name + ' ' + this.user.data.last_name;
            },
            userEmail() {
                return this.user.data.email;
            },
            userDateOfBirth() {
                return this.user.data.dob;
            },
            formattedUserDateOfBirth: {
                get: function () {
                    if (this.userDateOfBirth) {
                        return moment(this.userDateOfBirth).format('YYYY-MM-DD');
                    }
                    return null;
                },
                set: function (val) {
                    this.update({dob: moment(val).format('DD-MM-YYYY')})
                }
            }
        }
    }
</script>

<style scoped>

</style>