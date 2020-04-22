<template>
    <b-input-group prepend="Goto Page">
        <b-form-input type="number" :value="value" @input="$emit('input', $event)"></b-form-input>
    </b-input-group>
</template>

<script>
    export default {
        name: "VPaginationGotoPage",
        props: {
            value: {
                required: true,
                type: Number,
                validator: function(value) {
                    return value >= 1;
                }
            }
        },

    }
</script>

<style scoped>

</style>