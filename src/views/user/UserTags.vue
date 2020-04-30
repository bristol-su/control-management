<template>
    <div>
        <the-title title="User Tags">

        </the-title>
        <v-user-tags :user-id="userId">

        </v-user-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserTags from "../../components/user/VUserTags";

    export default {
        name: "UserTags",
        components: {VUserTags, TheTitle},
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