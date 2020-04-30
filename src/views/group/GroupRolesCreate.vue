<template>
    <div>
        <the-title title="Give a Group a Role">

        </the-title>
        <v-create-role :initial-group-id="groupId" @input="success"></v-create-role>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import Notify from "../../service/Notify";
    import VCreateRole from "../../components/role/VCreateRole";

    export default {
        name: "GroupRolesCreate",
        components: {VCreateRole, TheTitle},
        props: {
            groupId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                roleId: null,
                loading: false,
                tab: null
            }
        },
        methods: {
            success() {
                Notify.success('Role given to group');
                this.$router.push({
                    name: 'group', params: {groupId: this.groupId}
                });
            }
        },
        computed: {
            roleChosen() {
                return this.roleId !== null;
            },
        }
    }
</script>

<style scoped>

</style>