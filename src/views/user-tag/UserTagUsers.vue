<template>
    <div>
        <the-title title="Users Tagged">

        </the-title>
        <v-user-tag-users :tag-id="userTagId">

        </v-user-tag-users>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VUserTagUsers from "../../components/tag/VUserTagUsers";
    export default {
        name: "UserTagUsers",
        components: {VUserTagUsers, TheTitle},
        props: {
            userTagId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>