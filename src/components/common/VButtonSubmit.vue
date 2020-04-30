<template>
    <b-button type="submit" variant="primary" :disabled="loading">
        <span v-if="!loading"><slot></slot></span>
        <span v-else>Loading...</span>
    </b-button>
</template>

<script>
    export default {
        name: "VButtonSubmit",
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>