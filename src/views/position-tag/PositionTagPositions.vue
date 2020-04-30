<template>
    <div>
        <the-title title="Positions Tagged">

        </the-title>
        <v-position-tag-positions :tag-id="positionTagId">

        </v-position-tag-positions>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VPositionTagPositions from "../../components/tag/VPositionTagPositions";
    export default {
        name: "PositionTagPositions",
        components: {VPositionTagPositions, TheTitle},
        props: {
            positionTagId: {
                required: true,
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>