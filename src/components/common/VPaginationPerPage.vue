<template>
    <b-input-group append="Records per Page">
        <b-form-select :value="value" :options="perPageOptions" @input="$emit('input', $event)">
        </b-form-select>
    </b-input-group>
</template>

<script>
    export default {
        name: "VPaginationPerPage",
        props: {
            value: {
                required: true,
                type: Number,
                validator: function(value) {
                    return value >= 1
                }
            }
        },

        data() {
            return {
                allowedValues: [
                    1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100
                ]
            }
        },
        computed: {
            perPageOptions() {
                return this.allowedValues.map(option => {
                    return {value: option, text: option}
                })
            }
        }
    }
</script>

<style scoped>

</style>