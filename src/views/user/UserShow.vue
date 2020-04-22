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

                    <v-data-list-item title="First Name">
                        {{user.data.first_name}}
                    </v-data-list-item>

                    <v-data-list-item title="Last Name">
                        {{user.data.last_name}}
                    </v-data-list-item>

                    <v-data-list-item title="Preferred Name">
                        {{user.data.preferred_name}}
                    </v-data-list-item>

                    <v-data-list-item title="Email">
                        <span v-if="userEmail">
                            <a :href="'mailto:' + userEmail">{{userEmail}}</a>
                        </span>
                        <span v-else>
                            No email on record
                        </span>
                    </v-data-list-item>

                    <v-data-list-item title="Date of Birth">
                        {{userDateOfBirth | date}}
                    </v-data-list-item>

                    <v-data-list-item title="Age">
                        {{userDateOfBirth | age}}
                    </v-data-list-item>

                </v-data-list>

            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col>
                        <b-card title="Memberships" sub-title="Groups the user is a member of">
                            <b-card-text>
                                <user-memberships :user-id="user.id"></user-memberships>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Roles" sub-title="Positions the user holds in a group">
                            <b-card-text>
                                <user-roles :user-id="user.id"></user-roles>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card title="Tags" sub-title="Tags the user is tagged with">
                            <b-card-text>
                                <user-tags :user-id="user.id"></user-tags>
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
    import moment from 'moment';
    import VDataList from "../../components/common/VDataList";
    import VDataListItem from "../../components/common/VDataListItem";
    import UserMemberships from "../../components/user/UserMemberships";
    import UserRoles from "../../components/user/UserRoles";
    import UserTags from "../../components/user/UserTags";

    export default {
        name: "UserShow",
        components: {UserTags, UserRoles, UserMemberships, VDataListItem, VDataList, TheTitle},
        props: {
            user: {
                required: true,
                type: Object
            }
        },

        filters: {
            date(val) {
                if(val) {
                    return moment(val).format('MMMM Do YYYY')
                }
                return 'No date of birth found';
            },
            age(val) {
                if(val) {
                    return moment().diff(moment(val), 'years');
                }
                return 'No date of birth found';
            },
        },

        computed: {
            userName() {
                return this.user.data.first_name + ' ' + this.user.data.last_name;
            },
            userEmail() {
                return this.user.data.email;
            },
            userDateOfBirth() {
                return this.user.data.dob;
            }
        }
    }
</script>

<style scoped>

</style>