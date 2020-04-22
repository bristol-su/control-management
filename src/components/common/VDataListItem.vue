<template>
    <b-list-group-item class="flex-column align-items-start">
        <h5 class="mb-1" >{{title}}</h5>
        <p class="mb-1">
            <slot></slot>
        </p>
    </b-list-group-item>
</template>

<script>
    export default {
        name: "VDataListItem",
        props: {
            title: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped>

</style>