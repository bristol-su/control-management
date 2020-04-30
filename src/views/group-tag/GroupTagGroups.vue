<template>
    <div>
        <the-title title="Groups Tagged">

        </the-title>
        <v-group-tag-groups :tag-id="groupTagId">

        </v-group-tag-groups>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VGroupTagGroups from "../../components/tag/VGroupTagGroups";
    export default {
        name: "GroupTagGroups",
        components: {VGroupTagGroups, TheTitle},
        props: {
            groupTagId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>