<template>
    <div>
        <the-title title="Role Tags">

        </the-title>
        <v-role-tags :role-id="roleId">

        </v-role-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VRoleTags from "../../components/role/VRoleTags";

    export default {
        name: "RoleTags",
        components: {VRoleTags, TheTitle},
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