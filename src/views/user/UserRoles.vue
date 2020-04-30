<template>
    <div>
        <the-title title="User Roles">

        </the-title>
        <v-user-roles :user-id="userId">

        </v-user-roles>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserRoles from "../../components/user/VUserRoles";

    export default {
        name: "UserRoles",
        components: {VUserRoles, TheTitle},
        props: {
            userId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>