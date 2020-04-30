<template>
    <div>
        <the-title title="Position Roles">

        </the-title>
        <v-position-roles :position-id="positionId">

        </v-position-roles>
    </div>
</template>

<script>
    import TheTitle from "../../components/common/TheTitle";
    import VPositionRoles from "../../components/position/VPositionRoles";
    export default {
        name: "PositionRoles",
        components: {VPositionRoles, TheTitle},
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