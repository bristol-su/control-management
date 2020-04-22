<template>
    <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8"><h1 style="text-align: center">{{title}}</h1></b-col>
        <b-col cols="2">
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "TheTitle",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>