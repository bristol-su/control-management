<template>
    <div>
        <the-title title="Position Tags">

        </the-title>
        <v-position-tags :position-id="positionId">

        </v-position-tags>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VPositionTags from "../../components/position/VPositionTags";
    export default {
        name: "PositionTags",
        components: {VPositionTags, TheTitle},
        props: {
            positionId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>