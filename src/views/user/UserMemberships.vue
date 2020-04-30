<template>
    <div>
        <the-title title="User Memberships">

        </the-title>
        <v-user-memberships :user-id="userId">

        </v-user-memberships>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserMemberships from "../../components/user/VUserMemberships";

    export default {
        name: "UserMemberships",
        components: {VUserMemberships, TheTitle},
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