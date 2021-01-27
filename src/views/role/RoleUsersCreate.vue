<template>
    <div>
        <the-title title="Assign user to a role">

        </the-title>
        <b-form @submit.prevent="create">
            <b-form-group id="user-id-group" label="User:" label-for="user-select" description="Search for the user to add to the role by email">
                <v-user-dropdown id="user-select" v-model="userId"></v-user-dropdown>
            </b-form-group>
            <v-button-submit :disabled="!userChosen" :loading="loading" v-if="userId !== null">Give Role to User</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VUserDropdown from "../../components/common/VUserDropdown";
    export default {
        name: "RoleUsersCreate",
        components: {VUserDropdown, VButtonSubmit, TheTitle},
        props: {
            roleId: {
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
                this.$control.role().addUser(this.roleId, this.userId)
                    .then(() => {
                        Notify.success('The user has been given the role');
                        this.$router.push({
                            name: 'role', params: {roleId: this.roleId}
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