<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="position"
              id="position-name"
              v-b-tooltip.hover
              :title="position.data.description">
            <router-link :to="{name: 'position', params: {positionId: position.id}}">
                {{position.data.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>

    </div>
</template>

<script>
    export default {
        name: "PositionName",
        props: {
            positionId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                position: null,
                loading: false
            }
        },
        mounted() {
            this.fetchPosition();
        },
        watch: {
            positionId() {
                this.fetchPosition();
            }
        },
        methods: {
            fetchPosition() {
                this.loading = true;
                this.$store.dispatch('position/loadPosition', this.positionId)
                    .then(position => this.position = position)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>