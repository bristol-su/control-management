<template>
    <div>
        <the-title title="Group Tags">

        </the-title>
        <v-group-tags :group-id="groupId">

        </v-group-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupTags from "../../components/group/VGroupTags";
    export default {
        name: "GroupTags",
        components: {VGroupTags, TheTitle},
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