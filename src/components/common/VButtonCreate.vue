<template>
    <b-button @click="$emit('create')">{{title}}</b-button>
</template>

<script>
    export default {
        name: "VButtonCreate",
        props: {
            title: {
                required: false,
                type: String,
                default: 'Create'
            }
        }
    }
</script>

<style scoped>

</style>