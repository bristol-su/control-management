<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="positionTagCategory"
              id="positionTagCategory-name"
              v-b-tooltip.hover
              :title="positionTagCategory.description">
            <router-link :to="{name: 'positionTagCategory', params: {positionTagCategoryId: positionTagCategory.id}}">
                {{positionTagCategory.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>

    </div>
</template>

<script>
    export default {
        name: "PositionTagCategoryName",
        props: {
            positionTagCategoryId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                positionTagCategory: null,
                loading: false
            }
        },
        mounted() {
            this.fetchPositionTagCategory();
        },
        watch: {
            positionTagCategoryId() {
                this.fetchPositionTagCategory();
            }
        },
        methods: {
            fetchPositionTagCategory() {
                this.loading = true;
                this.$store.dispatch('positionTagCategory/loadPositionTagCategory', this.positionTagCategoryId)
                    .then(positionTagCategory => this.positionTagCategory = positionTagCategory)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>