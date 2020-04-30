<template>
    <div>
        <the-title title="Add Member">

        </the-title>
        <b-form @submit="create">

            <b-form-group id="user-group" label="User:" label-for="user" description="User to make a member of the group">
                    <v-user-dropdown v-model="userId" id="user"></v-user-dropdown>
            </b-form-group>

            <v-button-submit :disabled="!userChosen" :loading="loading">Add Member</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VUserDropdown from "../../components/common/VUserDropdown";

    export default {
        name: "GroupMembersCreate",
        components: {VUserDropdown, VButtonSubmit, TheTitle},
        props: {
            groupId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                userId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.group().addUser(this.groupId, this.userId)
                    .then(() => {
                        Notify.success('Membership created');
                        this.$router.push({
                            name: 'group', params: {groupId: this.groupId}
                        });
                    })
            }
        },
        computed: {
            userChosen() {
                return this.userId !== null;
            }
        }
    }
</script>

<style scoped>

</style>