<template>
    <div>
        <the-title title="Role Owners">

        </the-title>
        <v-role-owners :role-id="roleId">

        </v-role-owners>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VRoleOwners from "../../components/role/VRoleOwners";

    export default {
        name: "RoleOwners",
        components: {VRoleOwners, TheTitle},
        props: {
            roleId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>