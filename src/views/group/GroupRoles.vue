<template>
    <div>
        <the-title title="Group Roles">

        </the-title>
        <v-group-roles :group-id="groupId">

        </v-group-roles>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupRoles from "../../components/group/VGroupRoles";
    export default {
        name: "GroupRoles",
        components: {VGroupRoles, TheTitle},
        props: {
            groupId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>