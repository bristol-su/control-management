<template>
    <b-list-group-item class="flex-column align-items-start">
        <div class="d-flex justify-content-between">
            <h5 class="mb-1">{{title}}</h5>
            <small>
                <slot name="top-right">
                    
                </slot>
            </small>
        </div>
        <div class="d-flex justify-content-between">
            <div class="mb-1" style="width: 100%; text-align: left;">
                <slot></slot>
            </div>
        </div>
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