<template>
    <div>
        <the-title title="Group Members">

        </the-title>
        <v-group-members :group-id="groupId">

        </v-group-members>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupMembers from "../../components/group/VGroupMembers";
    export default {
        name: "GroupMembers",
        components: {VGroupMembers, TheTitle},
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