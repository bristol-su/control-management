<template>
    <div>
        <span v-if="loading">Loading...</span>
        <span v-else-if="userTagCategory"
              id="userTagCategory-name"
              v-b-tooltip.hover
              :title="userTagCategory.description">
            <router-link :to="{name: 'userTagCategory', params: {userTagCategoryId: userTagCategory.id}}">
                {{userTagCategory.name}}
            </router-link>
        </span>
        <span v-else>Error!</span>

    </div>
</template>

<script>
    export default {
        name: "UserTagCategoryName",
        props: {
            userTagCategoryId: {
                required: true,
                type: Number
            }
        },
        data() {
            return {
                userTagCategory: null,
                loading: false
            }
        },
        mounted() {
            this.fetchUserTagCategory();
        },
        watch: {
            userTagCategoryId() {
                this.fetchUserTagCategory();
            }
        },
        methods: {
            fetchUserTagCategory() {
                this.loading = true;
                this.$store.dispatch('userTagCategory/loadUserTagCategory', this.userTagCategoryId)
                    .then(userTagCategory => this.userTagCategory = userTagCategory)
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>