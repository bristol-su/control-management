<template>
    <div>
        <the-title title="Give a User a Role">

        </the-title>
        <b-form @submit="create">
            <b-tabs content-class="mt-3" fill v-model="tab">
                <b-tab title="Existing Role" active>
                    <v-find-role v-model="roleIdFind"></v-find-role>
                </b-tab>
                <b-tab title="Create Role">
                    <v-create-role v-model="roleIdCreate"></v-create-role>
                </b-tab>
            </b-tabs>

            <v-button-submit :disabled="!roleChosen" :loading="loading" v-if="roleId !== null">Give Role to User</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VFindRole from "../../components/role/VFindRole";
    import VCreateRole from "../../components/role/VCreateRole";

    export default {
        name: "UserRolesCreate",
        components: {VCreateRole, VFindRole, VButtonSubmit, TheTitle},
        props: {
            userId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                roleIdFind: null,
                roleIdCreate: null,
                loading: false,
                tab: null
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.user().addRole(this.userId, this.roleId)
                    .then(() => {
                        Notify.success('Role given to user');
                        this.$router.push({
                            name: 'role', params: {roleId: this.roleId}
                        });
                    })
            }
        },
        computed: {
            roleChosen() {
                return this.roleId !== null;
            },
            roleId() {
                if(this.tab === 0) {
                    return this.roleIdFind;
                } if(this.tab === 1) {
                    return this.roleIdCreate;
                }
                return null;
            }
        }
    }
</script>

<style scoped>

</style>