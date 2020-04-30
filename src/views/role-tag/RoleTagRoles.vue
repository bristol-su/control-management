<template>
    <div>
        <the-title title="Roles Tagged">

        </the-title>
        <v-role-tag-roles :tag-id="roleTagId">

        </v-role-tag-roles>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VRoleTagRoles from "../../components/tag/VRoleTagRoles";
    export default {
        name: "RoleTagRoles",
        components: {VRoleTagRoles, TheTitle},
        props: {
            roleTagId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>