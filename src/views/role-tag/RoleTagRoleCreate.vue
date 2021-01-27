<template>
    <div>
        <the-title title="Tag a Role">

        </the-title>
        <b-form @submit.prevent="create">

            <v-find-role v-model="roleId"></v-find-role>

            <v-button-submit :disabled="!roleChosen" :loading="loading">Tag Role</v-button-submit>
        </b-form>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VButtonSubmit from "../../components/common/VButtonSubmit";
    import Notify from "../../service/Notify";
    import VFindRole from "../../components/role/VFindRole";

    export default {
        name: "RoleTagRoleCreate",
        components: {VFindRole, VButtonSubmit, TheTitle},
        props: {
            roleTagId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                roleId: null,
                loading: false
            }
        },
        methods: {
            create() {
                this.loading = true;
                this.$control.roleTag().tagRole(this.roleTagId, this.roleId)
                    .then(() => {
                        Notify.success('Role Tagged');
                        this.$router.push({
                            name: 'roleTag', params: {roleTagId: this.roleTagId}
                        });
                    })
                    .catch(() => this.loading = false);
            }
        },
        computed: {
            roleChosen() {
                return this.roleId !== null;
            }
        }
    }
</script>

<style scoped>

</style>